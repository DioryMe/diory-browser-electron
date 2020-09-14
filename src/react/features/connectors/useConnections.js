import { useStore } from '../../store'

export const useConnections = (connectorId) => {
  const [{ roomId }] = useStore((state) => state.navigation)
  const [{ connections }] = useStore((state) => state.connectors)

  const connectorConnections = Object.entries(connections)
    .map(([address, connection]) => ({ address, ...connection }))
    .filter(({ connector }) => connector === connectorId)

  return {
    connect: connectorConnections
      .filter(({ room }) => room === roomId)
      .filter(({ connecting, connected }) => !connecting && !connected),
    disconnect: connectorConnections
      .filter(({ room }) => room !== roomId)
      .filter(({ connected }) => connected),
  }
}
