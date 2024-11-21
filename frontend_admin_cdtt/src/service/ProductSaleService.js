import Api from "../api/Api"

const ProductSaleService = {
    getList: async () => {
        return await Api.get('productsale')
    },
    getId: async (id) => {
        return await Api.get(`productsale/show/${id}`);
    },
    update: async (id, productsale) => {
        return await Api.post(`productsale/update/${id}`, productsale); // Sử dụng POST thay vì PUT
    },
    restore: async (id) => {
        try {
            return await Api.post(`productsale/restore/${id}`); // Sử dụng POST để khôi phục
        } catch (error) {
            console.error(`Error restoring productsale with ID ${id}:`, error);
            throw error;
        }
    },
    delete: async (id) => {
        try {
            return await Api.delete(`productsale/delete/${id}`); // Đảm bảo API.delete sử dụng phương thức DELETE
        } catch (error) {
            console.error(`Error deleting productsale with ID ${id}:`, error);
            throw error;
        }
    },
    
}
export default ProductSaleService