import { FilterQuery, QueryOptions } from "mongoose";
import config from "config";
import userModel, { User } from "../models/user.model";
import { signJwt } from "../utils/jwt";
import redisClient from "../utils/connectRedis";
import { DocumentType } from "@typegoose/typegoose";

// CreateUser service
export const createUser = async (input: Partial<User>) => {
    try {
        const user = await userModel.create(input);

        return user;
    } catch (error) {
        throw error;
    }
};

// Find User by Id
export const findUserById = async (id: string) => {
    try {
        const user = await userModel.findById(id).lean();

        return user;
    } catch (error) {
        throw error;
    }
};

export const emailExists = async (email: string) => {
    try {
        const user = await userModel.findOne({ email });
        return user;
    } catch (error) {
        throw error;
    }
};

// Find All users
export const findAllUsers = async () => {
    try {
        return await userModel.find();
    } catch (error) {
        throw error;
    }
};

// Find one user by any fields
export const findUser = async (
    query: FilterQuery<User>,
    options: QueryOptions = {}
) => {
    try {
        return await userModel.findOne(query, {}, options).select("+password");
    } catch (error) {
        throw error;
    }
};

// Sign Token
export const signToken = async (user: DocumentType<User>) => {
    try {
        // Sign the access token
        const access_token = signJwt(
            { user: user.id, role: user.role },

            {
                expiresIn: `${config.get<number>("accessTokenExpiresIn")}m`,
            }
        );

        // Create a Session
        redisClient.set(user.id, JSON.stringify({ user, access_token }), {
            EX: 60 * 60,
        });

        // Return access token
        return { access_token };
    } catch (error) {
        throw error;
    }
};
