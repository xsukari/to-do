import { RegistrationCredentials } from "../../utils/definitions/types"
import { 
    usersExist,
    invitedAndValid,
    newUser,
    usernameTaken,
    newUserFirst,
} from "../../utils/database/functions"
import { validateRegistration } from "../../utils/tools/validation"
import { hashPassword } from "../../utils/tools/crypto"

export async function POST(request: Request) {
    let text = ""
    let success = false

    const creds = await request.json() as RegistrationCredentials
    const validatedCreds = await validateRegistration(creds)

    if (!validatedCreds.valid) {
        text = validatedCreds.message
        return Response.json({ message: { success: success, text: text } })
    }

    const hashedPassword = await hashPassword(validatedCreds.password)

    if (!await usersExist()) {
        const user = 
            await newUserFirst(
                validatedCreds.username,
                validatedCreds.email,
                hashedPassword,
                true
            )

        if (!user) {
            text = "Registration unsuccessful. Please try again."
            return Response.json({ message: { success: success, text: text } })
        }

        text = "Registration successful. Redirecting to login shortly..."
        success = true

        return Response.json({ message: { success: success, text: text } })
    } else {
        const isInvitedAndValid = await invitedAndValid(validatedCreds.email)
        const isUsernameNotTaken = !await usernameTaken(validatedCreds.username)

        if (!(isInvitedAndValid && isUsernameNotTaken)) {
            text = "You are not invited or your username is already taken."
            return Response.json({ message: { success: success, text: text } })
        }

        const user =
            await newUser(
                validatedCreds.username,
                validatedCreds.email,
                hashedPassword,
                false
            )

        if (!user) {
            text = "Registration unsuccessful. Please try again."
            return Response.json({ message: { success: success, text: text } })
        }

        text = "Registration successful. Redirecting to login shortly..."
        success = true
        
        return Response.json({ message: { success: success, text: text } })
    }
}