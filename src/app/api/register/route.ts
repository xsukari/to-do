import { Auth } from "../../data/types"
import { 
    usersExist,
    invitedAndValid,
    newUserAndUpdateInvite,
    usernameTaken,
    newUser,
} from "../../data/database/functions"
import vine, { errors } from "@vinejs/vine"
import bcrypt from "bcrypt"

async function validate(auth: Auth) {
    const schema = vine.object({
        username: vine.string(),
        email: vine.string().email(),
        password: vine
            .string()
            .minLength(8)
            .maxLength(32)
            .confirmed()
    })

    const data = {
        username: auth.username,
        email: auth.email,
        password: auth.password,
        password_confirmation: auth.passwordConfirmation,
    }

    try {
        const output = await vine.validate({ schema, data })

        const validatedData = {
            email: output.email,
            username: output.username,
            password: output.password,
        }

        return validatedData
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            console.log(error.messages)
        }

        return null
    }
}

export async function POST(request: Request) {

    let text = ""
    let success = false

    const auth = await request.json() as Auth
    const validatedAuth = await validate(auth)

    if (!validatedAuth) {
        text = "Invalid credentials, please check your email / password."

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
    const hashedPassword = await bcrypt.hash(validatedAuth.password, 13) 
    // const end = new Date().getTime()
    // console.log("\n" + (end - start) + " milliseconds\n")

    if (!await usersExist()) {
        try {
            await newUser(
                validatedAuth.username,
                validatedAuth.email,
                hashedPassword,
                true
            )

            text = "Registration successful."
            success = true
        } catch (error) {
            text = "Registration unsuccessful. Please try again."
        }

        return Response.json({ message: { success: success, text: text } })
    } else {
        const isInvitedAndValid = await invitedAndValid(validatedAuth.email)
        const isUsernameNotTaken = !await usernameTaken(validatedAuth.username)

        if (isInvitedAndValid && isUsernameNotTaken) {
            try {
                await newUserAndUpdateInvite(
                    validatedAuth.username,
                    validatedAuth.email,
                    hashedPassword,
                    false
                )

                text = "Registration successful."
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