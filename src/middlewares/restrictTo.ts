import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';
import { RolesTypeEnum } from '../utils/enums/user.roles.enum';

export const restrictTo =
    (...allowedRoles: string[]) =>
        (req: Request, res: Response, next: NextFunction) => {
            console.log("allowedRoles", allowedRoles);
            
            const user = res.locals.user;
            console.log("user", user.role);
            
            if (!allowedRoles.includes(user.role)) {
                return next(
                    new AppError('You are not allowed to perform this action', 403)
                );
            }

            next();

        };