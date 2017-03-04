const bcrypt = require('bcrypt-as-promised')
const boom = require('boom')
const express = require('express')
const jwt = require('jsonwebtoken')
const knex = require('../../knex')
const { camelizeKeys } = require('humps')

const router = express.Router()

router.get('/token', (req, res) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, _payload) => {
    if (err) {
      return res.send(false)
    }

    res.send(true)
  })
})

router.post('/token', (req, res, next) => {
  const { email, password } = req.body
  let user

  knex('users')
    .where('email', email)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(400, 'Bad email or password')
      }

      user = row

      return bcrypt.compare(password, user.hashed_password)
    })
    .then(() => {
      const claim = { userId: user.id }
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '7 days'
      })

      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),  // 7 days
        secure: router.get('env') === 'production'
      })

      delete user.hashed_password

      res.send(user)
    })
    .catch(bcrypt.MISMATCH_ERROR, () => {
      throw boom.create(400, 'Bad email or password')
    })
    .catch((err) => {
      next(err)
    })
})

router.delete('/token', (req, res) => {
  res.clearCookie('token')
  res.end()
})

module.exports = router
