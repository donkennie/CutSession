import UserModel from "@/models/user.model";
import jwtToken from '@/utils/jwtToken';
import {ObjectId} from 'mongodb';

class UserService {
    private user = UserModel;
    //Register a new user

    public async register(
        _id: ObjectId,
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
            const newUser = await this.user.create({
                _id: new ObjectId(),
                name,
                dob,
                email,
                cityOfResidence,
                username,
                password,
                phoneNumber,
                metadata,
            });

            const accessToken = jwtToken.createToken(newUser);
           // return newUser.ins
            return newUser._id.toHexString();
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