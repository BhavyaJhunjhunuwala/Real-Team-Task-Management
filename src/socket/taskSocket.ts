// import { Server, Socket } from 'socket.io';
// import User from '../models/User';
// import Team from '../models/Team';

// export const setupTaskSockets = (io: Server) => {
//   io.on('connection', async (socket: Socket) => {
//     const token = socket.handshake.auth.token;
//     if (!token) return socket.disconnect();

//     try {
//       const decoded = jwt.verify(token, config.jwtSecret) as { id: string };
//       const user = await User.findById(decoded.id);
//       if (!user) return socket.disconnect();

//       // Join team rooms
//       for (const teamId of user.teams) {
//         socket.join(`team_${teamId}`);
//       }

//       socket.on('disconnect', () => {
//         console.log('User disconnected');
//       });
//     } catch (err) {
//       socket.disconnect();
//     }
//   });
// };






// import { Server, Socket } from 'socket.io';
// import jwt from 'jsonwebtoken'; // ← ADD THIS
// import { config } from '../config'; // ← ADD THIS
// import User from '../models/User';
// import Team from '../models/Team';

// export const setupTaskSockets = (io: Server) => {
//   io.on('connection', async (socket: Socket) => {
//     const token = socket.handshake.auth.token;
//     if (!token) return socket.disconnect();

//     try {
//       const decoded = jwt.verify(token, config.jwtSecret) as { id: string };
//       const user = await User.findById(decoded.id);
//       if (!user) return socket.disconnect();

//       // Join team rooms
//       for (const teamId of user.teams) {
//         socket.join(`team_${teamId}`);
//       }

//       socket.on('disconnect', () => {
//         console.log('User disconnected');
//       });
//     } catch (err) {
//       socket.disconnect();
//     }
//   });
// };




// import { Server, Socket } from 'socket.io';
// import jwt from 'jsonwebtoken';
// import { config } from '../config';
// import User from '../models/User';

// export const setupTaskSockets = (io: Server) => {
//   io.use(async (socket: Socket, next) => {
//     const token = socket.handshake.auth?.token;
//     if (!token) return next(new Error('Authentication error: No token'));

//     try {
//       const decoded = jwt.verify(token, config.jwtSecret) as { id: string };
//       const user = await User.findById(decoded.id).select('teams').lean();

//       if (!user) return next(new Error('User not found'));

//       // Attach user to socket
//       (socket as any).user = {
//         id: user._id.toString(),
//         teams: user.teams.map((t: any) => t.toString()),
//       };

//       next();
//     } catch (err) {
//       return next(new Error('Invalid token'));
//     }
//   });

//   io.on('connection', (socket: Socket) => {
//     const user = (socket as any).user;
//     console.log(`User ${user.id} connected`);

//     // Join all team rooms
//     for (const teamId of user.teams) {
//       socket.join(`team_${teamId}`);
//       console.log(`User ${user.id} joined team_${teamId}`);
//     }

//     socket.on('disconnect', (reason) => {
//       console.log(`User ${user.id} disconnected: ${reason}`);
//     });

//     // Optional: Handle manual leave
//     socket.on('leaveTeam', (teamId: string) => {
//       socket.leave(`team_${teamId}`);
//     });
//   });
// };





// src/sockets/realtimeSocket.ts
import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import User from '../models/User';

export const setupRealtimeSockets = (io: Server) => {
  // JWT Authentication Middleware
  io.use(async (socket: Socket, next) => {
   
    const token = 
    (socket.handshake.query.auth_token as string) ||
    (socket.handshake.auth?.token as string);


    if (!token) return next(new Error('No token provided'));

    try {
      const decoded = jwt.verify(token, config.jwtSecret) as { id: string };
      const user = await User.findById(decoded.id).select('teams').lean();
      if (!user) return next(new Error('User not found'));

      (socket as any).user = {
        id: user._id.toString(),
        teams: user.teams.map((t: any) => t.toString()),
      };
      next();
    } catch (err) {
      return next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket: Socket) => {
    const user = (socket as any).user;
    console.log(`User ${user.id} connected via Socket.IO`);

    // Join all team rooms
    user.teams.forEach((teamId: string) => {
      socket.join(`team_${teamId}`);
      console.log(`User ${user.id} joined room: team_${teamId}`);
    });

    // Optional: Manual join/leave
    socket.on('joinTeam', (teamId: string) => {
      if (user.teams.includes(teamId)) {
        socket.join(`team_${teamId}`);
      }
    });

    socket.on('leaveTeam', (teamId: string) => {
      socket.leave(`team_${teamId}`);
    });

    socket.on('disconnect', (reason) => {
      console.log(`User ${user.id} disconnected: ${reason}`);
    });
  });
};