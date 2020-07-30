/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { response } from 'express';

let socket;
const Messages = ({ authStatus }) => {
  const ENDPOINT = 'localhost:3000';
  const { username } = authStatus;
  // const { loaded, setLoaded } = useState('');
  const [messageRooms, setMessageRooms] = useState('');
  // currentRoom is the message_id, references 2 particpants
  // setRoom called onClick of list item
  const [currentRoom, setRoom] = useState('no one');
  // messages for current room - loaded via http on room join and disconnect
  const [messages, setMessages] = useState([]);
  // current message - sent to server via socket
  const [message, setMessage] = useState('');
  // const [room, setRoom] = useState('')

  /** On component mount
   * 1. fetch list of messageRooms (IDs and partners) from DB - use to render message rooms
   * 2. map over list; for each room, render a list item with value === messageRoom id
   */
  useEffect(() => {
    const fetchData = async () => {
      const results = await fetch(`api/messages/${username}`);
      setMessageRooms(results.data); // ? no idea what this data will look like
      // setLoaded(true);
    };
    fetchData();
  }, []);
  // create a list item for each messaging pair

  // sets room when list item clicked
  const changeRoom = (e) => setRoom(e.target.value);

  const chatPartners = response.map((room) => (
    <ListGroup.Item key={room.id} value={room.id} onClick={changeRoom}>
      {room.partner}
    </ListGroup.Item>
  ));

  const sendMessage = event => { // onClick event of 'Send Message' button
    event.preventDefault();
    console.log('message in sendmsg', message)
    socket.emit('sendMessage', message, () => setMessage(''))
  }

  return (
    /* list of chat participants */
    <Container>
      <h2>Inbox</h2>
      <ListGroup variant="flush">
        {/* {chatPartners} */}
        <ListGroup.Item value="id1" onClick={changeRoom}>
          Cras justo odio
        </ListGroup.Item>
        <ListGroup.Item value="id2" onClick={changeRoom}>
          Dapibus ac facilisis in
        </ListGroup.Item>
        <ListGroup.Item value="id3" onClick={changeRoom}>
          Morbi leo risus
        </ListGroup.Item>
        <ListGroup.Item value="id4" onClick={changeRoom}>
          Porta ac consectetur ac
        </ListGroup.Item>
      </ListGroup>
      {/* list of chat participants */}
      <div className="container chatContainer">
        <div className="row chatRow" style={{ height: '45vh', width: '100%' }} />
        {messages.map((msg, index) =>
          // if you are the sender, render your message
          msg.user === username ? (
            // console.log('message.user', message.name)
            <div
              key={index}
              className="row"
              style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', margin: '0px' }}
            >
              <p>{msg.text}</p>
            </div>
          ) : (
            // if someone else is the sender, render their message
            <div
              key={index}
              className="row"
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                backgroundColor: 'whitesmoke',
                margin: '0px',
                borderRadius: '5px',
              }}
            >
              <p>{msg.text}</p>
            </div>
          ),
        )}
        {/* message input */}
        <form>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1" />
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              value={message}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-primary w-100" type="submit" onClick={sendMessage}>
            Send Message
          </button>
        </form>
      </div>
    </Container>
  );
};

export default Messages;
