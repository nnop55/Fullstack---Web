import { Request, Response, Express, Router } from 'express';
import { User } from '../api/user';
import { Database } from '../data-access/database';


export class AppHelper {
    user = new User()

    constructor() { }

    public async loginUser(app: Express, db: Database) {
        app.post('/auth/login', async (req: Request, res: Response) => {
            await this.user.login(req, res, db)
        })
    }

    public async registerUser(app: Express, db: Database) {
        app.post('/auth/register', async (req: Request, res: Response) => {
            await this.user.register(req, res, db)
        })
    }

    public async getUsers(app: Express, db: Database) {
        app.get('/get-users', async (req: Request, res: Response) => {
            await this.user.getUsers(req, res, db)
        })
    }


    // public mountRouter(app: Express, mainRoute: string, router: Router): void {
    //     app.use(mainRoute, router)
    // }

}
