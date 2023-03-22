import express from 'express';
import router from './router';

const app = express();

app.use('/api', router);

app.get('/', (req, res) => {
	return res.status(200).json({ message: 'ChangeLog App API' });
});

export default app;
