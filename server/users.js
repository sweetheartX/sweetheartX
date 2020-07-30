/* this file stores an array and functions that manage message rooms via socket IDs, and the users in them */

const users = [];

const addUser = ({ id, name, room }) => {
  const user = { id, name, room };
  users.push(user);
  return { user };
};

// removes user from current room
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
