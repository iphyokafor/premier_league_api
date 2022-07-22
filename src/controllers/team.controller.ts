import { NextFunction, Request, Response } from "express";

import { CreateTeamInput } from "../schemas/team.schema";
import {
    createTeam,
    findAllTeams,
    findTeamByIdAndDelete,
    findTeamByIdAndUpdate,
} from "../services/team.service";

export const createTeamHandler = async (
    req: Request<{}, {}, CreateTeamInput>,
    res: Response,
    next: NextFunction
) => {

    try {

        const user = res.locals.user._id;
        // const user = req.currentUser._id;

        const payload = req.body;

        const team = await createTeam({
            ...payload,
            createdBy: user
        });

        res.status(201).json({
            status: "success",
            data: {
                team,
            },
        });

    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: "fail",
                message: "Nick name already exist",
            });
        }

        next(err);
    }

};

export const getAllTeamsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const teams = await findAllTeams();

        res.status(200).json({
            status: "success",
            result: teams.length,
            data: {
                teams,
            },
        });
    } catch (err: any) {
        next(err);
    }
};

export const updateTeamHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const { id } = req.params;

    const payload = req.body;

    try {

        const updateTeam = await findTeamByIdAndUpdate(id, payload);

        if (updateTeam) {

            return res
                .status(200)
                .json({
                    status: "success",
                    message: `Team ${updateTeam.name} has been updated successfully.`,
                });

        }

    } catch (err: any) {
        next(err.message);
    }
};

export const deleteTeamHandler = async (
    req: Request,
    res: Response,
    next: NextFunction) => {

    const { id } = req.params;

    const userId = res.locals.user._id
    // const userId = req.currentUser._id

    try {

        const deleteTeam = await findTeamByIdAndDelete(id, userId);

        if (deleteTeam) {

            return res
                .status(200)
                .json({
                    status: "success",
                    message: `Team ${deleteTeam.name} has been deleted successfully.`,
                });

        }


    } catch (err) {
        next(err);
    }

}