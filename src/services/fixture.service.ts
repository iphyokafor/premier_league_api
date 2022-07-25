import config from "config";
import shortid from "shortid";
import fixtureModel, { Fixture } from "../models/fixture.model";
import teamModel from "../models/team.model";
import AppError from "../utils/appError";

type updateFixtureConfig = {
    homeScore: number,
    awayScore: number,
    played: boolean,
}

export const createFixture = async (input: Partial<Fixture>) => {

    const code = shortid.generate();

    const uniqueFixtureUrl = `${config.get('base_url')}/fixtures/${code}`;

    const fixture = await fixtureModel.create({
        ...input,
        shortCode: code,
        link: uniqueFixtureUrl
    });

    return fixture;

};

// Find All fixtures
export const findAllFixtures = async () => {
    return await fixtureModel.find().populate(
        'homeTeam awayTeam',
        'name coach _id',
    );
};

export const findFixtureById = async (id: string) => {

    const fixture = await fixtureModel.findById(id).select({ name: 1, coach: 1 }).lean();

    return fixture;

};

export const findFixtureByLink = async (shortCode: string) => {

    const fixture = await fixtureModel.findOne({
        shortCode
    }).populate('homeTeam awayTeam', 'name coach _id')

    if (!fixture) {
        throw new AppError('fixture not found', 404)
    }

    return fixture;

}

export const completedFixtures = async () => {

    const playedMatches = await fixtureModel.find({ played: true }).populate(
        'homeTeam awayTeam',
        'name coach _id',
    );

    if (!playedMatches || playedMatches.length === 0) {
        throw new AppError('No played matches yet', 400);
    }

    return playedMatches;

}

export const pendingFixtures = async () => {

    const pendingMatches = await fixtureModel.find({ played: false }).populate(
        'homeTeam awayTeam',
        'name coach _id',
    );

    if (!pendingMatches || pendingMatches.length === 0) {
        throw new AppError('No pending matches yet', 400);
    }

    return pendingMatches;

}

export const findFixtureByIdAndUpdate = async (
    id: string,
    data: updateFixtureConfig
) => {

    const { homeScore, awayScore, played } = data;

    try {

        const fixture = await fixtureModel
            .findByIdAndUpdate(id, { $set: data }, { new: true })
            .lean();

        if (!fixture) {
            throw new AppError('Sorry, unable to update fixture at this time', 400);
        }

        const { homeTeam, awayTeam } = fixture;

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

                await Promise.all([
                    home.save(),
                    away.save()
                ])
                
            }
        }

        return fixture;

    } catch (error) {
        throw error;
    }

};

export const findFixtureByIdAndDelete = async (id: string, createdBy: string) => {

    const deleteFixture = await fixtureModel.findByIdAndUpdate({ _id: id, isDeleted: false, deletedAt: null }, {
        $set: { isDeleted: true, deletedAt: new Date(), deletedBy: createdBy },
    });

    if (!deleteFixture) {
        throw new AppError('No records found', 400)
    }

    return deleteFixture;

};
