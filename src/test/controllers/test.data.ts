import { RolesTypeEnum } from "../../utils/enums/user.roles.enum";

const user = {
  name: "john Doe",
  email: "doe@gmail.com",
  password: "password1234",
  passwordConfirm: "password1234",
};

const admin = {
  name: "Melanie Smith",
  email: "melanie@gmail.com",
  password: "password1234",
  passwordConfirm: "password1234",
  role: RolesTypeEnum.admin,
};

const user2 = {
  email: "doe@gmail.com",
  password: "password1234",
};

const admin2 = {
  email: "melanie@gmail.com",
  password: "password1234",
};

const team = {
  name: "Aston Villa",
  nickName: "The Villans",
  coach: "John Terry",
  website: "https://www.astonvillafc.com",
  founded: 1874,
  stadiumName: "Villa Park",
  stadiumCapacity: "42,682",
};

const team2 = {
  name: "Juventus",
  nickName: "The juvs",
  website: "juvs.com",
  coach: "Ronaldo",
  founded: 2017,
  stadiumName: "Italy",
  stadiumCapacity: "50,000",
};

const updateTeam = {
  name: "aston villa",
  nickName: "The Villans",
  coach: "Dwane Johnson",
  website: "https://www.astonvillafc.com",
};

const fixture = {
  time: "1:30pm",
  stadium: "Dean Court",
};

const updateFixture = {
    "homeScore": 2,
    "awayScore": 1,
    "played": true
}

export { user, user2, admin, admin2, team, team2, updateTeam, fixture, updateFixture };
