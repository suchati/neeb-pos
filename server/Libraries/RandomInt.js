export default (int) => {
  const set = '0123456789'
  const setLen = set.length
  let number = ''
  for (let i = 0; i < int; i++) {
    const n = Math.floor(Math.random() * setLen)
    number += set[n]
  }
  return number
}
