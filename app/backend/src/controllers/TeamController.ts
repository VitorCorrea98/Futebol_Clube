import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) {}

  public async findAll(_req: Request, res: Response) {
    const { status, data } = await this.teamService.findAll();
    console.log({ status, data });
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
