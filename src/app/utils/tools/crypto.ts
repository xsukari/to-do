import bcrypt from "bcrypt"
import { generateKeyPair } from "node:crypto"

export async function hashPassword(password: string) {
    /**
     * amount of bcrypt salt rounds:
     * aim for a computation time of ~ 250 ms
     * 
     * 13 rounds are ~ 300 ms
     * 12 rounds are ~ 150 ms
     * using 7800X3D
     */
    // const start = new Date().getTime()
    const hashedPassword = await bcrypt.hash(password, 13) 
    // const end = new Date().getTime()
    // console.log("\n" + (end - start) + " milliseconds\n")

    return hashedPassword
}

export async function comparePasswords(password: string, passwordHash: string) {
    return await bcrypt.compare(password, passwordHash)
}

export async function generateKeys() {
    let error = false
    const keys = {
        publicKey: "",
        privateKey: "",
    }

    generateKeyPair("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: "spki",
            format: "pem",
        },
        privateKeyEncoding: {
            type: "pkcs8",
            format: "pem",
            cipher: "aes-256-cbc",
            passphrase: "top secret",
        },
    }, (err, publicKey, privateKey) => {
        if (!err) {
            keys.publicKey = publicKey
            keys.privateKey = privateKey
        } else {
            error = true
        }
    })

    return error ? null : keys
}