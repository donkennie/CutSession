import { Schema, model } from 'mongoose';
import IStudio from '@/interfaces/studio.interface';

enum Type{
    WEEKDAY = 'Weekday',
    WEEKEND = 'Weekend',
}

const StudioSchema = new Schema(
    {
        startAt: {
            type: Date,
            required: true,
        },

        endAt: {
            type: Date,
            required: true,
        },

        type: {
            type: String,
            enum: [Type.WEEKDAY, Type.WEEKEND],
            default: Type.WEEKDAY,
            required: true
        }

    },

    {
        timestamps: true,
    }
);

export default model<IStudio>('Studio', StudioSchema); 