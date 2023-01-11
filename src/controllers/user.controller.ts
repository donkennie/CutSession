import { Router, Request, Response, NextFunction } from 'express';
import IController from '@/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import exceptionMiddleware from '@/middleware/exception.middleware';
import validator from '@/validations/user.validation';
import UserService from '@/services/user.service';
import authenticated from '@/middleware/authenticated.middleware'

class UserController implements IController {
    public path = '/users';
    public router = Router();
    private UserService = new UserService();

    constructor(){
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/register/`,
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
            const {name, dob, email, cityOfResidence, username, password, phoneNumber, metadata } = req.body;

            const token = await this.UserService.register(
                name,
                dob,
                email,
                cityOfResidence,
                username,
                password,
                phoneNumber,
                metadata,
            );
            res.status(201).json({token});

        } catch (error) {
            next(new HttpException(400, error.message));
        }
    }
}
