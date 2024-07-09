import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get('/api/users/friends');
        console.log(response.data)
        setFriends(response.data.friends);
      } catch (error) {
        console.error('Error fetching friends:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900">Friends List</h1>
        <div className="mt-4">
          {friends.length > 0 ? (
            <ul className="space-y-4">
              {friends.map(friend => (
                <li key={friend._id} className="bg-white shadow-md rounded-lg p-4">
                  {friend.username}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">No friends found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsList;
