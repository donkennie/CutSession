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
        },
        title:{
            type: String
        },

        endsAt:{
            type: Date,
        },
        startsAt:{
            type: Date,
        }


    }
)

export default model<IBooking>('Booking', BookingSchema); 