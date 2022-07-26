import fixtureModel from "../models/fixture.model";
import teamModel from "../models/team.model";
import { pageDtoConfig } from "../utils/types";

export const searchTeam = async (props: pageDtoConfig) => {
    let { search, page, limit } = props;

    try {
        page = !page || isNaN(page) ? 1 : Number(page);

        const searchQueries = {
            $or: [
                { name: { $regex: search, $options: "ig" } },
                { nickName: { $regex: search, $options: "ig" } },
                { coach: { $regex: search, $options: "ig" } },
                { stadiumName: { $regex: search, $options: "ig" } },
            ],
        };

        page = page < 1 ? 1 : Number(page);

        limit = !limit || isNaN(limit) ? 5 : Number(limit);

        const query = search ? searchQueries : {};

        const count = await teamModel.countDocuments(query);

        const totalPages = Math.ceil(count / limit);

        page = page > totalPages ? totalPages : page;

        const skip = page > 0 ? (page - 1) * limit : 0;

        const team = await teamModel
            .find(query)
            .sort({ createadAt: -1 })
            .limit(limit * 1)
            .skip(skip)
            .lean();

        return {
            data: team,
            meta: {
                totalPages: totalPages,
                currentpages: page,
                totalTeam: count,
            },
        };
    } catch (error) {
        throw error;
    }
};

export const searchFixtures = async (props: pageDtoConfig) => {
    let { search, page, limit } = props;

    try {
        page = !page || isNaN(page) ? 1 : Number(page);

        const searchQueries = {
            $or: [{ stadium: { $regex: search, $options: "ig" } }],
        };

        page = page < 1 ? 1 : Number(page);

        limit = !limit || isNaN(limit) ? 5 : Number(limit);

        const query = search ? searchQueries : {};

        const count = await fixtureModel.countDocuments(query);

        const totalPages = Math.ceil(count / limit);

        page = page > totalPages ? totalPages : page;

        const skip = page > 0 ? (page - 1) * limit : 0;

        const fixture = await fixtureModel
            .find(query)
            .populate("homeTeam awayTeam", "name coach _id")
            .sort({ createadAt: -1 })
            .limit(limit * 1)
            .skip(skip)
            .lean();

        return {
            data: fixture,
            meta: {
                totalPages: totalPages,
                currentpages: page,
                totalFixtures: count,
            },
        };
    } catch (error) {
        throw error;
    }
};
