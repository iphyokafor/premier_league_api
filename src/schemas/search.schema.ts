import { date, number, object, string, TypeOf, } from "zod";

export const paginationSchema = object({

    body: object({

        limit: number().optional(),
        page: number().optional(),
        searchTerm: string().optional().default(''),
        // startDate: date(),
        // endDate: date().optional().default(),

    })

});

export type PaginationInput = TypeOf<typeof paginationSchema>['body'];
