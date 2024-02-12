import { Request, Response, Express, Router } from 'express';
import { Auth } from '../api/auth';
import { Database } from '../data-access/database';
import { Token } from './token';


export class AppHelper {
    private authorization: Auth
    private token: Token

    constructor(protected app: Express, protected db: Database) {
        this.token = new Token()
        this.authorization = new Auth(this.token);
    }

    public async loginUser() {
        this.app.post('/auth/login', async (req: Request, res: Response) => {
            await this.authorization.login(req, res, this.db)
        })
    }

    public async registerUser() {
        this.app.post('/auth/register', async (req: Request, res: Response) => {
            await this.authorization.register(req, res, this.db)
        })
    }

    public async logoutUser() {
        this.app.post('/auth/logout', this.token.verifyToken, async (req: Request, res: Response) => {
            await this.authorization.logout(req, res)
        })
    }

    public async getUsers() {
        this.app.get('/get-users', this.token.verifyToken, async (req: Request, res: Response) => {
            await this.authorization.getUsers(req, res, this.db)
        })
    }


    // public mountRouter(app: Express, mainRoute: string, router: Router): void {
    //     app.use(mainRoute, router)
    // }

}
