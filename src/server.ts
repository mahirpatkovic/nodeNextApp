import * as express from 'express';
import * as http from 'http';
import { config } from './config/Config';
import { AppDataSource } from './config/data-source';
import Router from './routes/Router';
import * as bodyParser from 'body-parser';
import { errorMiddleware } from './middlewares/error';
import { corsMiddleware } from './middlewares/cors';
import { rateLimitMiddleware } from './middlewares/rateLimit';
import { securityMiddleware } from './middlewares/security';

class Server {
    private app: express.Application = express();

    constructor() {
        this.app.enable('trust proxy');
        this.setupParser();
        this.configureMiddleware();
        this.connectToDatabase();
        this.configureRoutes();
        this.app.use(errorMiddleware);
        this.startServer();
    }

    private setupParser(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    private configureMiddleware(): void {
        this.app.use(corsMiddleware);
        this.app.use('/api/v1', rateLimitMiddleware);
        securityMiddleware(this.app);
    }

    private configureRoutes(): void {
        new Router(this.app);
    }

    private connectToDatabase(): void {
        AppDataSource.initialize()
            .then(() => {
                console.log('Successfully connected to database...');
            })
            .catch((err) => {
                console.log('Cannot connect to db', err);
            });
    }

    private startServer(): void {
        // this.app.use(express.static(path.join(, '../client/build')));
        //
        // this.app.get('*', (req, res) => {
        //     res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
        // });

        const server = http.createServer(this.app);
        server.listen(config.port, () => {
            console.log(`App running on port ${config.port}...`);
        });
    }
}

new Server();
// this.app.use(function (req, res, next) {
//     res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Credentials', 'true');

//     res.header(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, X-HTTP-Method-Override, content-type, Accept, Authorization',
//     );
//     // if ('OPTIONS' == req.method) {
//     //     res.sendStatus(200);
//     // } else {
//     //     next();
//     // }
//     res.send({ msg: 'This has CORS enabled 🎈' });
// });
