import * as dotenv from 'dotenv';
dotenv.config();
import config from './config';
import app from './server';

const PORT = config.port;

app.listen(PORT, () => {
	console.log(`🚀 listening on ${PORT}`);
});
