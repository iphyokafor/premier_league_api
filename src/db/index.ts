import teams from './seed/teams';
import fixtures from './seed/fixtures';
import users from './seed/users';
import teamModel, { Team } from '../models/team.model';
import fixtureModel from '../models/fixture.model';
import userModel from '../models/user.model';
import bcrypt from 'bcryptjs';

const cleanDb = async () => {
  try {
    console.log('Succesfully cleared db');
    await teamModel.deleteMany({});
    await fixtureModel.deleteMany({});
    await userModel.deleteMany({});
  } catch (err) {
    console.log('Error occurred', err);
    return err;
  }
};

const seedTeam = async () => {
  try {
    const allTeams = teams.map(async (team) => {
      const newTeam = await userModel.create(team);
      return newTeam
    });
    const res = await Promise.all(allTeams);
    return res;
  } catch (err) {
    console.log({ err });
    return err;
  }
};

const seedUser = async () => {
  try {
    const allUsers = users.map(async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      const newUser = await userModel.create(user);
      return newUser
    });
    const res = await Promise.all(allUsers);
    return res;
  } catch (err) {
    console.log({ err });
    return err;
  }
};

const seedFixture = async () => {
  try {
    const allfixtures = fixtures.map(async (fixture) => {
      const hometeam = await teamModel.findOne({ name: fixture.homeTeam }).exec();
      const awayteam = await teamModel.findOne({ name: fixture.awayTeam }).exec();
      if (hometeam && awayteam) {
        const newFixtures = fixtureModel.create({
          ...fixture,
          homeTeam: hometeam.id,
          awayTeam: awayteam.id,
        });
        await newFixtures;
      }
    });
    const res = await Promise.all(allfixtures);
    return res;
  } catch (err) {
    console.log({ err });
    return err;
  }
};

const seed = async () => {
  return await cleanDb()
    .then(async () => {
      await seedTeam();
      await seedUser();
      await seedFixture();
    })
    .then(() => console.log(`Database seeded successfully.`))
    .catch(err =>
      console.log({ err }),
    );
};

export default seed;
