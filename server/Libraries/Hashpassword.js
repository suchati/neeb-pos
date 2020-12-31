/* import crypto from 'crypto'

const Hashsha256 = (pass) => {
  return crypto.createHash('sha256').update(pass).digest('base64')
}

export default (password, salt) => {
  const hash = Hashsha256(password + salt)
  const SH = salt + hash
  return Buffer.from(SH).toString('base64')
} */
import bcrypt from 'bcrypt'

export default (password, salt) => {
  const hash = password + salt
  const passwordhash = bcrypt.hashSync(hash, salt)
  return passwordhash
}
