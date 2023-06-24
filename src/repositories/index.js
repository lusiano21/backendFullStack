import { UsuarioDao } from '../dao/factory.js'
import UsuarioRepository from './Usuario.js'

export const usuarioRepository = new UsuarioRepository(new UsuarioDao())