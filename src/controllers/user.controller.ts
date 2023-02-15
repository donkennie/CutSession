import { Router, Request, Response, NextFunction } from 'express';
import IController from '@/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import exceptionMiddleware from '@/middleware/exception.middleware';
import validator from '@/validations/user.validation';
import UserService from '@/services/user.service';
import authenticated from '@/middleware/authenticated.middleware'
import { any } from 'joi';
import {ObjectId} from 'mongodb';

class UserController implements IController {
    public path = '/register';
    public router = Router();
    private UserService = new UserService();

    constructor(){
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/users`,
            exceptionMiddleware(validator.register),
            this.register

        );
        
        this.router.post(
            `${this.path}/login`,
            exceptionMiddleware(validator.login),
            this.login
        );
        this.router.get(`${this.path}`, authenticated, this.getUser)
    }

    private register = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {_id, name, dob, email, cityOfResidence, username, password, phoneNumber, metadata } = req.body;

            const newUser = await this.UserService.register(
                _id,
                name,
                dob,
                email,
                cityOfResidence,
                username,
                password,
                phoneNumber,
                metadata,
            );
            res.status(201).json({userId: newUser});

        } catch (error:any) {
            next(new HttpException(400, error.message));
        }
    }

    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {username, password, accessType} = req.body;

            const token = await this.UserService.login(username, password, accessType);

            res.status(200).json({token});
        } catch (error:any) {
            next(new HttpException(400, error.message));
        }
    };


    private getUser = (
        req: Request | any, 
        res: Response,
        next: NextFunction
    ): Response | void => {
        if(!req.user){
            return next(new HttpException(404, 'No logged in user'));
        }
        res.status(200).send({ data: req.user });
    }
}

export default UserController;