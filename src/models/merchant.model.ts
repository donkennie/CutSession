import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import IMerchant from '@/interfaces/merchant.interface'

const MerchantSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },

        cityOfOperation: {
            type: String,
        },

        username: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
        },

        phoneNumber: {
            type: Number,
        },

        metadata: {
            type: Object,
        }

    },
    {
        timestamps: true,
    }
);

MerchantSchema.pre<IMerchant>('save', async function (next){
    if(!this.isModified('password')) {
        return next();
    }

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

MerchantSchema.methods.isValidPassword = async function (
    password: string
) : Promise<Error | boolean> {
    return await bcrypt.compare(password, this.password);
};

export default model<IMerchant>('User', MerchantSchema);