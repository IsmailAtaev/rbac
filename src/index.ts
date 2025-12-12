import express from 'express';
import { connectCheck } from "./infra/db";
import { envCheck } from "./infra/env";
import { getEnv } from "./infra/env/service";
import { router } from './routes';

const port = getEnv('PORT');
const host = getEnv('HOST');

const app = express();

app.use(express.json());
app.use('/api', router);

const main = async () => {
    try {
        await envCheck();
        await connectCheck();

        app.listen(Number(port), host, () => console.log(`Server running on http://${host}:${port}`));
    } catch (e: any) {
        console.log(e);
        process.exit(1);
    }
};

main();


// app.get('/api/health', (req, res) => res.json({ status: 'ok' }));