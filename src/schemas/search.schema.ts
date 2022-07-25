import { number, object, string, TypeOf, } from "zod";

export const paginationSchema = object({

    body: object({

        limit: number().optional(),
        page: number().optional(),
        search: string().optional().default(''),

    })

});

export type PaginationInput = TypeOf<typeof paginationSchema>['body'];
