export const startsWithPeriod =
  (selectedPeriod) =>
  ({ date }) =>
    date && date.startsWith(selectedPeriod)
