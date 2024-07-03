import { Credentials } from "../../utils/definitions/types"
import { 
    usersExist,
    invitedAndValid,
    newUserAndUpdateInvite,
    usernameTaken,
    newUser,
} from "../../utils/database/functions"
import { validateRegistration } from "../../utils/tools/validation"
import { hashPassword } from "../../utils/tools/hashing"

export async function POST(request: Request) {
    let text = ""
    let success = false

    const creds = await request.json() as Credentials
    const validatedCreds = await validateRegistration(creds)

    if (!validatedCreds.valid) {
        text = validatedCreds.message

        return Response.json({ message: { success: success, text: text } })
    }

    const hashedPassword = await hashPassword(validatedCreds.password)

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