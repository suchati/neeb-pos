/* export default () => {
  const len = 64
  const set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ'
  const setLen = set.length
  let salt = ''
  for (let i = 0; i < len; i++) {
    const p = Math.floor(Math.random() * setLen)
    salt += set[p]
  }
  return salt
} */
import bcrypt from 'bcrypt'

export default () => {
  const salt = bcrypt.genSaltSync(10)
  return salt
}
