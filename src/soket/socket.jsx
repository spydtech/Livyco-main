import { io } from 'socket.io-client';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

let socket;

export const initializeSocket = (token) => {
  socket = io(API_BASE_URL, {
    withCredentials: true,
    auth: { token },
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error('Socket not initialized. Call initializeSocket first.');
  }
  return socket;
};

export const joinConversation = (conversationId, userId) => {
  socket.emit('joinConversation', { conversationId, userId });
};

export const leaveConversation = (conversationId) => {
  socket.emit('leaveConversation', { conversationId });
};

export const sendMessageViaSocket = (messageData) => {
  socket.emit('sendMessage', messageData);
};

export const sendTypingIndicator = (conversationId, userId) => {
  socket.emit('typing', { conversationId, userId });
};

export const sendStopTypingIndicator = (conversationId) => {
  socket.emit('stopTyping', { conversationId });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};