const fs = require('fs');
const assert = require('assert');
const request = require('supertest');
const { createApp } = require('../src/app.js');

describe('Without session', () => {
  let app;
  beforeEach(() => {
    const commentsFile = './test/data/comments.json';
    const templateFile = './resources/guest-book-template.html';
    const usersFile = './test/data/users.json';
    const serveFrom = './public';

    fs.copyFileSync('./test/data/usersInit.json', usersFile);
    config = { commentsFile, templateFile, usersFile, serveFrom };
    app = createApp(config);
  })

  describe('Not Found', () => {
    it('should send not found respose for GET /hello', (done) => {
      request(app)
        .get('/hello')
        .expect('content-type', 'text/plain')
        .expect('/hello Not Found')
        .expect(404, done);
    });
  });

  describe('Method not supported', () => {
    it('should send method not supported for PUT /hello', (done) => {
      request(app)
        .put('/hello')
        .expect('content-type', 'text/plain')
        .expect('PUT method not allowed')
        .expect(405, done);
    });
  });

  describe('Serve static', () => {
    it('should serve index.html for GET /index.html', (done) => {
      request(app)
        .get('/index.html')
        .expect('content-length', '1145')
        .expect('content-type', 'text/html')
        .expect(/Flower Catalog/)
        .expect(200, done);
    });

    it('should serve index.html for GET /', (done) => {
      request(app)
        .get('/')
        .expect('content-length', '1145')
        .expect('content-type', 'text/html')
        .expect(/Flower Catalog/)
        .expect(200, done);
    });
  });

  describe('Login, Logout and Signup', () => {
    it('should serve login page for GET /login', (done) => {
      request(app)
        .get('/login')
        .expect('content-type', 'text/html')
        .expect('content-length', '309')
        .expect(/LOGIN/)
        .expect(200, done);
    });

    it('should get 400 if user credentials are not provided for POST /login',
      (done) => {
        request(app)
          .post('/login')
          .send('')
          .expect('content-type', 'text/plain')
          .expect('content-length', '24')
          .expect('Provide user credentials')
          .expect(400, done);
      });

    it('should redirect to /login if user details are invalid for POST /login',
      (done) => {
        request(app)
          .post('/login')
          .send('username=abc&password=123')
          .expect('location', '/login')
          .expect(302, done);
      });

    it('should redirect to /guest-book if user details are valid for POST /login',
      (done) => {
        request(app)
          .post('/login')
          .send('username=praju&password=123')
          .expect('set-cookie', /sessionId=/)
          .expect('location', '/guest-book')
          .expect(302, done);
      });

    it('should redirect to / if session is not set for GET /logout',
      (done) => {
        request(app)
          .get('/logout')
          .expect('location', '/')
          .expect(302, done);
      });

    it('should serve signup page for GET /signup', (done) => {
      request(app)
        .get('/signup')
        .expect('content-type', 'text/html')
        .expect('content-length', '535')
        .expect(/Signup/)
        .expect(200, done);
    });

    it('should register user for POST /signup', (done) => {
      request(app)
        .post('/signup')
        .send('name=Harshada&username=Harshu&password=9876')
        .expect(200, done);
    });

    it('should provide 400 if user credentials are not provided for POST /signup',
      (done) => {
        request(app)
          .post('/signup')
          .send('')
          .expect(400, done);
      });
  });

  describe('Guest Book', () => {
    it('should redirect to /login if session is not set for GET /guest-book',
      (done) => {
        request(app)
          .get('/guest-book')
          .expect('location', '/login')
          .expect(302, done);
      });
  });

  describe('API', () => {
    it('should provide guest book api for GET /api/guest-book', (done) => {
      request(app)
        .get('/api/guest-book')
        .expect('content-type', 'application/json')
        .expect(/Prajakta/)
        .expect(200, done);
    });

    it('should provide guest book api based on query for GET /api/guest-book/q',
      (done) => {
        request(app)
          .get('/api/guest-book/q?comment=hello')
          .expect('content-type', 'application/json')
          .expect(/Prajakta/)
          .expect(200, done);
      });
  });
});


describe('With Session', () => {
  let config;
  let sessions;
  beforeEach(() => {
    const commentsFile = './test/data/comments.json';
    const templateFile = './resources/guest-book-template.html';
    const usersFile = './test/data/users.json';
    const serveFrom = './public';

    fs.copyFileSync('./test/data/commentsInit.json', commentsFile);
    config = { commentsFile, templateFile, usersFile, serveFrom };
    sessions = { '111': { username: 'praju', sessionId: 111 } };
  })

  describe('Guest Book', () => {
    it('should login to guest book for GET /guest-book', (done) => {
      request(createApp(config, sessions))
        .get('/guest-book')
        .set('cookie', 'sessionId=111')
        .expect('content-type', 'text/html')
        .expect(/Leave a comment/)
        .expect(200, done);
    });

    it('should provide guest book in json format for GET /guest-book',
      (done) => {
        request(createApp(config, sessions))
          .get('/guest-book')
          .set('accept', 'application/json')
          .set('cookie', 'sessionId=111')
          .expect('content-type', 'application/json')
          .expect(/Prajakta/)
          .expect(200, done);
      });

    it('should provide 400 if comment is not provided for POST /guest-book/add-comment',
      (done) => {
        request(createApp(config, sessions))
          .post('/guest-book/add-comment')
          .set('cookie', 'sessionId=111')
          .send('')
          .expect(400, done);
      });

    it('should add comment for POST /guest-book/add-comment', (done) => {
      request(createApp(config, sessions))
        .post('/guest-book/add-comment')
        .set('cookie', 'sessionId=111')
        .send('name=roshan&comment=Hello+World')
        .expect(200, done);
    });
  });

  describe('Login and logout', () => {
    it('should redirect to guest book if session is set for GET /login',
      (done) => {
        request(createApp(config, sessions))
          .get('/login')
          .set('cookie', 'sessionId=111')
          .expect('location', '/guest-book')
          .expect(302, done);
      });

    it('should logout for GET /logout', (done) => {
      request(createApp(config, sessions))
        .get('/logout')
        .set('cookie', 'sessionId=111')
        .expect('set-cookie', 'sessionId=0;max-Age=0')
        .expect('location', '/')
        .expect(302)
        .end((err, res) => {
          assert.deepStrictEqual(sessions, {});
          done();
        });
    });
  });
});
