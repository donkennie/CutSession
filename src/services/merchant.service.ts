import MerchantModel from "@/models/user.model";
import jwtToken from '@/utils/jwtToken';
import {ObjectId} from 'mongodb';

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
            const newMerchant = await this.merchant.create({
                _id: new ObjectId(),
                name,
                email,
                cityOfOperation,
                username,
                password,
                phoneNumber,
                metadata,
            });

            const accessToken = jwtToken.createToken(newMerchant);
            return newMerchant._id.toHexString();
        }
        catch (error) {
            throw new Error("error.message");
        }
    }

}

export default MerchantService;