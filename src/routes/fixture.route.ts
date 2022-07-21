import express from 'express';
import { createFixtureHandler, deleteFixtureHandler, getAllFixturesHandler, getCompletedFixturesHandler, getFixtureHandler, getPendingFixturesHandler, updateFixtureHandler } from '../controllers/fixture.controller';
import { validate } from '../middlewares/validate';
import { restrictTo } from '../middlewares/restrictTo';
import { validateUserToken } from '../middlewares/verifyToken';
import { createFixtureSchema, updateFixtureSchema } from '../schemas/fixture.schema';
import { RolesTypeEnum } from '../utils/enums/user.roles.enum';

const router = express.Router();

// create fixture route
router.post('/create', [validateUserToken, restrictTo(RolesTypeEnum.admin), validate(createFixtureSchema)], createFixtureHandler);

// get unique fixture route
router.get('/:shortCode', validateUserToken, getFixtureHandler);

// get completed fixture route
router.get('/get/completed', validateUserToken, getCompletedFixturesHandler);

// get pending fixture route
router.get('/get/pending', validateUserToken, getPendingFixturesHandler);

// get all fixture route
router.get('/', validateUserToken, getAllFixturesHandler);

// // update Fixture route
router.put('/update-fixture/:id', [validateUserToken, restrictTo(RolesTypeEnum.admin), validate(updateFixtureSchema)], updateFixtureHandler);

// // delete Fixtures route
router.patch('/delete-fixture/:id', [validateUserToken, restrictTo(RolesTypeEnum.admin),], deleteFixtureHandler);

export default router;