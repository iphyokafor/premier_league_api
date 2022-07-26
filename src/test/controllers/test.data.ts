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


export { user, admin, user2 };