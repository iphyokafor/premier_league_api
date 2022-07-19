import {
    getModelForClass,
    modelOptions,
    mongoose,
    prop,
} from "@typegoose/typegoose";

import config from "config";
import shortid from 'shortid';

import { mongooseSchemaConfig } from "../utils/database/schema.config";

@modelOptions(mongooseSchemaConfig)

// Export the Fixture class to be used as TypeScript type
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
    opponentTeam: string;

    @prop({
        type: Number,
        default: 0,
    })
    homeScore: number;

    @prop({
        type: Number,
        default: 0,
    })
    opponentScore: number;

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
    played: string;

    @prop({
        type: mongoose.Schema.Types.Mixed,
        default: () => `http://localhost:${config.get('port')
            }/api/fixtures/${shortid.generate()}`
    })
    link: string;

}

// Create the fixture model from the Fixture class
const fixtureModel = getModelForClass(Fixture);

export default fixtureModel;










