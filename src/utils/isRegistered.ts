import type { DrizzleD1Database } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import { user } from "../db/schema"
 
export class isRegistered {
    public static async email(db: DrizzleD1Database, email:string): Promise<boolean> {
        try {
            const result = await db
                .select({mail_address: user.mailAddress})
                .from(user)
                .where(eq(user.mailAddress, email))
            // console.log("select mailaddress from user")
            // console.log (result[0].mail_address)
            if(result.length > 0) {
                return true
            }
            // can Register email
            return false
        } catch(e) {
            console.log(e)
            return false
        }
        return false
    }
}