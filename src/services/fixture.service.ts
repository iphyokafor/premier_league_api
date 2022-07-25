import config from "config";
import shortid from "shortid";
import fixtureModel, { Fixture } from "../models/fixture.model";
import teamModel from "../models/team.model";
import AppError from "../utils/appError";

type updateFixtureConfig = {
    homeScore: number;
    awayScore: number;
    played: boolean;
};

export const createFixture = async (input: Partial<Fixture>) => {

    try {

        const code = shortid.generate();

        const uniqueFixtureUrl = `${config.get("base_url")}/fixtures/${code}`;

        const fixture = await fixtureModel.create({
            ...input,
            shortCode: code,
            link: uniqueFixtureUrl,
        });

        return fixture;

    } catch (error) {
        throw error;
    }

};

// Find All fixtures
export const findAllFixtures = async () => {

    try {

        return await fixtureModel
            .find({ isDeleted: false, deletedAt: null })
            .populate("homeTeam awayTeam", "name coach _id");

    } catch (error) {
        throw error;
    }

};

export const findFixtureById = async (id: string) => {

    try {

        const fixture = await fixtureModel
            .findById(id)
            .select({ name: 1, coach: 1 })
            .lean();

        return fixture;

    } catch (error) {
        throw error;
    }

};

export const findFixtureByLink = async (shortCode: string) => {

    try {

        const fixture = await fixtureModel
            .findOne({
                shortCode,
                isDeleted: false,
                deletedAt: null,
            })
            .populate("homeTeam awayTeam", "name coach _id");

        if (!fixture) {
            throw new AppError("fixture not found", 404);
        }

        return fixture;

    } catch (error) {
        throw error;
    }

};

export const completedFixtures = async () => {

    try {

        const playedMatches = await fixtureModel
            .find({ played: true, isDeleted: false, deletedAt: null })
            .populate("homeTeam awayTeam", "name coach _id");

        if (!playedMatches || playedMatches.length === 0) {
            throw new AppError("No played matches yet", 400);
        }

        return playedMatches;

    } catch (error) {
        throw error;
    }

};

export const pendingFixtures = async () => {

    try {

        const pendingMatches = await fixtureModel
            .find({ played: false, isDeleted: false, deletedAt: null })
            .populate("homeTeam awayTeam", "name coach _id");

        if (!pendingMatches || pendingMatches.length === 0) {
            throw new AppError("No pending matches yet", 400);
        }

        return pendingMatches;

    } catch (error) {
        throw error;
    }

};

export const checkIfFixtureIsDeleted = async (id: string) => {

    try {

        const fixtureExists = await fixtureModel.findOne({
            _id: id,
            isDeleted: true,
        });

        return fixtureExists;

    } catch (error) {
        throw error;
    }

};

export const findFixtureByIdAndUpdate = async (
    id: string,
    data: updateFixtureConfig
) => {

    const { homeScore, awayScore, played } = data;

    try {

        const fixture = await fixtureModel
            .findByIdAndUpdate(id, { $set: data }, { new: true })
            .lean();

        const homeTeam = fixture?.homeTeam;
        const awayTeam = fixture?.awayTeam;

        if (fixture) {
            const home = await teamModel.findById(homeTeam);
            const away = await teamModel.findById(awayTeam);

            // update match details if played
            if (played && home && away) {
                if (homeScore > awayScore) {
                    home.wins += 1;
                    away.losses += 1;
                    home.goals += homeScore;
                    away.goals += awayScore;
                } else if (homeScore < awayScore) {
                    home.losses += 1;
                    away.wins += 1;
                    away.goals += awayScore;
                    home.goals += homeScore;
                } else {
                    away.goals += awayScore;
                    home.goals += homeScore;
                }

                await Promise.all([home.save(), away.save()]);
            }
        }

        return fixture;

    } catch (error) {
        throw error;
    }

};

export const findFixtureByIdAndDelete = async (
    id: string,
    createdBy: string
) => {

    try {

        const deleteFixture = await fixtureModel.findByIdAndUpdate(
            { _id: id, isDeleted: false, deletedAt: null },
            {
                $set: { isDeleted: true, deletedAt: new Date(), deletedBy: createdBy },
            }
        );

        if (!deleteFixture) {
            throw new AppError("No records found", 400);
        }

        return deleteFixture;

    } catch (error) {
        throw error;
    }

};
