import { Schema, model } from 'mongoose';
import IStudio from '@/interfaces/studio.interface';

enum Type{
    WEEKDAY = 'WeekDay',
    WEEKEND = 'WeekEnd',
}

const StudioSchema = new Schema(
    {
        startsAt: {
            type: Date,
           required: true,
        },

        endsAt: {
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