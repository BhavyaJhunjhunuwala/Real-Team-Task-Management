// import express from 'express';
// import mongoose from 'mongoose';
// import http from 'http';
// import { Server } from 'socket.io';
// import swaggerUi from 'swagger-ui-express';
// import { config } from './config';
// import authRoutes from './routes/authRoutes';
// import teamRoutes from './routes/teamRoutes';
// import projectRoutes from './routes/projectRoutes';
// import taskRoutes from './routes/taskRoutes';
// import setupSwagger from './swagger';
// import { authMiddleware } from './middleware/authMiddleware';
// import { setupTaskSockets } from '../src/socket/taskSocket';

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: { origin: '*' },
// });


// app.set('io', io); // ← ADD THIS LINE

// setupTaskSockets(io);



// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/teams', authMiddleware, teamRoutes);
// app.use('/api/projects', authMiddleware, projectRoutes);
// app.use('/api/tasks', authMiddleware, taskRoutes);

// // Swagger
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(setupSwagger()));

// // Connect to MongoDB
// mongoose.connect(config.mongoURI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Setup Sockets
// setupTaskSockets(io);

// server.listen(config.port, () => {
//   console.log(`Server running on port ${config.port}`);
// });




// import 'reflect-metadata';
// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import http from 'http';
// import { Server } from 'socket.io';
// import swaggerUi from 'swagger-ui-express';
// import { config } from './config';
// import authRoutes from './routes/authRoutes';
// import teamRoutes from './routes/teamRoutes';
// import projectRoutes from './routes/projectRoutes';
// import taskRoutes from './routes/taskRoutes';
// import setupSwagger from './swagger';
// import { authMiddleware } from './middleware/authMiddleware';
// import { setupRealtimeSockets } from '../src/socket/taskSocket';

// const app = express();
// const server = http.createServer(app);
// // const io = new Server(server, {
// //   cors: { origin: '*' },
// // });

// app.use(cors({
//   origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // ← Frontend URL
//   credentials: true,
// }));

// // Socket.IO with CORS
// const io = new Server(server, {
//   cors: {
//     origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
//     methods: ['GET', 'POST'],
//     credentials: true,
//   },
// });



// app.use(express.json());

// // Attach io to app
// app.set('io', io); // ← CRITICAL: ADD THIS LINE

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/teams', authMiddleware, teamRoutes);
// app.use('/api/projects', authMiddleware, projectRoutes);
// app.use('/api/tasks', authMiddleware, taskRoutes);

// // Swagger
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(setupSwagger()));

// // Connect to MongoDB
// mongoose.connect(config.mongoURI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Setup Sockets
// // setupTaskSockets(io);
// setupRealtimeSockets(io);

// server.listen(config.port, () => {
//   console.log(`Server running on port ${config.port}`);
// });

// export default app;



import 'reflect-metadata';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { config } from './config';
import authRoutes from './routes/authRoutes';
import teamRoutes from './routes/teamRoutes';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';
import { authMiddleware } from './middleware/authMiddleware';
import { setupRealtimeSockets } from './socket'; // ← FIXED PATH
import swaggerRoute from "./swagger";


import type {   Request, Response } from 'express';


const app = express();
const server = http.createServer(app);
app.use(cors());

// app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});
app.set('io', io);
setupRealtimeSockets(io);


app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});


app.use('/api/auth', authRoutes);
app.use('/api/teams', authMiddleware, teamRoutes);
app.use('/api/projects', authMiddleware, projectRoutes);
app.use('/api/tasks', authMiddleware, taskRoutes);


app.use(swaggerRoute);

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
 console.log(`Server running on http://localhost:${PORT}`);
  console.log(`WebSocket: ws://localhost:${PORT}`);
});

export default app;