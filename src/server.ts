import express from 'express';
import { connectCheck } from "./infra/db";
import { envCheck } from "./infra/env";
import { getEnv } from "./infra/env/service";

const port = getEnv('PORT');
const host = getEnv('HOST');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

const main = async () => {
    try {
        // await envCheck();
        // await connectCheck();

        app.listen(Number(port), host, () => console.log(`Server running on http://${host}:${port}`));
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

main();