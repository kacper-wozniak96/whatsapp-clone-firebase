import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, Mic, MoreVert, Search } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import db from '../../firebase';
import './Chat.scss';

export default function Chat() {
  const [input, setInput] = useState('');
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(input);

    setInput('');
  };

  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
        });
    }
  }, [roomId]);

  console.log(roomId);

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <div>
            <h3>{roomName}</h3>
            <p>Last seen at .....</p>
          </div>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <Search />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        <p className="chat__message">
          <span className="chat__name">Kacper</span>
          adasd
          <span className="chat__timestamp">3:52pm</span>
        </p>
        <p className={`chat__message ${true && `chat__receiver`}`}>
          <span className="chat__name">Kacper</span>
          adasd
          <span className="chat__timestamp">3:52pm</span>
        </p>
        <p className="chat__message">
          <span className="chat__name">Kacper</span>
          adasd
          <span className="chat__timestamp">3:52pm</span>
        </p>
        <p className="chat__message">
          <span className="chat__name">Kacper</span>
          adasd
          <span className="chat__timestamp">3:52pm</span>
        </p>
        <p className={`chat__message ${true && `chat__receiver`}`}>
          <span className="chat__name">Kacper</span>
          adasd
          <span className="chat__timestamp">3:52pm</span>
        </p>
      </div>

      <div className="chat__footer">
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <form action="">
          <input
            value={input}
            type="text"
            placeholder="Type a message"
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <IconButton>
          <Mic />
        </IconButton>
      </div>
    </div>
  );
}
