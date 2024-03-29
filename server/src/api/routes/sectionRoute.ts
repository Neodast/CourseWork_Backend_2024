import express, { Router } from 'express';
import sectionController from '../controllers/sectionController';

const sectionRouter: Router = express.Router();

sectionRouter.get('/sections', sectionController.getAllSections);
sectionRouter.post('/newSection', sectionController.createSection);

export default sectionRouter;
