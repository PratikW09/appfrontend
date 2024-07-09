import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const stripHtmlTags = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

const BlogCard = ({ post }) => {
  const [likes, setLikes] = useState(post.likesCount || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  const handleLike = async () => {
    if (hasLiked) {
      toast.warning('You have already liked this post');
      return;
    }

    try {
      const response = await axios.post(`/api/users/like/${post._id}`);
      if (response.status === 201) {
        setLikes(likes + 1);
        setHasLiked(true);
        toast.success('Liked the post!');
      }
    } catch (error) {
      console.error('Error liking the blog post:', error);
      toast.error('Error liking the post. Please try again later.');
    }
  };

  const fetchUserProfile = async (username) => {
    try {
      const response = await axios.get(`/api/users/profile/${username}`);
      if (response.status === 200) {
        const userProfile = response.data;
        console.log('User Profile:', userProfile);
        window.location.href = `/profile/${username}`;
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast.error('Error fetching user profile. Please try again later.');
    }
  };

  const handleReadMore = () => {
    setShowFullContent(true);
  };

  const contentText = stripHtmlTags(post.content);
  const truncatedContent = contentText.split(' ').slice(0, 30).join(' ');

  return (
    <div className=" overflow-hidden max-w-3xl min-w-2xl mx-auto bg-white dark:bg-gray-900 shadow-md border-2 border-gray-200 dark:border-gray-800 rounded-lg my-4 transition transform hover:scale-105 hover:shadow-lg">
      <div className="flex flex-col md:flex-row">
        <div className="p-6 flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center cursor-pointer" onClick={() => fetchUserProfile(post.author)}>
              <img
                src={post.authorAvatarUrl}
                alt={post.author}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <div className="text-indigo-600 dark:text-indigo-400 font-semibold">{post.author}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Created at: {new Date(post.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
          <div className="uppercase tracking-wide text-lg text-indigo-600 dark:text-indigo-400 font-bold mb-2">
            {post.title}
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {showFullContent ? contentText : `${truncatedContent}...`}
            {!showFullContent && (
              <button
                onClick={handleReadMore}
                className="text-indigo-600 dark:text-indigo-400 font-medium focus:outline-none hover:text-indigo-800 dark:hover:text-indigo-300"
              >
                Read More
              </button>
            )}
          </p>
          <div className="flex justify-between items-center">
            <div>
              <button
                onClick={handleLike}
                className={`px-3 py-1 rounded-md text-sm font-medium ${hasLiked ? 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed' : 'bg-indigo-600 dark:bg-indigo-400 text-white hover:bg-indigo-800 dark:hover:bg-indigo-600'}`}
                disabled={hasLiked}
              >
                {hasLiked ? 'Liked' : 'Like'}
              </button>
              <span className="ml-2 text-gray-600 dark:text-gray-400">{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
