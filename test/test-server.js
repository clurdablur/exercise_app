var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

describe('Exercise App', function() {
    it('should list workouts on GET', function(done) {
        chai.request(app)
            .get('/365gainz')
            .end(function(err, res) {
                res.should.be.json;
                res.body.should.be.a('object');
               // res.body[0].should.have.property('arms');
                res.should.have.status(200);
                
                done();
            });
    });

    it('should add a workout on POST', function(done){
        chai.request(app)
            .post('/365gainz')
            .send({
                'arms': {
                    'barbell curl': 10
                }
            })
            .end(function(err, res){
                should.equal(err, null);
                res.should.have.status(201);
                done();
            });
    });
})
/*describe('Shopping List', function() {
    it('should list items on get');
    it('should add an item on post');
    it('should edit an item on put');
    it('should delete an item on delete');
});*/