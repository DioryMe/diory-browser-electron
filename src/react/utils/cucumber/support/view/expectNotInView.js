export function expectNotInView(word1, word2) {
  expect(this.app.exists(`${word1}-${word2}`)).toBe(false)
}
