import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectDB } from './models/DBconnection';
import db from './models';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user';
import newsRoutes from './routes/news';
import commentRoutes from './routes/comment';
import tagRoutes from './routes/tag';
import upvoteRoutes from './routes/upvote';
import bookmarkRoutes from './routes/bookmark';

dotenv.config();

const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ limit: '25mb', extended: true }));

app.get('/', (req, res) => { res.send('Server is running...'); });
app.use('/api/users', userRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/upvotes', upvoteRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.get('*', (req, res) => { res.status(404).send('Sorry, not found 😞'); })


const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    },
});

io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

const SERVER_PORT = process.env.SERVER_PORT;
const startServer = async () => {
    try {
        await connectDB();

        await db.sequelize.sync({ alter: true });
        console.log('🔄 All models were synchronized successfully.');

        httpServer.listen(SERVER_PORT, () => {
            console.log(`🚀 Server is running on port http://localhost:${SERVER_PORT}`);
        });
    } catch (error) {
        console.log(`😞 Sorry, something went wrong! ${error}`);
    }
};

startServer();
