import Api from "../api/Api"

const UserService = {
    getList: async () => {
        return await Api.get(`user`);
    },
    trash: async () => {
        return await Api.get(`user/trash`);
    },
    show: async (id) => {
        return await Api.get(`user/show/${id}`);
    },
    store: async (data) => {
        return await Api.post(`user/store`, data);
    },
    // update: async (data, id) => {
    //     return await Api.post(`user/update/${id}`, data);
    // },
    delete: async (userId) => {
        return await Api.delete(`user/${userId}`); // Assumes that the endpoint accepts DELETE requests at /user/{id}
    },
    update: async (userId, updatedData) => {
        // Make sure to use the correct HTTP method here (PUT for updating)
        return await Api.put(`/user/update/${userId}`, updatedData); // Change to PUT if necessary
      },
    restore: async (id) => {
        return await Api.get(`user/restore/${id}`);
    },
    destroy: async (id) => {
        return await Api.delete(`user/destroy/${id}`);
    },

    register: async (data) => {
        return await Api.post(`user/register`, data);
    },

    login: async (data) => {
        return await Api.post(`user/login`, data);
    },
    
}
export default UserService