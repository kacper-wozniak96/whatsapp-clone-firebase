import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, Mic, MoreVert, Search } from '@material-ui/icons';
import React, { useState } from 'react';
import './Chat.scss';

export default function Chat() {
  const [input, setInput] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(input);
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at .....</p>
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
