import {
  getOrders,
  createOrder,
  getOrderById,
  updateOrderById,
  deleteOrderById
} from '../dao/order.js'
import {
  getUserById,
} from '../dao/user.js'
import {
  getBusinessById,
} from '../dao/business.js'
import twilioService from '../servicios/twilio.service.js'
import { NotFoundException } from '../utils/exception.js'

export const get = async (query = {}) => {
  const orders = await getOrders(query)
  return {
    status: 'success',
    payload: orders,
  }
}

export const create = async (body) => {
  let {
    user: userId,
    business: businessId,
    products: productsRequest,
  } = body
  console.log(body)
  const user = await getUserById(userId)
  console.log(" Paso 1 ",user)
  if (!user) {
    throw new NotFoundException('Order not found')
  }
  const business = await getBusinessById(businessId)
  if (!business) {
    throw new NotFoundException('Order not found')
  }
console.log(" Paso 1 ",business)
const products = productsRequest.reduce((result, item)=> {
    const product = business.products.find((product) => product.id == item.product)
    if (product) {
      result.push({
        id: item.product,
        price: product.price,
        quantity: item.quantity,
      })
    }
    return result
  }, [])
  const total = products.reduce((acc, product) => {
    return acc + product.price * product.quantity
  }, 0)
 
  const newOrder = {
    user: user.id,
    business: business.id,
    products,
    total,
  }
  console.log(" newOrder ",newOrder)
  const order = await createOrder(newOrder)
  console.log("order", order)
  console.log("order", user.phone.toString())
  const result = await twilioService.sendSMS(`+54${user.phone.toString()}`, `Hola muchas gracias por tu compra `)
  console.log("Resultado final",result)
  return {
    status: 'success',
    payload: order,
  }
}

export const getById = async (id) => {
  const order = await getOrderById(id)
  if (!order) {
    throw new NotFoundException('Order not found')
  }
  return {
    status: 'success',
    payload: order,
  }
}

export const updateById = async (id, body) => {
  const order = await getOrderById(id)
  if (!order) {
    throw new NotFoundException('Order not found')
  }
  const result = await updateOrderById(id, body)
  return {
    status: 'success',
    payload: result,
  }
}

export const removeById = async (id) => {
  const order = await getOrderById(id)
  if (!order) {
    throw new NotFoundException('Order not found')
  }
  const result = await deleteOrderById(id)
  return {
    status: 'success',
    payload: result,
  }
}

export const addProduct = async (id, body) => {
  const order = await getOrderById(id)
  if (!order) {
    throw new NotFoundException('Order not found')
  }
  const { products } = body
  order.products = products
  await updateOrderById(id, order)
  return {
    status: 'success',
    payload: order,
  }
}

export const resolve = async (id, body) => {
  const order = await getOrderById(id)
  if (!order) {
    throw new NotFoundException('Order not found')
  }

  const { status } = body
  order.status = status
  await updateOrderById(id, order)

  return {
    status: 'success',
    payload: order,
  }
}