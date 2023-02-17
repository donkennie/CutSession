import StudioModel from "@/models/studio.model";
import MerchantModel from "@/models/merchant.model";

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
            const fetchStudio = await this.studio.find();
            if(fetchStudio === null){
                return "No available studio scheduled yet"
            }

            return fetchStudio
            
        } catch (error) {
            throw new Error('Unable to fetch studio');
        }
    }
}