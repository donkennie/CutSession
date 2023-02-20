import StudioModel from "@/models/studio.model";
import MerchantModel from "@/models/merchant.model";
import {ObjectId} from 'mongodb';

class StudioService {
    private studio = StudioModel;
    private merchant = MerchantModel;

    public async getStudio(
        merchantId: string
    ): Promise<string | Error>{
        try {
            const merchant = await this.merchant.findById(merchantId);
            if(!merchant){
                return "No merchant found with this id"
            }
            const fetchStudio = await StudioModel.find();
            if(Array.isArray(fetchStudio)){
                return "No available studio scheduled yet"
            }

            return fetchStudio  
            
        } catch (error) {
            throw new Error('Unable to fetch studio');
        }
    }

    public async createStudio(
        _id: ObjectId,
       merchantId: string,
        startsAt: string,
        endAt: string,
        type: string
    ): Promise<string | Error>
    {
        try {
            const merchant = await this.merchant.findById(merchantId);
            if(!merchant){
                return "No merchant found with this id"
            }

            const createStudio = await this.studio.create({
                _id: new ObjectId(),
                startsAt,
                endAt,
                type
            })

            return createStudio._id.toHexString();
        } catch (error) {
            throw new Error('Unable to create studio');
        }
    }
}

export default StudioService;