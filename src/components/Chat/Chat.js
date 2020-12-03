/* eslint-disable no-unused-vars */
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, Mic, MoreVert, Search, ExitToApp } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import firebase from 'firebase';
import db from '../../firebase';
import './Chat.scss';
import { useStateValue } from '../../contexts/contextUser/UserStateProvider';
import { useViewport } from '../../contexts/contextViewport';

export default function Chat() {
  const [input, setInput] = useState('');
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const { windowWidth, breakpoint } = useViewport();

  const sendMessage = (e) => {
    e.preventDefault();
    // console.log(input);

    db.collection('rooms').doc(roomId).collection('messages').add({
      name: user.displayName,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput('');
  };

  // useEffect(() => {
  //   if (roomId) {
  //     db.collection('rooms')
  //       .doc(roomId)
  //       .onSnapshot((snapshot) => {
  //         setRoomName(snapshot.data().name);
  //       });

  //     db.collection('rooms')
  //       .doc(roomId)
  //       .collection('messages')
  //       .orderBy('timestamp', 'asc')
  //       .onSnapshot((snapshot) => {
  //         // console.log(snapshot.docs);
  //         setMessages(snapshot.docs.map((doc) => doc.data()));
  //       });
  //   }
  // }, [roomId]);

  useEffect(() => {
    db.collection('rooms')
      .doc(roomId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            message: doc.data().message,
            timestamp: doc.data().timestamp,
            name: doc.data().name,
          }))
        );
      });
  }, [roomId]);

  useEffect(() => {
    db.collection('rooms')
      .doc(roomId)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setRoomName(doc.data().name);
        } else {
          console.log('No such document!');
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
  }, [roomId]);

  useEffect(() => {
    const objDiv = document.getElementById('chat');
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [messages]);

  // console.log(user);

  return (
    <div className="chat">
      <div className="chat__header">
        {windowWidth < breakpoint && (
          <Link to="/">
            <IconButton>
              <ExitToApp className="chat__exit-button" />
            </IconButton>
          </Link>
        )}
        <Avatar />
        <div className="chat__headerInfo">
          <div>
            <h3>{roomName}</h3>
            {/* <p>
              Last seen message at{' '}
              {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}{' '}
            </p> */}
          </div>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body" id="chat">
        {messages.map((message) => (
          <p className={`chat__message ${message.name === user.displayName && `chat__receiver`}`}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
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
