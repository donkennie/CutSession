import BookingModel from "@/models/booking.model";
import {ObjectId} from 'mongodb';
import generateRandomString from '@/utils/randomGenerator';
import StudioModel from "@/models/studio.model";
import UserModel from "@/models/user.model";

class BookingService{
    private bookings = BookingModel;
    private studios = StudioModel;
    private users = UserModel;

    public async BookStudioSession(
        _id: ObjectId,
        sessionId: string,
        date: string,
        userId: string,
        notes: string,
        title: string,
        bookingRef: string

    ): Promise<{ bookingId: string, bookingRef: string } | Error>{
        try {
            const bookingRef = generateRandomString();
            const studio = await StudioModel.findById(sessionId)
            if(!studio){
                throw new Error("Not found with the session Id provided.");
            }

            const user = await UserModel.findById(userId);
            if(!user){
                throw new Error("Not found with the user Id provided.");
            }

            const bookSession = await this.bookings.create({
                _id: new ObjectId(),
                sessionId,
                date,
                userId,
                notes,
                title,
                bookingRef
            })

            return {
                bookingId: bookSession._id.toHexString(),
                bookingRef: bookSession.bookingRef
            };
        } catch (error) {
            throw new Error('Unable to create studio');
        }
    }

    public async RetriveBookSession(

    ): Promise<string | Error>{

        try {
            return "null";
        } catch (error) {
            throw new Error('Unable to retrive studio')
        }
    }
}

export default BookingService;