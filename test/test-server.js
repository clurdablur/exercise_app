var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

describe('Exercise App', function() {
    before(function(done) {
        server.runServer(function(){
            User.create({
                name: 'Sarah'
            });
        });
    });
    after(function(done){
        User.remove(function(){
            done();
        });
    });
    
    var _id = null;
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

   /* Don't think I need a post
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
    }); */
    
    it('should edit a workout on PUT', function(done){
        chai.request(app)
            .put('/history/' + _id)
            .send({
                'name': 'Claire' //Change this so you are editing
                                //the users workout, not the user
            })
            .end(function(err, res){
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                done();
            });
    });
    
    it('should delete an item on delete', function(done){
        chai.request(app)
            .delete('/history/' + _id)
            .end(function(err, res){
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.have.property('ok');
                done();
            })
    })
});
