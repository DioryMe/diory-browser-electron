import { useStore } from '../../store'

export const useConnections = (connectorId) => {
  const [{ connections }] = useStore((state) => state.connectors)
  return {
    connections: Object.entries(connections)
      .filter(([address]) => address.startsWith(`/${connectorId}/`))
      .map(([address, { room, connected }]) => ({ address, room, connected })),
  }
}
