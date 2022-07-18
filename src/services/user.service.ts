import { FilterQuery, QueryOptions } from 'mongoose';
import config from 'config';
import userModel, { User } from '../models/user.model';
import { signJwt } from '../utils/jwt';
import redisClient from '../utils/connectRedis';
import { DocumentType } from '@typegoose/typegoose';

// CreateUser service
export const createUser = async (input: Partial<User>) => {
    const user = await userModel.create(input);
    return user;
};

// Find User by Id
export const findUserById = async (id: string) => {
    const user = await userModel.findById(id).lean();
    return user;
};

// Find All users
export const findAllUsers = async () => {
    return await userModel.find();
};

// Find one user by any fields
export const findUser = async (
    query: FilterQuery<User>,
    options: QueryOptions = {}
) => {
    return await userModel.findOne(query, {}, options).select('+password');
};

// Sign Token
export const signToken = async (user: DocumentType<User>) => {
    // Sign the access token
    const access_token = signJwt(

        { user: user.id, role: user.role },

        {
            expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
        }
        
    );

    // Create a Session
    redisClient.set(user.id, JSON.stringify(user), {
        EX: 60 * 60,
    });

    // Return access token
    return { access_token };
};

