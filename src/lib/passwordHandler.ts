import * as bcrypt from "bcrypt";

export async function hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 12)
    return hashedPassword
}


export async function comparePassword(password, hashedPassword) {
    const compare = await bcrypt.compare(password, hashedPassword)
    return compare
}