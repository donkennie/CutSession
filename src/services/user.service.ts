import UserModel from "@/models/user.model";
import jwtToken from '@/utils/jwtToken';
import {ObjectId} from 'mongodb';
import MerchantModel from "@/models/merchant.model";
import bcrypt from 'bcrypt';
import IUser from '@/interfaces/user.interface';
import jwt from 'jsonwebtoken';




class UserService {
    private user = UserModel;
    private merchant = MerchantModel;
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

            const existingUser = await UserModel.findOne({ email });
            if (existingUser)
            throw new Error("User already exists.");

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
            return newUser._id.toHexString();
        }
        catch (error) {
            throw new Error("error.message");
        }
    }

    //login an authenticated user


        public async createUser(username: string,
        password: string,
        accessType: string
    ): Promise<string | Error>{
        {
            try {
            const user = await this.user.findOne({ username })
            
            if (!user) {
                throw new Error('Unable to find user with that username');
            }
            
            if(await user.isValidPassword(password)){
                const token = jwtToken.createToken(user);
                return token;
            }

            else{
                throw new Error('Wrong credentials given');
            }
        }

            catch (error) {

                throw new Error("Something went wrong");
            }
        }
    }

public async createMerchant(username: string,
    password: string,
    accessType: string
): Promise<string | Error>{
    {
        try {
            const merchant = await this.merchant.findOne({ username })
            
            if (!merchant) {
                throw new Error('Unable to find merchant with that username');
            }
            
            if(await merchant.isValidPassword(password)){
                const token = jwt.sign(
                    { email: merchant.email, id: merchant._id }, process.env.JWT_SECRET as jwt.Secret,
                    { expiresIn: "3d" }
                    );
                return token;//merchant._id.toHexString();
            }

            else{
                throw new Error('Wrong credentials given');
            }
        } catch (error) {
            throw new Error("Something went wrong");
        }
    }
}

}


export default UserService;