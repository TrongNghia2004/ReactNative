import Api from "../api/Api";

const ProductImageService = {
    getList: async () => {
        const response = await Api.get('productimage');
        console.log(response); // In ra toàn bộ phản hồi để kiểm tra
        return response;
    }
}
export default ProductImageService
