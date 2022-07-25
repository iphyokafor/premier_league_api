import {
    getModelForClass,
    modelOptions,
    mongoose,
    prop,
} from "@typegoose/typegoose";

import { mongooseSchemaConfig } from "../utils/database/schema.config";

@modelOptions(mongooseSchemaConfig)

export class Fixture {

    @prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    })
    homeTeam: string;

    @prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    })
    awayTeam: string;

    @prop({
        type: Number,
        default: 0,
    })
    homeScore: number;

    @prop({
        type: Number,
        default: 0,
    })
    awayScore: number;

    @prop({
        type: String,
    })
    time: string;

    @prop({
        type: String,
    })
    stadium: string;

    @prop({
        type: Boolean,
        default: false,
    })
    played: boolean;

    @prop({
        type: String,
    })
    link: string;

    @prop({ type: String })
    shortCode: string

    @prop({
        type: Boolean,
        default: false,
    })
    isDeleted: boolean;

    @prop({
        type: Date,
    })
    deletedAt: Date;

    @prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    })
    createdBy: string;

    @prop({ type: String })
    deletedBy: string;

}

// Create the fixture model from the Fixture class
const fixtureModel = getModelForClass(Fixture);

export default fixtureModel;










