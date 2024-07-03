import { Credentials } from "../definitions/types"
import validator from "validator"

export async function validateRegistration(creds: Credentials) {
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