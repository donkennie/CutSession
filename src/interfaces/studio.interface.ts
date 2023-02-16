import {Document} from 'mongoose';
import {ObjectId} from 'mongodb';

export default interface IStudio extends Document {
    _id: ObjectId,
    startAt: string,
    endAt: string,
    type: string
}