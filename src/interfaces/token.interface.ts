import { Schema } from 'mongoose'

interface IToken extends Object {
    id: Schema.Types.ObjectId;
    expiresIn: number;
}

export default IToken;