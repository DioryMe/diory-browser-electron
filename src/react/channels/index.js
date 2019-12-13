import React, { createContext, useContext } from 'react';
import useDiographChannel from './diograph'

export const ChannelContext = createContext();

export const ChannelProvider = ({ children }) => {
  useDiographChannel()

  return (
    <ChannelContext.Provider
      children={children}
    />
  )
}

export const useChannels = () => useContext(ChannelContext);
