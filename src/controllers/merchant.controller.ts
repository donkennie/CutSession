import { Router, Request, Response, NextFunction } from 'express';
import IController from '@/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import exceptionMiddleware from '@/middleware/exception.middleware';
import validator from '@/validations/merchant.validator';
import MerchantService from '@/services/merchant.service';
import authenticated from '@/middleware/authenticated.middleware'
import { any } from 'joi';
import {ObjectId} from 'mongodb';

class MerchantController implements IController {
    public path = '/register';
    public router = Router();
    private MerchantService = new MerchantService();

    constructor(){
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/merchants`,
            exceptionMiddleware(validator.merchant),
            this.registerMerchant

        );
        
    }

    private registerMerchant = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {_id, name, email, cityOfOperation, username, password, phoneNumber, metadata } = req.body;

            const newMerchant = await this.MerchantService.registerMerchant(
                _id,
                name,
                email,
                cityOfOperation,
                username,
                password,
                phoneNumber,
                metadata,
            );
            res.status(201).json({merchantId: newMerchant});

        } catch (error:any) {
            next(new HttpException(400, error.message));
        }
    }

}

export default MerchantController;