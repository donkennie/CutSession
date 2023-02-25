import BookingModel from "@/models/booking.model";
import {ObjectId} from 'mongodb';

class BookingService{
    private bookings = BookingModel;

    public async BookStudioSession(
        _id: ObjectId,
        sessionId: string,
        date: string,
        userId: string,
        notes: string,
        title: string,

    ): Promise<string | Error>{
        try {
            
            const bookSession = await this.bookings.create({
                _id: new ObjectId(),
                sessionId,
                date,
                userId,
                notes,
                title
            })

            return bookSession._id.toHexString();
        } catch (error) {
            throw new Error('Unable to create studio');
        }
    }
}

export default BookingService;