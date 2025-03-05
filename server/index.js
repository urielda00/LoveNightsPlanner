// npm's import:
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

// routers import:
import datesRouter from './routes/dates.js';
import tripsRouter from './routes/trips.js';
import reviewsRouter from './routes/reviews.js';
import coupleUserRouter from './routes/coupleUser.js';
import attractionsRouter from './routes/attractions.js';
import natureLocationsRouter from './routes/natureLocations.js';

// configurations:
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// middlewares on setup
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('common')); //logger of morgan
app.use(bodyParser.urlencoded({ extended: true }));
//app.use('/getStatic', express.static('uploads'));
app.use(express.urlencoded({ limit: '30mb', extended: false }));
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' })); //for XXS

// routers
app.use('/trips', tripsRouter);
app.use('/dates', datesRouter);
app.use('/auth', coupleUserRouter);
app.use('/reviews', reviewsRouter);
app.use('/nature', natureLocationsRouter);
app.use('/attractions', attractionsRouter);

mongoose
	.connect(process.env.DB_URL)
	.then(() => {
		console.log('connected to the db!');
		app.listen(port, () => {
			console.log(`app is listening at port: ${port}`);
		});
	})
	.catch((error) => console.error('Error connecting to the database:', error.message));
