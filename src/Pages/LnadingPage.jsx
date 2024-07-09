import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import { useSelector } from 'react-redux';

const LandingPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
console.log("user->" ,user)
console.log("token->" ,token)
console.log("isAuthenticated->" ,isAuthenticated)


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/users/getAllPost');
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (posts.length === 0) {
    return <div>No posts available</div>;
  }

  return (
    <div>
      <h1>Landing page</h1>
      {posts.map((post) => (
        <BlogCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default LandingPage;
