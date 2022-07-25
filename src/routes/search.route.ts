import express from 'express';
import { searchFixtureHandler, searchTeamHandler } from '../controllers/search.controller';

const router = express.Router();

router.get('/search-team', searchTeamHandler);

router.get('/search-fixture', searchFixtureHandler);

export default router;