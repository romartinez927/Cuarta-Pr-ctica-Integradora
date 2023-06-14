import { ErrorArgumentoInvalido } from "../models/error.js"

export function obligatorio(valor, nombreCampo) {
  if (valor === null || valor === undefined)
    throw new ErrorArgumentoInvalido(`el campo ${nombreCampo} es obligatorio`)
}

export function validarEnteroPositivo(valor, nombreCampo) {
  if (typeof valor !== 'number')
    throw new ErrorArgumentoInvalido(`el campo ${nombreCampo} debe ser un numero`)
  if (!Number.isInteger(Number(valor)))
    throw new ErrorArgumentoInvalido(`el campo ${nombreCampo} debe un numero entero`)
  if (Number(valor) <= 0)
    throw new ErrorArgumentoInvalido(`el campo ${nombreCampo} debe ser un numero positivo mayor a cero`)
  return Number(valor)
}

export function validarCadena(valor, nombreCampo) {
  if (typeof valor !== 'string')
    throw new ErrorArgumentoInvalido(`el campo ${nombreCampo} debe ser una cadena de caracteres`)
  if (valor === '')
    throw new ErrorArgumentoInvalido(`el campo ${nombreCampo} no puede estar vacio`)
  return valor
}

export function validarBooleano(valor, nombreCampo) {
  if (typeof valor !== 'boolean')
    throw new ErrorArgumentoInvalido(`el campo ${nombreCampo} debe ser un booleano`)
  return valor
}

//-------------------------------------------------------


export function validarEdad(valor) {
  return validarEnteroPositivo(valor, 'edad')
}

export function validarDni(valor) {
  validarCadena(valor, 'dni')
  if (isNaN(Number(valor)))
    throw new ErrorArgumentoInvalido('el campo dni solo debe contener unicamente caracteres numericos')
  if (!Number.isInteger(Number(valor)))
    throw new ErrorArgumentoInvalido('el campo dni debe ser un numero entero')
  return valor
}

export function validarNombre(valor) {
  return validarCadena(valor, 'nombre')
}

export function validarApellido(valor) {
  return validarCadena(valor, 'apellido')
}

export function validarEmail(valor) {
  return validarCadena(valor, 'email')
}

export function validarPassword(valor) {
  return validarCadena(valor, 'password')
}