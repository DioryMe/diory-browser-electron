import { useStore } from '../../store'

export const useConnections = (connectorId) => {
  const [{ roomId }] = useStore((state) => state.navigation)
  const [{ connections }] = useStore((state) => state.connectors)

  return {
    connections: Object.entries(connections)
      .map(([address, connection]) => ({ address, ...connection }))
      .filter(({ room }) => room === roomId)
      .filter(({ connector }) => connector === connectorId),
  }
}
