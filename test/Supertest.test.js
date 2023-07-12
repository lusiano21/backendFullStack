import chai from "chai";
import supertest from 'supertest';


const expect = chai.expect;
const request = supertest('http://localhost:8080');
let cookie;
describe('Supertest', function() {
    describe('Usuarios prueba', function (){
        it('Crear un usuario', async function(){
            const userMock = {
                nombre:'Eric',
                apellido:'Elias',
                email:'ericE@gmail.com',
                edad:20,
                dni:452872784,
                password:'1234'
            }
            const response = await request.post('/api/sessions/user').send(userMock);
            const {
                statusCode,
                ok,
                _body:{
                    payload
                },
            } = response
            console.log('statusCode',statusCode)
            console.log('ok', ok)
            console.log('_body', response._body);
            console.log('payload', payload)
            expect(ok).to.equal(true)
        })
        it('Obtener los usuarios',async function(){
            const {
                statusCode,
                ok,
                _body: body,
            } = await request.get('/api/sessions/user')
            console.log('statusCode',statusCode)
            console.log('ok', ok)
            console.log('_body', body);
        })
        it('Modificar usuario', async function(){
            const {
                statusCode,
                ok,
                _body: body,
            } = await request.put('/api/sessions/user/64aafe29be3b9380d0a6bf5e').send({edad: 22})
            console.log('statusCode',statusCode)
            console.log('ok', ok)
            console.log('_body', body);
        })
        it('Eliminar un usuario', async function(){
            const {
                statusCode,
                ok,
                _body: body,
            } = await request.delete('/api/sessions/user/64aafe29be3b9380d0a6bf5e').send({edad: 22})
            console.log('statusCode',statusCode)
            console.log('ok', ok)
            console.log('_body', body);
        })
    })
    describe('Sessiones', function(){
        it('inicio de seccion', async function(){
            const createSeccion = {
                email: 'lusianobonifacio6@gmail.com',
                password: '1234',
            }
            const responseSession = await request.post('/api/sessions/login').send(createSeccion);
            const cookieResponse = responseSession.headers['set-cookie'][0];
            expect(responseSession._body).to.be.ok
            expect(cookieResponse).to.be.ok
            cookie = {
                name: cookieResponse.split('=')[0],
                value: cookieResponse.split('=')[1]
            }
            
        })
        it('Entrar a mi cuenta', async function(){
            const {_body:{ payload } } = await request.get('/api/sessions/me').set('Cookie',`${cookie.name} = ${cookie.value}`);
            console.log('payload', payload);
            expect(payload.email).to.be.ok
        })
        
    })
})