import React, { useState } from "react";
import { Container, ListGroup, ListGroupItem} from 'react-bootstrap'
import { response } from "express";

let socket;
const Messages = (props) => {
  const ENDPOINT = 'localhost:3000'
  const {username, isLoggedIn} = authStatus;
  const {loaded, setLoaded} = useState('');
  const [messageRooms, setMessageRooms] = useState('')
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
      const results = await axios.get(`api/messages/${username}`);
      setMessageRooms(results.data); // ? no idea what this data will look like
      setLoaded(true);
    };

    fetchData();
  }, [])
  // create a list item for each messaging pair
  const chatPartners = response.map(room => 
    <ListGroup.Item value={room.id} onClick={changeRoom}>{room.partner}</ListGroup.Item>
    )

  // sets room when list item clicked
  const changeRoom = e => setRoom(e.target.value);




  
  return (
/* list of chat participants */
  <Container>
    <h2>Inbox</h2>
    <ListGroup variant="flush">
      {chatPartners}
      <ListGroup.Item value={id1} onClick={changeRoom}>Cras justo odio</ListGroup.Item>
      <ListGroup.Item value={id2} onClick={changeRoom}>Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item value={id3} onClick={changeRoom}>Morbi leo risus</ListGroup.Item>
      <ListGroup.Item value={id4} onClick={changeRoom}>Porta ac consectetur ac</ListGroup.Item>
    </ListGroup>

    /* list of chat participants */
  <div className="container chatContainer">
  <div className="row chatRow" style={{height: '45vh', width: '100%'}}></div>
      {messages.map((message, index) => { 

        //if you are the sender, render your message
        return message.user === name ? 
          // console.log('message.user', message.name)
           (
            <div className="row" key={index} style={{width: '100%', display: 'flex', justifyContent: 'flex-end', margin: '0px'}}>
              <p>
                {message.text}
              </p>
            </div>
          )
        // if someone else is the sender, render their message
        : (
          <div className="row" key={index} style={{width: '100%', display: 'flex', justifyContent: 'flex-start', backgroundColor: 'whitesmoke', margin: '0px', borderRadius: '5px'}}>
            <p>
              {message.text}
             </p> 
        </div> 
           )
      })} 
      {/* message input */}
        <form>
          <div className="form-group">
            <label for="exampleFormControlTextarea1"></label>
               <textarea  
                 className="form-control" 
                 id="exampleFormControlTextarea1" 
                 rows="3"
                 value={message} 
                onChange={handleChange}> 
                </textarea> 
            </div>
            <button type="submit" class="btn btn-primary w-100" onClick={sendMessage}>Send Message</button>
         </form>
      </div>
      </Container>
  );
}

export default Messages;

// <div className="container msgContainer mx-10vh">
// <div className="row" style={{ height: '100vh' }}>
//   {/* --- LIST OF USER MESSAGE ROOMS ---- */}
//   <div className="col-3 msgList " style={{ marginTop: '30vh', fontSize: '1.2rem', lineHeight: '1.1' }} >

//     <div class="list-group-flush">
//     <button type="button" class="list-group-item list-group-item-action" value="no one" style={{ height: '6vh' }} >Choose someone:</button>

//       {listOfRooms}
//       <button type="button" class="list-group-item list-group-item-action" value="Catherine" style={{ height: '6vh' }} onClick={changeRoom}>
//         Catherine
//       </button>
//       <button type="button" class="list-group-item list-group-item-action" value="Serena" onClick={changeRoom} style={{ height: '6vh' }} >Serena</button>
//       <button type="button" class="list-group-item list-group-item-action" value="Dave" onClick={changeRoom} style={{ height: '6vh' }} >Dave</button>
//       <button type="button" class="list-group-item list-group-item-action" value="John" onClick={changeRoom} style={{ height: '6vh' }}>John</button>
//       <button type="button" class="list-group-item list-group-item-action" value="Michelle" onClick={changeRoom} style={{ height: '6vh' }}>Michelle</button>
//       <button type="button" class="list-group-item list-group-item-action" value="Erin" onClick={changeRoom} style={{ height: '6vh' }}>Erin</button>
//     </div>
//   </div>

//   {/*---- CHAT AREA ----- */}
//   <div className="col-9 chatContainer">

//     <Chat currentRoom={currentRoom} userEmail={props.userEmail} />

//   </div>

//   {/* closing row + container divs */}
// </div>
// </div>
