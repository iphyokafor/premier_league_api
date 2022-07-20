import express from 'express';
import { createTeamHandler, deleteTeamHandler, getAllTeamsHandler, updateTeamHandler } from '../controllers/team.controller';
import { deserializeUser } from '../middlewares/deserializeUser';
import { requireUser } from '../middlewares/requireUser';
import { restrictTo } from '../middlewares/restrictTo';
import { validate } from '../middlewares/validate';

import { validateUserToken } from '../middlewares/verifyToken';

import { createTeamSchema, updateTeamSchema } from '../schemas/team.schema';
import { RolesTypeEnum } from '../utils/enums/user.roles.enum';

const router = express.Router();

// router.use(deserializeUser, requireUser);

// create team route
router.post('/create', [validateUserToken, validate(createTeamSchema)], createTeamHandler);

// get Teams route
router.get('/', validateUserToken, getAllTeamsHandler);

// update Teams route
router.put('/update-team/:id', validate(updateTeamSchema), updateTeamHandler);

// delete Teams route
router.patch('/delete-team/:id', validateUserToken, deleteTeamHandler);

export default router;