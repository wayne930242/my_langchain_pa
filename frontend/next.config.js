// @ts-nocheck
const path = require('path')
require('dotenv').config({
  path: path.resolve(
    __dirname,
    process.env.NODE_ENV === 'production' ? '../.env' : '../.env.local'
  ),
})

module.exports = {
  env: {
    API_URL: process.env.API_URL,
    DEBUG: process.env.DEBUG,
  },
  i18n: {
    locales: ['en', 'tw'],
    localeDetection: false,
    defaultLocale: 'tw',
  },
}
