import CartModel from "../models/cart.js";

class CartsControllers {
    // CREATE
    static async create(req, res) {
      const { body } = req
      const result = await CartModel.create(body)
      res.status(201).json(result)
    }
    // READ
    static async get(req, res) {
      const result = await CartModel.find()
      res.status(200).json(result)
    }
    static async getById(req, res) {
      const { params: { id } } = req
      const result = await CartModel.findById(id)
      if (!result) {
        return res.status(404).end()
      }
      res.status(200).json(result)
    }
    // UPDATE
    static async updateById(req, res) {
      const { params: { id }, body } = req
      await CartModel.updateOne({ _id: id }, { $set: body })
      res.status(204).end()
    }
    // DELETE
    static async deleteById(req, res) {
      const { params: { id } } = req
      await CartModel.deleteOne({ _id: id })
      res.status(204).end()
    }
  }
  export default CartsControllers;