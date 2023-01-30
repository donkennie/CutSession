import {Document} from 'mongoose';
import {ObjectId} from 'mongodb';
export default interface IUser extends Document {
    _id: ObjectId,
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