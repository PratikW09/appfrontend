import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await axios.get('/api/users/friend-req');
        setFriendRequests(response.data.requests);
      } catch (error) {
        console.error('Error fetching friend requests:', error.message);
        toast.error('Error fetching friend requests. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFriendRequests();
  }, []);

  const handleAccept = async (requestId) => {
    try {
      // console.log(requestId)
      const response = await axios.post(`/api/users/accept/${requestId}`);
      if (response.status === 200) {
        setFriendRequests(friendRequests.filter(request => request._id !== requestId));
        toast.success('Friend request accepted successfully!');
      }
    } catch (error) {
      console.error('Error accepting friend request:', error);
      toast.error('Error accepting friend request. Please try again later.');
    }
  };

  const handleReject = async (requestId) => {
    try {
      const response = await axios.post(`/api/users/reject/${requestId}`);
      if (response.status === 200) {
        setFriendRequests(friendRequests.filter(request => request._id !== requestId));
        toast.success('Friend request rejected successfully!');
      }
    } catch (error) {
      console.error('Error rejecting friend request:', error);
      toast.error('Error rejecting friend request. Please try again later.');
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (friendRequests.length === 0) {
    return <div className="text-center py-4">No friend requests found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Friend Requests</h1>
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        {friendRequests.map((request) => (
          <div key={request._id} className="mb-4 p-4 bg-gray-100 rounded-lg flex justify-between items-center">
            <p className="text-gray-700">
              <span className="font-bold">{request.sender.username}</span> ({request.sender.email})
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleAccept(request._id)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Accept
              </button>
              <button
                onClick={() => handleReject(request._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendRequests;
