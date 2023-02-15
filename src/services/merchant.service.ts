import MerchantModel from "@/models/merchant.model";
import jwtToken from '@/utils/jwtToken';
import {ObjectId} from 'mongodb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class MerchantService {
    private merchant = MerchantModel;
    //Register a new merchant

    public async registerMerchant(
        _id: ObjectId,
        name: string,
        email: string,
        cityOfOperation: string,
        username: string,
        password: string,
        phoneNumber: string,
        metadata: object,
    ): Promise<string | Error> {
        try {

            
            const existingMerchant = await MerchantModel.findOne({ email });
            if (existingMerchant)
            throw new Error("Merchant already exists.");

            const hashedPassword = await bcrypt.hash(password, 12);

            const newMerchant = await this.merchant.create({
                _id: new ObjectId(),
                name,
                email,
                cityOfOperation,
                username,
                password: hashedPassword,
                phoneNumber,
                metadata,
            });

            const token = jwt.sign(
                { email: newMerchant.email, id: newMerchant._id }, process.env.JWT_SECRET as jwt.Secret,
                { expiresIn: "3d" }
              );

            return newMerchant._id.toHexString();
        }
        catch (error) {
            throw new Error( "Something went wrong" );
        }
    }

}

export default MerchantService;