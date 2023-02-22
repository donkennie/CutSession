import {Document} from 'mongoose';
import {ObjectId} from 'mongodb';

export default interface IStudio extends Document {
    _id: ObjectId,
    merchantId: string,
    startsAt: string,
    endsAt: string,
    type: string
}