import { hash } from "@node-rs/argon2";

export class Hash {
    public static async password(password: string): Promise<string>{
        const passwordHash = await hash(password, {
            // recommended minimum parameters
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });
        return passwordHash
    }
}