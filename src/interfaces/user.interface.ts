import {Document} from 'mongoose';

export default interface IUser extends Document {
    userId: string;
    name: string;
    dob: string;
    email: string;
    cityOfResidence: string;
    username: string;
    password: string;
    phoneNumber: string;
    metadata: object;


    isValidPassword(password: string): Promise<Error | boolean>;
}