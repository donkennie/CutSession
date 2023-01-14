import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import UserController from '@/controllers/user.controller'

validateEnv();

const app = new App(
    [new UserController()],
    Number(process.env.PORT)
);

app.listen();