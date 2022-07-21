import { Types } from "mongoose";
import { boolean, number, object, string, TypeOf } from "zod";
import appError from "../utils/appError";

export const createFixtureSchema = object({

    body: object({

        homeTeam: string({ required_error: 'team is required' }).refine((value) => {
            if (Types.ObjectId.isValid(value)) {
                return value;
            }
            return new appError('please provide a valid object Id', 400)
        }),

        awayTeam: string({ required_error: 'team is required' }).refine((value) => {
            if (Types.ObjectId.isValid(value)) {
                return value;
            }
            return new appError('please provide a valid object Id', 400)

        }),

        homeScore: number().optional(),

        awayScore: number().optional(),

        time: string().optional(),

        stadium: string().optional(),

        played: boolean().optional(),

    })

});

export const updateFixtureSchema = object({

    body: object({

        // homeTeam: string().refine((value) => {
        //     if (Types.ObjectId.isValid(value)) {
        //         return value;
        //     }
        //     return new appError('please provide a valid object Id', 400)
        // }).optional(),

        // awayTeam: string().refine((value) => {
        //     if (Types.ObjectId.isValid(value)) {
        //         return value;
        //     }
        //     return new appError('please provide a valid object Id', 400)
        // }).optional(),

        homeScore: number().optional(),

        awayScore: number().optional(),

        time: string().optional(),

        stadium: string().optional(),

        played: boolean().optional(),

    })

});

export type CreateFixtureInput = TypeOf<typeof createFixtureSchema>['body'];

export type UpdateFixtureInput = TypeOf<typeof updateFixtureSchema>['body'];
