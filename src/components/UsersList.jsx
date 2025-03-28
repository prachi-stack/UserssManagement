export default function UsersList({ users, onEdit, onDelete, loading }) {
    return (
        <div>
            {loading ? (
                <p className="text-center">Loading users...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {users.map((user) => (
                        <div key={user.id} className="p-4 border rounded-lg flex flex-col items-center justify-between space-y-3">
                            <div className="flex items-center space-x-4">
                                <img src={user.avatar} alt={user.first_name} className="w-14 h-14 rounded-full" />
                                <div className="flex flex-col w-full break-words overflow-hidden">
                                    <p className="font-semibold text-center md:text-left break-words w-full">{user.first_name} {user.last_name}</p>
                                    <p className="text-gray-500 text-center md:text-left break-words w-full">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex space-x-2 w-full md:w-auto justify-center md:justify-end">
                                <button onClick={() => onEdit(user)} className="px-3 py-1 bg-blue-500 text-white rounded">
                                    Edit
                                </button>
                                <button onClick={() => onDelete(user.id)} className="px-3 py-1 bg-red-500 text-white rounded">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
