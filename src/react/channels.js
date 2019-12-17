import React, { createContext, useContext } from 'react';
import useHomeChannel from './features/home/channels'
import useRoomChannel from './features/room/channels'

export const ChannelContext = createContext();

export const ChannelProvider = ({ children }) => {
  useHomeChannel()
  useRoomChannel()

  return (
    <ChannelContext.Provider
      children={children}
    />
  )
}

export const useChannels = () => useContext(ChannelContext);
