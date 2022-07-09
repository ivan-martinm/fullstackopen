const logger = require('./logger')

const customLogger = (request, response, next) => {
  const timestamp = new Date().toTimeString().split(' ')[0]
  const log = `${timestamp} - ${request.method} - ${request.path} ${request.method === 'POST' ? JSON.stringify(request.body) : ''}`
  logger.info('--------\n', log)
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted' })
  } else if (error.message === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if (error.message === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  const token = authorization && authorization.toLowerCase().startsWith('bearer ')
    ? authorization.substring(7)
    : null
  request.token = token
  next()
}

module.exports = { customLogger, unknownEndpoint, errorHandler, tokenExtractor }