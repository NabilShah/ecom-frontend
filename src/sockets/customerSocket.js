import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_SOCKET_URL, {
  transports: ["websocket"],
});

export const joinCustomerRoom = (customerId) => {
  socket.emit("joinCustomer", customerId);
};

export default socket;
