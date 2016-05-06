import jwt from 'jsonwebtoken';

/**
 * Token authentication for access to Schedule, Api and Onlooker
 *
 * @return     {boolean}  { description_of_the_return_value }
 */
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
