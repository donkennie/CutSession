import StudioModel from "@/models/studio.model";
import MerchantModel from "@/models/merchant.model";
import {ObjectId} from 'mongodb';

class StudioService {
    private studio = StudioModel;
    private merchant = MerchantModel;

    public async createStudio(
        _id: ObjectId,
        merchantId: string, 
        startsAt: string,
        endsAt: string,
        type: string
    ): Promise<string | Error>
    {
       try {
            const createStudio = await this.studio.create({
                _id: new ObjectId(),
                merchantId,
                startsAt,
                endsAt,
                type
            })

            return createStudio._id.toHexString();
        } catch (error) {
            throw new Error('Unable to create studio');
        }
    }
}

export default StudioService;