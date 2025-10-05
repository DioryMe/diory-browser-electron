export const startsWithPeriod =
  (selectedPeriod) =>
  ({ date, id }) =>
    date && date.startsWith(selectedPeriod) && id !== selectedPeriod
