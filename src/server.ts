import express from 'express';
import morgan from 'morgan';
import router from './router';

const app = express();

app.use(morgan('dev'));

app.use('/api', router);

app.get('/', (req, res) => {
	return res.status(200).json({ message: 'ChangeLog App API' });
});

export default app;
