import bcrypt from "bcrypt"
import { hash, randomUUID } from "node:crypto"

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

export async function generateSessionKey(data: string) {
    const id = randomUUID({ disableEntropyCache: true })

    return hash("sha3-512", id + ":" + data)
}