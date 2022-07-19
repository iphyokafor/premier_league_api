import { number, object, string, TypeOf } from "zod";

export const createTeamSchema = object({
    
    body: object({

        name: string({ required_error: "name is required" }).min(3).max(255),

        nickName: string({ required_error: "nick name is required" })
            .min(3)
            .max(255),

        coach: string({ required_error: "coach is required" }).min(3).max(50),

        website: string({ required_error: "website is required" }).min(3).max(255),

        stadiumName: string({ required_error: "stadium name is required" })
            .min(3)
            .max(255),

        stadiumCapacity: string({ required_error: "stadium capacity is required" })
            .min(3)
            .max(255),

        founded: number().optional(),

        wins: number().optional(),

        losses: number().optional(),

        goals: number().optional(),

    }),

});

export type CreateTeamInput = TypeOf<typeof createTeamSchema>['body'];
