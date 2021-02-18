export function reduceIdsToKeys(acc, item) {
  acc[item.id] = item
  return acc
}
