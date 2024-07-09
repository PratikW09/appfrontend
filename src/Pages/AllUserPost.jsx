import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard.jsx'; // Import the BlogCard component

const AllUserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get('/api/users/getUserPost');
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900">All Posts</h1>
        <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
          {posts.length > 0 ? (
            posts.map(post => <BlogCard key={post._id} post={post} />)
          ) : (
            <p className="text-gray-700">No posts found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUserPosts;
