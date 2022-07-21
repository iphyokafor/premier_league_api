import express from 'express';
import { createFixtureHandler, deleteFixtureHandler, getAllFixturesHandler, getCompletedFixturesHandler, getFixtureHandler, getPendingFixturesHandler, updateFixtureHandler } from '../controllers/fixture.controller';
import { validate } from '../middlewares/validate';
import { validateUserToken } from '../middlewares/verifyToken';
import { createFixtureSchema, updateFixtureSchema } from '../schemas/fixture.schema';

const router = express.Router();

// router.use(deserializeUser, requireUser);

// create fixture route
router.post('/create', [validateUserToken, validate(createFixtureSchema)], createFixtureHandler);

// get unique fixture route
router.get('/:shortCode', validateUserToken, getFixtureHandler);

// get completed fixture route
router.get('/get/completed', validateUserToken, getCompletedFixturesHandler);

// get pending fixture route
router.get('/get/pending', validateUserToken, getPendingFixturesHandler);

// get all fixture route
router.get('/', validateUserToken, getAllFixturesHandler);

// // update Fixture route
router.put('/update-fixture/:id', [validateUserToken, validate(updateFixtureSchema)], updateFixtureHandler);

// // delete Fixtures route
router.patch('/delete-fixture/:id', validateUserToken, deleteFixtureHandler);

export default router;