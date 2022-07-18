import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';
import { RolesTypeEnum } from '../utils/enums/user.roles.enum';

export const restrictTo =
    (...allowedRoles: RolesTypeEnum[]) =>
        (req: Request, res: Response, next: NextFunction) => {

            const user = res.locals.user;

            if (!allowedRoles.includes(user.role)) {
                return next(
                    new AppError('You are not allowed to perform this action', 403)
                );
            }

            next();

        };