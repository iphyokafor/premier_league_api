import teamModel, { Team } from "../models/team.model";
import { UpdateTeamInput } from "../schemas/team.schema";
import AppError from "../utils/appError";

export const createTeam = async (input: Partial<Team>) => {
    try {
        const team = await teamModel.create(input);

        return team;
    } catch (error) {
        throw error;
    }
};

// Find All teams
export const findAllTeams = async () => {
    try {
        return await teamModel.find({ isDeleted: false, deletedAt: null });
    } catch (error) {
        throw error;
    }
};

export const findTeamById = async (id: string) => {
    try {
        const team = await teamModel.findById(id).lean();

        if (!team) {
            throw new AppError("Team not found", 404);
        }

        return team;
    } catch (error) {
        throw error;
    }
};

export const nickNameExists = async (nickName: string) => {
    try {
        const team = await teamModel.findOne({ nickName });
        return team;
    } catch (error) {
        throw error;
    }
};

export const checkIfTeamIsDeleted = async (id: string) => {
    try {
        const teamExists = await teamModel.findOne({ _id: id, isDeleted: true });

        return teamExists;
    } catch (error) {
        throw error;
    }
};

export const findTeamByIdAndUpdate = async (
    id: string,
    data: UpdateTeamInput
) => {
    try {
        const team = await teamModel
            .findByIdAndUpdate(id, { $set: data }, { new: true })
            .lean();

        return team;
    } catch (error) {
        throw error;
    }
};

export const findTeamByIdAndDelete = async (id: string, createdBy: string) => {
    try {
        const deleteTeam = await teamModel.findByIdAndUpdate(
            { _id: id, isDeleted: false, deletedAt: null },
            {
                $set: { isDeleted: true, deletedAt: new Date(), deletedBy: createdBy },
            }
        );

        if (!deleteTeam) {
            throw new AppError("Unable to delete team, team does not exist", 404);
        }

        return deleteTeam;
    } catch (error) {
        throw error;
    }
};
