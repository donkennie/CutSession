import {Document} from 'mongoose';
import {ObjectId} from 'mongodb';

export default interface IBooking extends Document {
    _id: ObjectId,
        sessionId: string,
        date: string,
        userId: string,
        notes: string,
        title: string,
}