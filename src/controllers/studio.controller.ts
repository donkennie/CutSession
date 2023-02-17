import { Router, Request, Response, NextFunction } from 'express';
import IController from '@/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import exceptionMiddleware from '@/middleware/exception.middleware';
import studioModel from '@/models/studio.model';
import authenticated from '@/middleware/authenticated.middleware';
import StudioService from '@/services/studio.service';


class StudioController implements IController {
    public path = '/studios';
    public router = Router();
    private StudioService = new StudioService();

    

}