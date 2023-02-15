import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import UserController from '@/controllers/user.controller'
import MerchantController from '@/controllers/merchant.controller'

validateEnv();

const app = new App(
   // [new UserController()],
    [new MerchantController()],
    Number(process.env.PORT)
);

app.listen();