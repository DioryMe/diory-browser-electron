export const getStartAndEndTimes = (diories) => {
  const times = diories
    .map(({ date }) => date)
    .filter(Boolean)
    .map((isoDate) => new Date(isoDate).getTime())
  return {
    startTime: Math.min(...times),
    endTime: Math.max(...times),
  }
}
