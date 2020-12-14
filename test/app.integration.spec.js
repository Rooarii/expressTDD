// test/app.integration.spec.js
const request = require('supertest');
const app = require('../app');
const routes =require('../routes/index')
const connection = require('../connection');

describe('Test routes', () => {
  it('GET / sends "Hello World" as json', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = { message: 'Hello World!'};
        expect(response.body).toEqual(expected);
        done();
      });
  });

  describe('GET /bookmarks/:id', () => {
    const testBookmark = { url: 'https://nodejs.org/', title: 'Node.js' };
    beforeEach((done) => connection.query(
      'TRUNCATE TABLE bookmark', () => connection.query(
        'INSERT INTO bookmark SET ?', testBookmark, done
      )
    ));
  
    // Write your tests HERE!
    it("checks that url /bookmarks/:id doesn't exists", (done) => {
      request(app)
      .get('/bookmarks/:id')
      .expect(404)
      .send({error : 'Bookmark not found'})
      .then(response => {
        const expected = { error : "Bookmark not found"};
        expect(response.body).toEqual(expected);
        done();
      })
    })


    it("checks that url /bookmarks/:id exists", (done) => {
      request(app)
      .get('/bookmarks/1')
      .expect(200)
      .then(response => {
        const expected = { id: 1, url: 'https://nodejs.org/', title: 'Node.js' };
        expect(response.body).toEqual(expected);
        done()
      })
    })
  });
});
