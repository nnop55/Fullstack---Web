import { Request, Response, Express } from 'express';
import { ApiResponseType } from '../models/unions';


export class AppHelper {

    constructor() { }

    get(app: Express, route: string, func: ApiResponseType) {
        app.get(route, async (req: Request, res: Response) => {
            await func(req, res)
        })
    }

    post(app: Express, route: string, func: ApiResponseType) {
        app.post(route, async (req: Request, res: Response) => {
            await func(req, res)
        })
    }

    update(app: Express, route: string, func: ApiResponseType) {
        app.put(route, async (req: Request, res: Response) => {
            await func(req, res)
        })
    }

    delete(app: Express, route: string, func: ApiResponseType) {
        app.delete(route, async (req: Request, res: Response) => {
            await func(req, res)
        })
    }

}
