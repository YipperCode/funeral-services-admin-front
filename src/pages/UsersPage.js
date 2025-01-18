import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/api';
import Users from '../components/readTables/Users';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p className="text-center mt-4">Loading users...</p>;
  }

  if (users.length === 0) {
    return <p className="text-center mt-4">No users found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <Users users={users} />
    </div>
  );
};

export default UsersPage;
