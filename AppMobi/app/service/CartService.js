// services/CartService.js
import Api from "../api/Api";

const CartService = {
    // Fetch all items in the cart for a specific user
    getList: async (userId) => {
        return await Api.get(`cart/${userId}`);
    },

    // Add a product to the cart
    add: async (cart) => {
        return await Api.post('cart', cart); // Đảm bảo sử dụng phương thức POST đến /cart
    },

    // Update cart item details (e.g., quantity) by cart item ID
    update: async (id, cart) => {
        return await Api.put(`cart/${id}`, cart); // Sử dụng PUT cho cập nhật
    },

    // Delete a cart item by ID
    delete: async (id) => {
        return await Api.delete(`cart/${id}`); // Sử dụng DELETE đến /cart/{id}
    },

   
};

export default CartService;
