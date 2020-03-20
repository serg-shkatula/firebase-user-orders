import { updateOrderById } from '../firebase'

const updateOrder =  async (id, payload) => {
  return updateOrderById(id, payload)
}

export default {
  updateOrder
}
