import Api from "../api/Api";

const BannerService = {
    getList: async () => {
        return await Api.get('banner');
    },

    getId: async (id) => {
        return await Api.get(`banner/show/${id}`);
    },

    add: async (banner) => {
        console.log('Data to be sent:', banner);
        const response = await Api.post('banner/store', banner);
        console.log('Response from API:', response);
        return response.data;
    },

    update: async (id, banner) => {
        console.log('Data to be updated:', banner);  // Debug log
        return await Api.post(`banner/update/${id}`, banner);
    },

    delete: async (id) => {
        return await Api.delete(`banner/destroy/${id}`);
    },

    updateStatus: async (id, status) => {
        return await Api.put(`banner/update/status/${id}`, { status });
    },

    getDeleted: async () => {
        return await Api.get('banner/trash');
    },
    restore: async (id) => {
        return await Api.get(`banner/restore/${id}`);
    },
    forceDelete: async (id) => {
        return await Api.delete(`banner/forceDelete/${id}`);
    },
};

export default BannerService;