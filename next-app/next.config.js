const path = require('path')
require('dotenv').config({
  path: path.resolve(
    __dirname,
    process.env.NODE_ENV === 'production' ? '../.env' : '../.env.local'
  ),
})

module.exports = {
  env: {
    DJANGO_API: process.env.DJANGO_API,
  },
  i18n: {
    locales: ['en', 'tw'],
    localeDetection: false,
    defaultLocale: 'tw',
  },
}
