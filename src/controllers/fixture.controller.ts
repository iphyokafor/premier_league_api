import { NextFunction, Request, Response } from "express";
import fixtureModel from "../models/fixture.model";
import { CreateFixtureInput } from "../schemas/fixture.schema";
import { checkIfFixtureIsDeleted, completedFixtures, createFixture, findAllFixtures, findFixtureByIdAndDelete, findFixtureByIdAndUpdate, findFixtureByLink, pendingFixtures } from "../services/fixture.service";
import { findTeamById } from "../services/team.service";
import AppError from "../utils/appError";


export const getFixtureHandler = async (
    req: Request,
    res: Response,
    next: NextFunction) => {

    const { shortCode } = req.params;

    try {

        const fixture = await findFixtureByLink(shortCode);

        if (fixture) {

            return res.status(200).json({
                status: "success",
                data: {
                    fixture,
                },
            });

        }

    } catch (err: any) {
        next(err)
    }

}

export const getAllFixturesHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const viewAllFixtures = await findAllFixtures();

        return res.status(200).json({
            status: "success",
            data: {
                viewAllFixtures,
            },
        });

    } catch (err: any) {
        next(err)
    }
}

export const getCompletedFixturesHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const viewCompletedFixtures = await completedFixtures();

        if (viewCompletedFixtures) {

            return res.status(200).json({
                status: "success",
                data: {
                    viewCompletedFixtures,
                },
            });

        }

    } catch (err) {
        next(err)
    }

}

export const getPendingFixturesHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const viewPendingFixtures = await pendingFixtures();

        if (viewPendingFixtures) {

            return res.status(200).json({
                status: "success",
                data: {
                    viewPendingFixtures,
                },
            });

        }

    } catch (err) {
        next(err)
    }

}

export const createFixtureHandler = async (
    req: Request<{}, {}, CreateFixtureInput>,
    res: Response,
    next: NextFunction
) => {

    try {

        const user = res.locals.user._id;

        const payload = req.body;

        const { homeTeam, awayTeam } = payload;

        const home = await findTeamById(homeTeam);

        if (!home) return next(new AppError("Home Team not found", 400));

        const away = await findTeamById(awayTeam);

        if (!away) return next(new AppError("Away Team not found", 400));

        const fixture = await createFixture({
            ...payload,
            createdBy: user,
        });

        return res.status(201).json({
            status: "success",
            data: {
                fixture,
            },
        });

    } catch (err: any) {
        next(err);
    }

};

export const updateFixtureHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const { id } = req.params;

    const payload = req.body;

    try {
        const checkIsDeleted = await checkIfFixtureIsDeleted(id);

        if (checkIsDeleted) {
            return res
            .status(404)
            .json({
                status: "fail",
                message: `Cannot update fixture as it doesn not exist or has been deleted`,
            });
        } else { 
            
            const updateFixture = await findFixtureByIdAndUpdate(id, payload);
    
            if (!updateFixture) {
                return res
                    .status(400)
                    .json({
                        status: "fail",
                        message: `Sorry, unable to update fixture at this time`,
                    });
            }
    
            return res
                .status(200)
                .json({
                    status: "success",
                    message: `Fixture has been updated successfully.`,
                });

        }
        

    } catch (err: any) {
        console.log('error---', err)
        next(err.message);
    }

};

export const deleteFixtureHandler = async (
    req: Request,
    res: Response,
    next: NextFunction) => {

    const { id } = req.params;

    const userId = res.locals.user._id;

    try {

        const deleteFixture = await findFixtureByIdAndDelete(id, userId);

        if (deleteFixture) {

            return res
                .status(200)
                .json({
                    status: "success",
                    message: `Fixture has been deleted successfully.`,
                });

        }

    } catch (err) {
        next(err);
    }

}