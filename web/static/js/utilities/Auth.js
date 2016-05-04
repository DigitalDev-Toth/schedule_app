import jwt from 'jsonwebtoken';

let userAuth = () => {
    try {
        var data = jwt.verify(window.UserToken, 'gZH75aKtMN3Yj0iPS4hcgUuTwjAzZr9C');

        if (data) {
            return true;
        }
    } catch (err) {
        return false;
    }
};

export default userAuth;
