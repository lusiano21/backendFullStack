import {
  getOrders,
  createOrder,
  getOrderById,
  updateOrderById,
} from '../dao/order.js'
import {
  getUserById,
} from '../dao/user.js'
import {
  getBusinessById,
} from '../dao/business.js'

import { NotFoundException } from '../utils/configBcrypt.js'

export const get = async (query = {}) => {
  const orders = await getOrders(query)
  return {
    status: 'success',
    payload: orders,
  }
}

export const create = async (body) => {
  let {
    products: productsRequest,
    business: businessId,
    user: userId,
  } = body
  console.log('Here')
  console.log(productsRequest)
  const user = await getUserById(userId)
  if (!user) {
    throw new NotFoundException('User not found')
  }
  const business = await getBusinessById(businessId)
  if (!business) {
    throw new NotFoundException('Business not found')
  }
const products = productsRequest.reduce((result, item)=> {
    const product = business.products.find((product) => product.id == item.id)
    console.log(business)
    if (product) {
      result.push({
        id: item.id,
        price: product.price,
        quantity: item.quantity,
      })
    }
    return result
  }, [])
  const total = productsRequest.reduce((acc, product) => {
    return acc + product.price * product.quantity
  }, 0)
 
  const newOrder = {
    user: user.id,
    business: business.id,
    products,
    total,
  }
  console.log(newOrder)
  const order = await createOrder(newOrder)

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