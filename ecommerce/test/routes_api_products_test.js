const assert = require('assert');
const app = require('../index');
const supertest = require('supertest');

const request = supertest(app);

describe('GET/api/products',()=>{
    it("should  response with status 200", function(done){
        request
            .get('/api/products')
            .set('Accept', 'application/json')
            .set('X-Request-With','XMLHttpRequest')
            .expect(200,done);
        
    })
    it("should response with not error", function(done){
        request
            .get("api/products")
            .end((err,res)=>{
                assert.strictEqual(err,null);
                done();
            });
    })
    it("should response with the list of products", function(done){
        request
            .get('/api/products')
            .set('Accept', 'application/json')
            .set('X-Request-With','XMLHttpRequest')
            .end((err,res)=>{
                assert.deepEqual(res.body,{
                    "message":"Successfull Products"

                })
            });
            done();

    });
});
