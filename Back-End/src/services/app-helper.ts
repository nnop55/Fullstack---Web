import { Request, Response, Express } from 'express';
import { User } from '../api/user';


export class AppHelper {
    user = new User()

    constructor() { }

    public async loginUser(app: Express) {
        // public async post(app: Express, route: string, func: ApiResponseType): Promise<void> {
        app.post('/auth/authentication', async (req: Request, res: Response) => {
            await this.user.signIn(req, res)
        })
        //}
    }



    // public async post(app: Express, route: string, func: ApiResponseType): Promise<void> {
    //     app.post(route, async (req: Request, res: Response) => {
    //         await func(req, res)
    //     })
    // }

    // public mountRouter(app: Express, mainRoute: string, router: Router): void {
    //     app.use(mainRoute, router)
    // }

}
