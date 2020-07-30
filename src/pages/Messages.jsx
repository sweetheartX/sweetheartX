/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Row, Col, Button } from 'react-bootstrap';
import io from "socket.io-client";

// const IDs = ['room1', 'room2', 'room3']

let socket;
const Messages = ({ authStatus }) => {
  const ENDPOINT = 'localhost:3000';
  const name = authStatus.username || 'addescapecharhere?'
  // const { loaded, setLoaded } = useState('');
  const [messageRooms, setMessageRooms] = useState('');
  // currentRoom is the message_id, references 2 particpants
  // setRoom called onClick of list item
  const [room, setRoom] = useState('no one');
  // messages for current room - loaded via http on room join and disconnect
  const [messages, setMessages] = useState([]);
  // current message - sent to server via socket
  const [message, setMessage] = useState('');
  // const [room, setRoom] = useState('')

  /** On component mount or room change **
   * 1. fetch list of messageRooms (IDs and partners) from DB - use to render message rooms
   * 2. map over list; for each room, render a list item with value === messageRoom id
   */
  useEffect(() => {
    // fetch data for list of messagesRooms and current room
    // fetchData();
    socket = io(ENDPOINT);
    // emit 'join' event to server
    socket.emit('join', { name, room }, ({ error }) => {
      console.log('Error joining room', error);
    });
    // on disconnectioning from socket or leaving the current room
    return () => {
      socket.emit('disconnect'); 
      socket.off(); 
      // clear messages in state - had to do this to force the app to clear the messages displays
      setMessages([]);
    };
  }, [ENDPOINT, room]);

  /* On message submission */
  useEffect(() => {
    // listen for 'message' event (returned message is an object with 'user' and 'text' props) 
    socket.on('message', (message) => {
      console.log(message)
      setMessages([...messages, message]) 
    })
  }, [messages])

  /* Method Defs */

  // on mount, fetch message data
  // const fetchData = async () => {
  //   const results = await fetch(`api/messages/${username}`);
  //   setMessageRooms(results.data); // ? no idea what this data will look like
  //   // setLoaded(true);
  // };

  // create a list item for each messaging pair
  // const chatPartners = messageRooms.map((room) => (
  //   <ListGroup.Item key={room.id} value={room.id} onClick={changeRoom}>
  //     {room.partner}
  //   </ListGroup.Item>
  // ));
  // track text input in state
  const handleChange = (e) => setMessage(e.target.value);
  // send message to server (onclick)
  const sendMessage = (event) => {
    event.preventDefault();
    socket.emit('sendMessage', message, () => setMessage(''));
  };
  // set room when list item clicked
  const changeRoom = (e) => {
    console.log('room change', e.target.value)
    setRoom(e.target.value);
  }

  /* render */
  return (
    /* ---- list of chat participants ----*/
    <Container>
      <Row style={{ height: '100vh' }}>
        <Col style={{ marginTop: '30vh', fontSize: '1.2rem', lineHeight: '1.1' }}>
          <h2>Inbox</h2>
          <ListGroup variant="flush">
            {/* {chatPartners} */}
            <ListGroup.Item ><Button value="id1" onClick={changeRoom}>
              Room 1
            </Button></ListGroup.Item>
            <ListGroup.Item ><Button value="id1" onClick={changeRoom}>
              Room 2
            </Button></ListGroup.Item>
            <ListGroup.Item ><Button value="id1" onClick={changeRoom}>
              Room 3
            </Button></ListGroup.Item>
            <ListGroup.Item ><Button value="id1" onClick={changeRoom}>
              Room 4
            </Button></ListGroup.Item>
          </ListGroup>
        </Col>

        {/* list of chat participants */}
        <Col>
          <div className="container chatContainer">
            <div className="row chatRow" style={{ height: '45vh', width: '100%' }} />
            {messages.map((msg, index) =>
              // if you are the sender, render your message
              msg.user === name ? (
                
                <div
                  key={index}
                  className="row"
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    margin: '0px',
                  }}
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
            {/* ------- message input ------- */}
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
        </Col>
      </Row>
    </Container>
  );
};

export default Messages;
