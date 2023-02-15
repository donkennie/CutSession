import {Document} from 'mongoose';
import {ObjectId} from 'mongodb';
export default interface IMerchant extends Document {
    _id: ObjectId,
    name: string;
    email: string;
    cityOfOperation: string;
    username: string;
    password: string;
    phoneNumber: string;
    metadata: object;


    isValidPassword(password: string): Promise<Error | boolean>;
}