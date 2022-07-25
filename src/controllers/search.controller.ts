
import { NextFunction, Request, Response } from 'express';
import { searchFixtures, searchTeam } from '../services/search.service'
import { pageDtoConfig } from '../utils/types'

export const searchTeamHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {

    try {

        const { search, page, limit } = req.query;

        const query = { search, page, limit } as unknown as pageDtoConfig;

        const result = await searchTeam(query);

        return res.status(200).json({
            status: 'success',
            data: result
        });

    } catch (err: any) {
        next(err);
    }

};

export const searchFixtureHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {

    try {

        const { search, page, limit } = req.query;

        const query = { search, page, limit } as unknown as pageDtoConfig;

        const result = await searchFixtures(query);

        return res.status(200).json({
            status: 'success',
            data: result
        });

    } catch (err: any) {
        next(err);
    }

};