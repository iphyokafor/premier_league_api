import {
    getModelForClass,
    index,
    modelOptions,
    prop,
} from "@typegoose/typegoose";
import { mongooseSchemaConfig } from "../utils/database/schema.config";

@index({ nick_name: 1 })

@modelOptions(mongooseSchemaConfig)

// Export the Team class to be used as TypeScript type
export class Team {

    @prop({
        type: String,
        trim: true,
        lowercase: true,
        minlength: 2,
        maxLength: 255,
    })
    name: string;

    @prop({
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 2,
        maxLength: 255,
    })
    nickName: string;

    @prop({
        type: String,
        trim: true,
    })
    website: string;

    @prop({
        type: String,
        trim: true,
    })
    coach: string;

    @prop({
        type: Number,
        trim: true,
    })
    founded: number;

    @prop({
        type: String,
        trim: true,
    })
    stadiumName: string;

    @prop({
        type: String,
        trim: true,
    })
    stadiumCapacity: string;

    @prop({
        type: Number,
        trim: true,
        default: 0,
    })
    wins: number;

    @prop({
        type: Number,
        trim: true,
        default: 0,
    })
    losses: number;

    @prop({
        type: Number,
        trim: true,
        default: 0,
    })
    goals: number;

    @prop({
        type: Boolean,
        trim: true,
        default: false,
    })
    isDeleted: boolean;

}

// Create the team model from the Team class
const teamModel = getModelForClass(Team);

export default teamModel;












