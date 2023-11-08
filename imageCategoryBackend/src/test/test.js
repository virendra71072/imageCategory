var should      = require('chai').should(),
    expect      = require('chai').expect(),
    supertest   = require('supertest'),
    api         = supertest('http://localhost:8088/api/v1/');


describe('Server Ping', function () {
    it('Should return a 200 response', function (done) {
        //use this.timeout(6000); to set timeout in miliseconds, default value for the timeout is 2000 miliseconds
        api.get('monitor/ping')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200, done);
    });
});
