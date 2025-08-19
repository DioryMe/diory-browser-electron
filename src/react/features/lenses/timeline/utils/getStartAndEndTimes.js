export const getStartAndEndTimes = (diories) => {
  const times = diories
    .map(({ date }) => date)
    .filter(Boolean)
    .map((isoDate) => new Date(isoDate).getTime())
  return {
    startTime: times.length ? Math.min(...times) : null,
    endTime: times.length ? Math.max(...times) : null,
  }
}
