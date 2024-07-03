import { Credentials } from "../../data/types"
import { 
    usersExist,
    invitedAndValid,
    newUserAndUpdateInvite,
    usernameTaken,
    newUser,
} from "../../data/database/functions"
import validator from "validator"
import bcrypt from "bcrypt"

async function validate(creds: Credentials) {
    const validatedCreds = {
        valid: false,
        message: "",
        email: "",
        username: "",
        password: "",
    }

    const isEmailValid = validator.isEmail(creds.email as string)
    if (!isEmailValid) {
        validatedCreds.message = "Please check if your email is valid."
    }

    const isUsernameValid = validator.isLength(creds.username, { min: 3, max: 20 }) // maybe add more validations here, such as isAscii()
    if (!isUsernameValid) {
        validatedCreds.message = "Please check if your username is at least 3 characters and at most 20 characters long."
    }

    const isPasswordConfirmed = validator.equals(creds.password, creds.passwordConfirmation as string)
    if (!isPasswordConfirmed) {
        validatedCreds.message = "Please make sure you entered your password correctly in both fields."
    }

    const isPasswordStrong = validator.isStrongPassword(creds.password)
    if (!isPasswordStrong) {
        validatedCreds.message = 
            "Please make sure your password is at least 8 characters long and"
            + " "
            + "contains at least 1 of all of the following: lowercase letter, uppercase letter, number, symbol."
    }

    // Check message after all validations
    if (validatedCreds.message !== "") {
        return validatedCreds
    }

    const normalizationOptions: validator.NormalizeEmailOptions = {
        all_lowercase: true,
        gmail_convert_googlemaildotcom: true,

        gmail_lowercase: false,
        gmail_remove_dots: false,
        gmail_remove_subaddress: false,
        outlookdotcom_lowercase: false,
        outlookdotcom_remove_subaddress: false,
        yahoo_lowercase: false,
        yahoo_remove_subaddress: false,
        icloud_lowercase: false,
        icloud_remove_subaddress: false,
    }

    const email = validator.normalizeEmail(creds.email as string, normalizationOptions)
    if (email) {
        validatedCreds.valid = true
        validatedCreds.email = email
        validatedCreds.username = creds.username
        validatedCreds.password = creds.password

        return validatedCreds
    } else {
        validatedCreds.message = "Your email could not be processed. Please inform your administrator."

        return validatedCreds
    }
}

export async function POST(request: Request) {
    let text = ""
    let success = false

    const creds = await request.json() as Credentials
    const validatedCreds = await validate(creds)

    if (!validatedCreds.valid) {
        text = validatedCreds.message

        return Response.json({ message: { success: success, text: text } })
    }

    /**
     * amount of bcrypt salt rounds:
     * aim for a computation time of ~ 250 ms
     * 
     * 13 rounds are ~ 300 ms
     * 12 rounds are ~ 150 ms
     * using 7800X3D
     */
    // const start = new Date().getTime()
    const hashedPassword = await bcrypt.hash(validatedCreds.password, 13) 
    // const end = new Date().getTime()
    // console.log("\n" + (end - start) + " milliseconds\n")

    if (!await usersExist()) {
        try {
            await newUser(
                validatedCreds.username,
                validatedCreds.email,
                hashedPassword,
                true
            )

            text = "Registration successful. Redirecting to login shortly..."
            success = true
        } catch (error) {
            text = "Registration unsuccessful. Please try again."
        }

        return Response.json({ message: { success: success, text: text } })
    } else {
        const isInvitedAndValid = await invitedAndValid(validatedCreds.email)
        const isUsernameNotTaken = !await usernameTaken(validatedCreds.username)

        if (isInvitedAndValid && isUsernameNotTaken) {
            try {
                await newUserAndUpdateInvite(
                    validatedCreds.username,
                    validatedCreds.email,
                    hashedPassword,
                    false
                )

                text = "Registration successful. Redirecting to login shortly..."
                success = true
            } catch (error) {
                text = "Registration unsuccessful. Please try again."
            }
        } else {
            text = "You are not invited or your username is already taken."
        }

        return Response.json({ message: { success: success, text: text } })
    }
}