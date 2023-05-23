import BookingModel from "@/models/booking.model";
import {ObjectId} from 'mongodb';
import generateRandomString from '@/utils/randomGenerator';
import StudioModel from "@/models/studio.model";
import UserModel from "@/models/user.model";
import { IQueryParameterBookingSession } from "@/interfaces/queryParameterBookingSession";
import MerchantModel from "@/models/merchant.model";
import IBooking from "@/interfaces/booking.interface";

class BookingService{
    private bookings = BookingModel;
    private studios = StudioModel;
    private users = UserModel;
    private merchants = MerchantModel;

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
        payload: IQueryParameterBookingSession
    ): Promise<object[] | Error>{
        try {
            const {city, period, offset, merchantId, limit} = payload;
            const checkMerchantId = await this.merchants.findById(merchantId);
            if(!checkMerchantId){
                throw new Error("Not found with the merchant Id provided.");
            }

            const bookingSession = await this.bookings.find({
                merchantId,
                city
            }).skip((offset - 1) * 50)
            .limit( limit < 50 ? limit : 50)

            return bookingSession;
                } catch (error) {
            throw new Error('Unable to retrive studio')
        }
    }
}

export default BookingService;