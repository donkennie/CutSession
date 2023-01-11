import UserModel from "@/models/user.model";
import jwtToken from '@/utils/jwtToken';

class UserService {
    private user = UserModel;

    //Register a new user

    public async register(
        name: string,
        dob: string,
        email: string,
        cityOfResidence: string,
        username: string,
        password: string,
        phoneNumber: string,
        metadata: object,
    ): Promise<string | Error> {
        try {
            const user = await this.user.create({
                name,
                dob,
                email,
                cityOfResidence,
                username,
                password,
                phoneNumber,
                metadata,
            });

            const accessToken = jwtToken.createToken(user);

            return accessToken;
        }
        catch (error) {
            throw new Error("error.message");
        }
    }

    //login an authenticated user

        public async login(
            username: string,
            password: string,
            accessType: string
        ): Promise<string | Error>{

            try {
                const user = await this.user.findOne({ username });

                if (!user) {
                    throw new Error('Unable to find user with that username');
                }

                if(await user.isValidPassword(password)){
                    return jwtToken.createToken(user);
                }

                else{
                    throw new Error('Wrong credentials given');
                }
            } catch (error) {
                throw new Error('Unable to create user');
            }
        }

}

export default UserService;