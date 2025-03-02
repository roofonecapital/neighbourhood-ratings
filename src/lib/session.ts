import "use server"
import { SignJWT, jwtVerify } from "jose";
import {cookies} from 'next/headers'

const secretKey = process.env.SESSION_SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
    return new SignJWT(payload).setProtectedHeader({alg: 'HS256'}).setIssuedAt().setExpirationTime("30m").sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256']
        })
        return payload
    }
    catch (error) {
        throw new Error('Failed to verify session')
    }
}

export async function createSession(input: string) {
    const expiresAt = new Date(Date.now() + 1000 * 60 * 30)
    const session = await encrypt({ input })
    const cookieStore = await cookies()

    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'strict',
        path: '/'
    })
}