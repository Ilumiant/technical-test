const request = require('supertest')
const app = require('../../app')
const http = require('http')

describe('test controller', () => {
  let application = null
  let server = null
  beforeAll(() => {
    application = app
    server = http.createServer(application)
    server.listen(3001)
  })

  afterAll(async () => {
    await server.close()
  })

  it('should return a note list', async () => {
    // Act
    return request(application)
      .get('/notes')
      .expect(200)
      .then(({ body }) => {
        // Assert
        expect(body.error).toBe(false)
        expect(Array.isArray(body.data)).toBe(true)
      })
  })
})
