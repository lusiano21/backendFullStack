import mongoose from "mongoose";
import { createUser, getUserById, getUserOne, updateUserById, deleteById } from "../src/dao/user.js";
import chai from 'chai';

const expect = chai.expect
mongoose.connect('mongodb+srv://Luciano:w0z4V22sIOUPDcnN@cluster0.ulcy2bz.mongodb.net/clientes-test?retryWrites=true&w=majority')

describe('Prueba al modulo de users dao.', () => {
    
    before( async function() {
        mongoose.connection.collections.usuarios.drop();
    })
    beforeEach(async function() {
        console.log('Comienzo de cada prueba');
    })
    afterEach(() => {
        console.log('termino de cada prueba');
    })
    after(() => {
        console.log('Termino el proceso');
    })
    it('Debe crear un usuario', async function() {
        const result = await createUser({
            nombre: 'Luciano',
            apellido: 'Bonifacio',
            edad: 21,
            dni: 46712643812,
            email: 'lusianod@gmail.com',
            password: '1234'
        });
        expect(result._id).to.be.ok
        expect(Array.isArray(result.orders)).to.be.equal(true);
        expect(Array.isArray(result.domicilios)).to.be.equal(true);
        expect(result.orders).to.be.deep.equal([]);
        expect(result.domicilios).to.be.deep.equal([]);
    })
    it('Debe obtener el usuario', async function() {
        const result = await getUserOne({email: 'lusianod@gmail.com'});
        console.log('Encontramos el usuario:' ,result);
    })
})



































