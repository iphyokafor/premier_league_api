import teamModel, { Team } from "../models/team.model";
import { UpdateTeamInput } from "../schemas/team.schema";

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
    return team;
};

export const findTeamByIdAndUpdate = async (
    id: string,
    data: UpdateTeamInput
) => {
    const team = await teamModel
        .findByIdAndUpdate(id, { $set: data }, { new: true })
        .lean();
    return team;
};

export const findTeamByIdAndDelete = async (id: string, createdBy: string) => {
    console.log({ id, createdBy });
    
// const team = await teamModel.findById(id);

// // const {createdBy} = team;

// console.log('team', team)

const deleteTeam = await teamModel.findByIdAndUpdate({ _id: id, isDeleted: false, deletedAt: null }, {
    $set: { isDeleted: true, deletedAt: new Date(), deletedBy: createdBy },
});
console.log("deleteTeam", deleteTeam);

return deleteTeam;


    // const team = await teamModel.findByIdAndUpdate({ id, isDeleted: false, deletedAt: null }, {
    //     $set: { isDeleted: true, deletedAt: new Date(), deletedBy: id },
    // });
    // return team;
};
