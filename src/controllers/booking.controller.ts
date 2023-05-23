import { Router, Request, Response, NextFunction } from 'express';
import IController from '@/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import exceptionMiddleware from '@/middleware/exception.middleware';
import BookingService from '@/services/booking.service';
import validator from '@/validations/booking.validator';
import BookingSchema from '@/models/booking.model';

class BookingController implements IController {
    public path = '/api';
    public router = Router();
    private BookingService = new BookingService();

    constructor(){
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/bookings`,
            exceptionMiddleware(validator.booking ),
            this.bookStudioSession
        );
    
         this.router.get(`${this.path}/bookings/:merchantId`, this.RetrivedBookSession)
    }

    private bookStudioSession = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {_id, sessionId, date, userId, notes, title,bookingRef} = req.body;
            const booking = await this.BookingService.BookStudioSession(
                _id,
                sessionId,
                date,
                userId,
                notes,
                title,  
                bookingRef,            
            )
             
            res.status(201).json({booking});
            
        } catch (error) {
            return res.status(404).json("Error found from the request!");          
        }
    }

    private RetrivedBookSession = async (
        req: Request,
        res: Response,
    ): Promise<Response | void> => {
        try {
            const {city, limit, offset, period} = req.query;
            const merchantId = req.params.merchantId;

            const result = await this.BookingService.RetriveBookSession({
                city: city as string,
                offset: parseInt(offset as string),
                limit: parseInt(limit as string),
                period: period as string,
                merchantId
            });

            res.status(200).json(result);
        } catch (error) {
            
        }
    }
}

export default BookingController;