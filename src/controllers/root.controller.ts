import {Request, Response} from 'express';

export class RootController {
  getRoot(req: Request, res: Response) {
    res.json({message: 'welcome to light bridge controller'});
  }
}
