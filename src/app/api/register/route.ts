import { Credentials } from "../../utils/types"
import { 
    usersExist,
    invitedAndValid,
    newUserAndUpdateInvite,
    usernameTaken,
    newUser,
} from "../../utils/database/functions"
import bcrypt from "bcrypt"
import { validateRegistration } from "../../utils/functions/validation"

export async function POST(request: Request) {
    let text = ""
    let success = false

    const creds = await request.json() as Credentials
    const validatedCreds = await validateRegistration(creds)

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