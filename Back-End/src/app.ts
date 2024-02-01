import express, { Express } from 'express';
import { AppHelper } from './services/app-helper';


export class App extends AppHelper {
    app: Express = express()

    constructor() {
        super()

        this.setup()
        const PORT = process.env.PORT || 3000;
        this.app.listen(PORT, () => {
            console.log(`Server is running`);
        });
    }

    setup() {
        // this.get(this.app,'Test',('' as any,'' as any))
    }

}

new App();