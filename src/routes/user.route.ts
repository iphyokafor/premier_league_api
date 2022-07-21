import express from 'express';
import {
    getAllUsersHandler,
    getMeHandler,
} from '../controllers/user.controller';
import { restrictTo } from '../middlewares/restrictTo';
import { validateUserToken } from '../middlewares/verifyToken';
import { RolesTypeEnum } from '../utils/enums/user.roles.enum';

const router = express.Router();

// Admin Get Users route
router.get('/', [validateUserToken, restrictTo(RolesTypeEnum.admin)], getAllUsersHandler);

// Get my info route
router.get('/me', validateUserToken, getMeHandler);

export default router;