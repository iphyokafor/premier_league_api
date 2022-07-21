import { NextFunction, Request, Response } from "express";
import userModel from "../models/user.model";
import { object, string } from "zod";
import { validate } from "../middlewares/validate";
import AppError from "../utils/appError";
import { verifyJwt } from "../utils/jwt";
import { findUserById } from "../services/user.service";
import redisClient from "../utils/connectRedis";

export const validateUserToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    // const schema = object({
    //     body: object({
    //         authorization: string({
    //             required_error: "authorization is required",
    //         }).regex(
    //             /^Bearer [A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
    //         ),
    //     }),
    // });

    // validate(schema);

    let access_token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        access_token = req.headers.authorization.split(' ')[1];

    } else if (req.cookies.access_token) {
        access_token = req.cookies.access_token;
    }

    if (!access_token) {
        return next(new AppError('You are not logged in', 401));
    }

    // Validate Access Token
    const decoded = verifyJwt(access_token) as Record<string, any>

    if (!decoded) {
        return next(new AppError(`Invalid token or user doesn't exist`, 401));
    }

    try {
        // Check if user has a valid session
        const session = await redisClient.get(decoded.user);

        if (!session) {
            return next(new AppError(`User session has expired`, 401));
        }

        //   Check if user still exist
        const user = await findUserById(JSON.parse(session).user.id);

        if (!user) {
            return next(new AppError(`User with that token no longer exist`, 401));
        }

        req.currentUser = user;

        return next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            error: "Invalid or no Authorization Token was provided.",
        });
    }
};

