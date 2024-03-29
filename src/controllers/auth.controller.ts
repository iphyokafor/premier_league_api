import config from "config";
import { CookieOptions, NextFunction, Request, Response } from "express";
import { CreateUserInput, LoginUserInput } from "../schemas/user.schema";
import {
    createUser,
    emailExists,
    findUser,
    signToken,
} from "../services/user.service";
import AppError from "../utils/appError";

// Cookie options
const accessTokenCookieOptions: CookieOptions = {
    expires: new Date(
        Date.now() + config.get<number>("accessTokenExpiresIn") * 60 * 1000
    ),
    maxAge: config.get<number>("accessTokenExpiresIn") * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
};

// Only set secure to true in production
if (process.env.NODE_ENV === "production")
    accessTokenCookieOptions.secure = true;

export const registerHandler = async (
    req: Request<{}, {}, CreateUserInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, email, password, role } = req.body;

        const checkUserExist = await emailExists(email);

        if (checkUserExist) {
            return res.status(409).json({
                status: "fail",
                message: "Email already exist",
            });
        }

        const user = await createUser({
            email,
            name,
            password,
            role,
        });

        const { access_token } = await signToken(user);

        return res.status(201).json({
            status: "success",
            data: {
                user,
                access_token,
            },
        });
    } catch (err: any) {
        next(err);
    }
};

export const loginHandler = async (
    req: Request<{}, {}, LoginUserInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        // Get the user from the collection
        const user = await findUser({ email: req.body.email });

        // Check if user exist and password is correct
        if (
            !user ||
            !(await user.comparePasswords(user.password, req.body.password))
        ) {
            return next(new AppError("Invalid email or password", 401));
        }

        // Create an Access Token
        const { access_token } = await signToken(user);

        // Send Access Token in Cookie
        res.cookie("access_token", access_token, accessTokenCookieOptions);

        res.cookie("logged_in", true, {
            ...accessTokenCookieOptions,
            httpOnly: false,
        });

        // Send Access Token
        return res.status(200).json({
            status: "success",
            access_token,
        });
    } catch (err: any) {
        next(err);
    }
};
