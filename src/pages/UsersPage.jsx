import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { fetchUsers, updateUser, deleteUser } from "../api/reqres";
import EditUserForm from "../components/EditUserForm";
import Pagination from "../components/Pagination";
import UsersList from "../components/UsersList";

export default function UsersPage() {
    const { token, logout } = useAuth();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            navigate("/login");
            return;
        }
    }, [navigate]);

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        const getUsers = async () => {
            setLoading(true);
            try {
                const data = await fetchUsers(page);
                setUsers(data.data);
                setFilteredUsers(data.data);
                setTotalPages(data.total_pages);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getUsers();
    }, [token, page]);

    useEffect(() => {
        const filtered = users.filter((user) =>
            `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchQuery, users]);

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            setUsers(users.filter(user => user.id !== id));
            toast.success("User deleted successfully!");
        } catch (err) {
            toast.error("Failed to delete user.");
        }
    };

    const handleUpdate = async (updatedUser) => {
        try {
            await updateUser(updatedUser.id, updatedUser);
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id === updatedUser.id ? { ...user, ...updatedUser } : user
                )
            );
            toast.success("User updated successfully!");
        } catch (error) {
            toast.error("Failed to update user.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
            <div className="bg-white px-[5rem] sm:p-6 rounded-lg shadow-md">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-center">Users List</h2>
                {error && <p className="text-red-600 text-center">{error}</p>}

                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <UsersList users={filteredUsers} onEdit={setEditingUser} onDelete={handleDelete} loading={loading} />
                <Pagination page={page} totalPages={totalPages} setPage={setPage} />
                <div className="flex justify-center">
                    <button onClick={logout} className="m-5 px-3 py-2 bg-gray-900 text-white rounded">
                        Logout
                    </button>
                </div>
            </div>

            {editingUser && <EditUserForm user={editingUser} onClose={() => setEditingUser(null)} onUpdate={handleUpdate} />}
        </div>
    );
}
