import React, { useEffect, useState } from 'react';
import UserService from '../service/UserService';

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const result = await UserService.getList();
      console.log(result.users);  // Check the structure of the response
      // Make sure 'result.users' contains the list of users
      setUsers(result.users);  // Assuming 'result.users' contains the list of users
    } catch (err) {
      setError('Không thể tải danh sách người dùng. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user function
  const handleDelete = async (userId) => {
    try {
      await UserService.delete(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      setError('Không thể xóa người dùng. Vui lòng thử lại.');
    }
  };

  const handleSave = async (userId, updatedData) => {
    try {
      const updatedUser = {
        name: updatedData.name,
        username: updatedData.username,  // Include username
        email: updatedData.email,
        phone: updatedData.phone,
        address: updatedData.address,
        gender: updatedData.gender,
        roles: updatedData.roles  // Include roles
      };

      await UserService.update(userId, updatedUser);
      setUsers(users.map(user => (user.id === userId ? { ...user, ...updatedData } : user)));
      setEditingUser(null);
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err);
      setError('Không thể cập nhật người dùng. Vui lòng thử lại.');
    }
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Danh sách người dùng</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="text-white bg-gray-800">
            <tr>
              <th className="p-4 text-left">User ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Gender</th>
              <th className="p-4 text-left">Address</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-100">
                <td className="p-4">{user.id}</td>
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.phone}</td>
                <td className="p-4">{user.gender}</td>
                <td className="p-4">{user.address}</td>
                <td className="flex p-4 space-x-2">
                  <button
                    onClick={() => setEditingUser(user)}
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Form Modal */}
      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-md shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Edit User</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave(editingUser.id, editingUser);
              }}
            >
              <input
                type="text"
                placeholder="Name"
                value={editingUser.name}
                onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                className="w-full px-3 py-2 mb-4 border rounded"
              />
              <input
                type="text"
                placeholder="Username"
                value={editingUser.username}
                onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                className="w-full px-3 py-2 mb-4 border rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={editingUser.email}
                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                className="w-full px-3 py-2 mb-4 border rounded"
              />
              <input
                type="text"
                placeholder="Phone"
                value={editingUser.phone}
                onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                className="w-full px-3 py-2 mb-4 border rounded"
              />
              <input
                type="text"
                placeholder="Gender"
                value={editingUser.gender}
                onChange={(e) => setEditingUser({ ...editingUser, gender: e.target.value })}
                className="w-full px-3 py-2 mb-4 border rounded"
              />
              <input
                type="text"
                placeholder="Address"
                value={editingUser.address}
                onChange={(e) => setEditingUser({ ...editingUser, address: e.target.value })}
                className="w-full px-3 py-2 mb-4 border rounded"
              />
              <select
                value={editingUser.roles}
                onChange={(e) => setEditingUser({ ...editingUser, roles: e.target.value })}
                className="w-full px-3 py-2 mb-4 border rounded"
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
              <button type="submit" className="px-4 py-2 mr-2 text-white bg-blue-500 rounded">
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 text-white bg-gray-500 rounded"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
