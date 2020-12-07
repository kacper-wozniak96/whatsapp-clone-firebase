import React, { useEffect, useState } from 'react';
import './Sidebar.scss';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { IconButton, Avatar } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined, Chat } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import SidebarChat from './SidebarChat/SidebarChat';
import db, { auth } from '../../firebase';
import { useViewport } from '../../contexts/contextViewport';
import { useStateValue } from '../../contexts/contextUser/UserStateProvider';

export default function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const { windowWidth } = useViewport();
  const { roomId } = useParams();
  const breakpoint = 620;
  // eslint-disable-next-line no-unused-vars
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = db.collection('rooms').onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => {
      return unsubscribe();
    };
  }, []);

  console.log(auth.currentUser.uid);

  return (windowWidth < breakpoint && typeof roomId === 'undefined') || windowWidth > breakpoint ? (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__avatar">
          <Avatar src={user.photoURL} />
        </div>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  ) : null;
}
