import { RolesTypeEnum } from "../../utils/enums/user.roles.enum";

const user = {
    name: "john Doe",
    email: "doe@gmail.com",
    password: "password1234",
    passwordConfirm: "password1234"
};

const admin = {
    name: "Melanie Smith",
    email: "melanie@gmail.com",
    password: "password1234",
    passwordConfirm: "password1234",
    role: RolesTypeEnum.admin
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
    name: 'Aston Villa',
    nickName: 'The Villans',
    coach: 'John Terry',
    website: 'https://www.astonvillafc.com',
    founded: 1874,
    stadiumName: 'Villa Park',
    stadiumCapacity: '42,682',
}

const updateTeam = {
    name: 'aston villa',
    nickName: 'The Villans',
    coach: 'Dwane Johnson',
    website: 'https://www.astonvillafc.com',
}


export { user, user2, admin, admin2, team, updateTeam };