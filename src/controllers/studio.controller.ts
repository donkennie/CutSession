import { Router, Request, Response, NextFunction } from 'express';
import IController from '@/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import exceptionMiddleware from '@/middleware/exception.middleware';
import studioModel from '@/models/studio.model';
import authenticated from '@/middleware/authenticated.middleware';
import StudioService from '@/services/studio.service';
import validator from '@/validations/studio.validator';


class StudioController implements IController {
    public path = '/api';
    public router = Router();
    private StudioService = new StudioService();

    constructor(){
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/studios`,
            exceptionMiddleware(validator.studio ),
            this.createStudioSession
        );
    
        this.router.get(`${this.path}/studios`, this.getStudioSessions)
    }

    private getStudioSessions = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const getAllStudioSessions = await this.StudioService.getStudio(req.params.id);
            
            res.status(201).json({getAllStudioSessions});
        } catch (error:any) {
            next(new HttpException(400, error.message));
        }
    }


    private createStudioSession = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
           const merchantId = req.params.id;
            const {_id, startsAt, endsAt, type} = req.body;
            const createStudioSessions = await this.StudioService.createStudio(
                _id,
                merchantId,
                startsAt,
                endsAt, 
                type
                );
            
            res.status(201).json({sessionId: createStudioSessions});
        } catch (error:any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default StudioController;