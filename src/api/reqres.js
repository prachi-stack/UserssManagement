const BASE_URL = 'https://reqres.in/api';

export const loginUser = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Login failed. Please try again.");
    }
    
    const result = await response.json();
    return result.token;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchUsers = async (page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/users?page=${page}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error("Failed to fetch users.");
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUser = async (id, updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user.");
    }
    
    
    return { ...updatedData, id };
  } catch (error) {
    throw new Error(error.message);
  }
};


export const deleteUser = async (id) => {
  try {
    const response = await fetch(`https://reqres.in/api/users/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error("Failed to delete user.");
    }

    return { success: true };
  } catch (error) {
    throw new Error(error.message);
  }
};