import express from 'express';
import {
    getAllUsersHandler,
    getMeHandler,
} from '../controllers/user.controller';
import { deserializeUser } from '../middlewares/deserializeUser';
import { requireUser } from '../middlewares/requireUser';
import { restrictTo } from '../middlewares/restrictTo';
import { validateUserToken } from '../middlewares/verifyToken';
import { RolesTypeEnum } from '../utils/enums/user.roles.enum';

const router = express.Router();

// router.use(deserializeUser, requireUser);

// Admin Get Users route
router.get('/', validateUserToken, getAllUsersHandler);

// Get my info route
router.get('/me', getMeHandler);

export default router;