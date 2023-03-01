import { Router, Request, Response, NextFunction } from 'express';
import IController from '@/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import exceptionMiddleware from '@/middleware/exception.middleware';
import BookingService from '@/services/booking.service';
import validator from '@/validations/booking.validator';
import BookingSchema from '@/models/booking.model';

class StudioController implements IController {
    public path = '/api';
    public router = Router();
    private BookingService = new BookingService();

    constructor(){
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/studios/:merchantId`,
            exceptionMiddleware(validator.booking ),
            this.bookStudioSession
        );
    
        // this.router.get(`${this.path}/studios/:merchantId`, this.getStudioSessions)
    }

    private bookStudioSession = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {_id, sessionId, date, userId, notes, title} = req.body;
            const booking = await this.BookingService.BookStudioSession(
                _id,
                sessionId,
                date,
                userId,
                notes,
                title,              
            )
             
            res.status(201).json({bookingId: booking});
            
        } catch (error) {
            return res.status(404).json("No studios found");          
        }
    }
}