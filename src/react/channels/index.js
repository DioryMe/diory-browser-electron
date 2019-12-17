import React, { createContext, useContext } from 'react';
import useHomeChannel from './home'
import useRoomChannel from './room'

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
