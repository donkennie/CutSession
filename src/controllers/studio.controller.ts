import { Router, Request, Response, NextFunction } from 'express';
import IController from '@/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import exceptionMiddleware from '@/middleware/exception.middleware';
import studioModel from '@/models/studio.model';
import merchantModel from '@/models/merchant.model';
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
            `${this.path}/studios/:merchantId`,
            exceptionMiddleware(validator.studio ),
            this.createStudioSession
        );
    
        this.router.get(`${this.path}/studios/:merchantId`, this.getStudioSessions)
    }

    private getStudioSessions = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {

            const merchant = await merchantModel.findById(req.params.merchantId);
            if(!merchant)
            {
                res.status(404).json("No merchant found with this Id");
            }

            const fetchStudio = await studioModel.find({}, { __v: 0 }).lean();
            const studios = fetchStudio.map((studio) => ({
              ...studio,
              merchantId: merchant?._id,
            }));

            if (studios.length === 0) {
                return res.status(404).json("No studios found");
              }
          
              return res.status(201).json(studios);

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
            const {_id, merchantId, startsAt, endsAt, type} = req.body;
            const merchant = await merchantModel.findById(req.params.merchantId);
            if(!merchant)
            {
                res.status(404).json("No merchant found with this Id");
            }
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