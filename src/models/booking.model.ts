import { Schema, model } from 'mongoose';
import IBooking from '@/interfaces/booking.interface';
import generateRandomString from '@/utils/randomGenerator';

const BookingSchema = new Schema(
    {
        bookingId:{
            type: String
        },
        sessionId:{
            type: String,
            required: true
        },
        userId:{
            type: String,
            required: true
        },
        date:{
            type: Date,
            required: true
        },
        notes:{
            type: String,
        },
        bookingRef:{
            type: String,
            default: generateRandomString()
        },
        title:{
            type: String
        }

    }
)

export default model<IBooking>('Booking', BookingSchema); 