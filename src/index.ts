import 'reflect-metadata';
import express from 'express';
import connectDB from './config/db';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);

connectDB().then(() => {
    app.listen(process.env.PORT, () => console.log('Server running on http://localhost:3000'));
});

export default app;