import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import UserController from '@/controllers/user.controller';
import MerchantController from '@/controllers/merchant.controller';
import StudioController from './controllers/studio.controller';
import BookingController from './controllers/booking.controller';

validateEnv();

const app = new App(
    [new UserController(), new MerchantController(), new StudioController(), new BookingController()],
    Number(process.env.PORT)
);

app.listen();