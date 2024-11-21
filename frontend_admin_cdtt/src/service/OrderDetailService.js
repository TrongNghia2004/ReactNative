import Api from "../api/Api";  // Make sure this is the correct import for your API client

const OrderDetailService = {
    // Fetch the details of a specific order
    show: async (orderId) => {
        return await Api.get(`orderdetail/show/${orderId}`); // Corrected route for fetching order details
    },

    // You can add more methods here for other functionalities, like deleting an order detail, etc.
    delete: async (id) => {
        return await Api.delete(`orderdetail/destroy/${id}`); // Assuming you want to delete order details
    },
}

export default OrderDetailService;
