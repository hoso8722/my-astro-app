import PasswordValidator from "password-validator";

export class isValidated {
    public static email(email: string): boolean{
        const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    public static password(password: string): boolean{
        // Create a schema
        const schema = new PasswordValidator();
        schema
        .is().min(8, "８文字以上にしてください")                                    // Minimum length 8
        .is().max(25, "２５文字以下にしてください")                                  // Maximum length 100
        .has().uppercase(1, "少なくとも英大文字を１字以上にしてください")              // Must have uppercase letters
        .has().lowercase(1, "少なくとも英小文字を１字以上にしてください")               // Must have lowercase letters
        .has().digits(1, "少ないくとも数字を1文字以上にしてください")                    // Must have at least 2 digits
        .has().not().spaces()
        .has().not().symbols()

        const res = schema.validate(password)
        // console.log("password validated details")
        // console.log(typeof res)
        if(res === true) {
            return true
        }
        return false
    }
}