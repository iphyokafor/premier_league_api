import teamModel, { Team } from "../models/team.model";
import { UpdateTeamInput } from "../schemas/team.schema";
import AppError from "../utils/appError";

export const createTeam = async (input: Partial<Team>) => {

    const team = await teamModel.create(input);

    return team;

};

// Find All teams
export const findAllTeams = async () => {
    return await teamModel.find();
};

export const findTeamById = async (id: string) => {

    const team = await teamModel.findById(id).lean();

    if (!team) {
        throw new AppError('Team not found', 404);
    }

    return team;

};

export const findTeamByIdAndUpdate = async (
    id: string,
    data: UpdateTeamInput
) => {

    const team = await teamModel
        .findByIdAndUpdate(id, { $set: data }, { new: true })
        .lean();

    if (!team) {
        throw new AppError('Unable to update team, team not found', 404);
    }

    return team;

};

export const findTeamByIdAndDelete = async (id: string, createdBy: string) => {

    const deleteTeam = await teamModel.findByIdAndUpdate({ _id: id, isDeleted: false, deletedAt: null }, {
        $set: { isDeleted: true, deletedAt: new Date(), deletedBy: createdBy },
    });

    if (!deleteTeam) {
        throw new AppError('Unable to delete team, team does not exist', 404);
    }

    return deleteTeam;

};
