import Api from "../api/Api";

const UserService = {
    getList: async () => {
        const response = await Api.get('user');
        console.log(response); // In ra toàn bộ phản hồi để kiểm tra
        return response;
    },
    add: async (user) => {
        return await Api.post('user/store', user);
    },
    register: async (user) => {
        return await Api.post('register', user); // Gọi API để đăng ký người dùng
    },
    delete: async (userId) => {
        return await Api.delete(`user/${userId}`); // Assumes that the endpoint accepts DELETE requests at /user/{id}
    },
    update: async (userId, updatedData) => {
        // Make sure to use the correct HTTP method here (PUT for updating)
        return await Api.put(`/user/update/${userId}`, updatedData); // Change to PUT if necessary
    },
    login: async (email, password) => {
        try {
            const response = await Api.post('http://localhost:8000/api/user/login', {
                email,
                password,
            });
    

            console.log("Login response:", response);
    
            if (response.role === 'admin') {  
                const userData = {
                    token: response.token,
                    user: response.user,
                    roles: response.roles,  
                };
    

                localStorage.setItem('userData', JSON.stringify(userData));
                console.log("User logged in:", userData);
    
                return response;
            } else {
                console.error("Access denied: Only admin users are allowed to log in.");
                throw new Error("Access denied: Only admin users are allowed to log in.");
            }
        } catch (error) {
            console.error("Login failed:", error);
            throw error;  // Ném lỗi để xử lý ngoài hàm này
        }
    },
    
    
}

export default UserService;
