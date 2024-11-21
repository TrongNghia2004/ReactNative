import Api from "../api/Api";

const OrderService = {
    getList: async () => {
        return await Api.get('order');
    },
    show: async (orderId) => {
        return await Api.get(`orderdetail/show/${orderId}`); // Corrected route for fetching order details
    },
    add: async (order) => {
        return await Api.post('order/store', order);
    },
    delete: async (id) => {
        return await Api.get(`order/delete/${id}`);
    },
    updateStatus: async (id, status) => {
        return await Api.put(`order/update/status/${id}`, { status });
    },
    restore: async (id) => {
        return await Api.get(`order/restore/${id}`);
    },
    getDeleted: async () => {
        return await Api.get('order/trash');
    },
    destroy: async (id) => {
        return await Api.delete(`order/destroy/${id}`); 
    },
    

}

export default OrderService;