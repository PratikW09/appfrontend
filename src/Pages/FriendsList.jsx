import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFriendList } from '../Reducer/authReducer';

const FriendsList = () => {
  const dispatch = useDispatch();
  const { friends, loading, error } = useSelector((state) => state.auth);
  

  useEffect(() => {
    
      dispatch(fetchFriendList());
    
  },[]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error ) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900">Friends List</h1>
        <div className="mt-4">
        {friends.length > 0 ? (
            <ul className="space-y-4">
              {friends.map(friend => (
                <li key={friend._id} className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
                  <div>
                    <p className="text-xl font-semibold text-gray-800">{friend.username}</p>
                    <p className="text-gray-600">{friend.fullName}</p>
                    <p className="text-gray-500">{friend.email}</p>
                  </div>
                  <button
                    // onClick={() => handleUnfollow(friend._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Unfollow
                  </button>
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
