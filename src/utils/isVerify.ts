import { verify } from "@node-rs/argon2";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { eq, is } from "drizzle-orm"
import { user } from "../db/schema"
import type { arrayOutputType } from "astro/zod";

    
export type user = {
    id: number | null,
    name: string | null,
    mailAddress: string | null,
    hashedPassword: string | null
}

export class isVerify {
    public static async hashed_password(hash:string, password:string): Promise<boolean> {
        const is_verify: boolean = await verify(hash, password)
        if(is_verify){
            return true
        }
        return false
    }

    public static async login_password(db: DrizzleD1Database, email: string, password: string): Promise<[boolean, user]> {
        let is_verify: boolean = false
        let data: user = {    
            id: null,
            name: null,
            mailAddress: null,
            hashedPassword: null
        }
        const result = await db.select().from(user).where(eq(user.mailAddress, email))
        console.log(typeof result[0])
        // console.log("result login_password", result)
        if( result.length === 1) {
            is_verify = await verify(String(result[0].hashedPassword), password)
            data = result[0]
        }
        return [ is_verify, data ]
    }
}