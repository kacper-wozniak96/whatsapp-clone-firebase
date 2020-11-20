/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import './SidebarChat.scss';
import { Link } from 'react-router-dom';
import db from '../../../firebase';


export default function SidebarChat({ addNewChat, name, id }) {

  const [seed, setSeed] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (id) {
      db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => (
        setMessages(snapshot.docs.map((doc) => doc.data()))
      ))
    }
  })

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [id]);

  const createChat = () => {
    const roomName = prompt("Yo enter name");

    if (roomName) {
      db.collection('rooms').add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
      <div onClick={createChat} className="sidebarChat" onKeyDown={createChat} role="button" tabIndex="0">
        <h2>Add New Chat</h2>
      </div>
    )



}
