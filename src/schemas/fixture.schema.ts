import { Types } from "mongoose";
import { boolean, number, object, string, TypeOf } from "zod";
import appError from "../utils/appError";

export const createFixtureSchema = object({

    body: object({

        homeTeam: string().refine((value) => {
            if (Types.ObjectId.isValid(value)) {
                return value;
            }
            return new appError('please provide a valid object Id', 400)
        }),

        opponentTeam: string().refine((value) => {
            if (Types.ObjectId.isValid(value)) {
                return value;
            }
            return new appError('please provide a valid object Id', 400)

        }),

        homeScore: number(),

        opponentScore: number(),

        time: string().optional(),

        stadium: string().optional(),

        played: boolean().optional(),

    })

});

export type CreateFixtureInput = TypeOf<typeof createFixtureSchema>['body'];
