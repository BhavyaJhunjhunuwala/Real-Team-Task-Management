import express from 'express';
import { createTeam, inviteMember, getTeams } from '../controllers/teamController';

const router = express.Router();

router.post('/', createTeam);
router.post('/invite', inviteMember);

router.get('/', getTeams);

export default router;
