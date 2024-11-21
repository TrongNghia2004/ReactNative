import Api from "../api/Api"

const ProductStoreService = {
    getList: async () => {
        return await Api.get('productstore')
    },
    getId: async (id) => {
        return await Api.get(`productstore/show/${id}`);
    },
    update: async (id, productstore) => {
        return await Api.post(`productstore/update/${id}`, productstore); // Sử dụng POST thay vì PUT
    },
    restore: async (id) => {
        try {
            return await Api.post(`productstore/restore/${id}`); // Sử dụng POST để khôi phục
        } catch (error) {
            console.error(`Error restoring productstore with ID ${id}:`, error);
            throw error;
        }
    },
    delete: async (id) => {
        try {
            return await Api.delete(`productstore/delete/${id}`); // Đảm bảo API.delete sử dụng phương thức DELETE
        } catch (error) {
            console.error(`Error deleting productstore with ID ${id}:`, error);
            throw error;
        }
    },

}
export default ProductStoreService;