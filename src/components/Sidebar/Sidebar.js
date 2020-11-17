/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './Sidebar.scss';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { IconButton, Avatar } from '@material-ui/core';
// import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined, Chat } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import SidebarChat from './SidebarChat/SidebarChat';
import db from '../../firebase';
import { useViewport } from '../../contexts/contextViewport';
import { useStateValue } from '../../contexts/StateProvider';

export default function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const { windowWidth } = useViewport();
  const { roomId } = useParams();
  const breakpoint = 620;
  // const [sidebarLogic, setSidebarLogic] = useState();
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

  console.log(roomId);
  // if (typeof roomId === 'undefined') {
  //   console.log('roomId jest undefined');
  // }

  // const sidebarLogicFn = () => {
  //   if ((windowWidth < breakpoint && !roomId) || windowWidth > breakpoint) {
  //     setSidebarLogic(true);
  //   } else {
  //     setSidebarLogic(false);
  //   }
  // };

  // sidebarLogicFn();

  // eslint-disable-next-line prettier/prettier
  return ((windowWidth < breakpoint && typeof roomId === 'undefined') || windowWidth > breakpoint) ? (
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
