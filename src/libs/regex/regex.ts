
import { passwordRegex } from 'constants/regex'

function validatePassword(password:string) {
    return passwordRegex.test(password);
}

export { validatePassword};