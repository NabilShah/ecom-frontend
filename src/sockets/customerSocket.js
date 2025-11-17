import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

export const joinCustomerRoom = (customerId) => {
  socket.emit("joinCustomer", customerId);
};

export default socket;
