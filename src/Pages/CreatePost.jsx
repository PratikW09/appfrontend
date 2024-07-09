import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select'; // Import react-select

const options = [
  { value: 'hindi', label: 'Hindi' },
  { value: 'marathi', label: 'Marathi' },
  // Add more language options as needed
];

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  // Get user from Redux store
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (isAuthenticated && user) {
      setAuthor(user?.username); // Set author when user is authenticated
    }
  }, [isAuthenticated, user]);

  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption.value); // Update selected language
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const tagsArray = tags.split(',').map((tag) => tag.trim());

    try {
      const response = await axios.post('/api/users/create', {
        title,
        content,
        author: author, // Use author state, which is set from Redux
        tags: tagsArray,
        language: selectedLanguage, // Add language to the request body
      });

      console.log('Post created successfully:', response.data);
      setTitle('');
      setContent('');
      setTags('');
      setSelectedLanguage('');
      toast.success('Post created successfully');
    } catch (error) {
      console.error('Error creating post:', error);
      setError(error.response?.data?.message || 'Error creating post');
      toast.error('Error creating post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer autoClose={3000} />
      <h1 className="text-3xl font-bold text-center mb-8">Create New Post</h1>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-gray shadow-md p-6 rounded-lg text-white">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-bold text-gray-100 mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-sm focus:outline-none focus:shadow-outline"
            placeholder="Enter title"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block text-sm font-bold text-gray-700 mb-2">
            Author (Automatically filled)
          </label>
          <input
            id="author"
            type="text"
            value={author}
            readOnly
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-sm bg-gray-200 focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tags" className="block text-sm font-bold text-gray-700 mb-2">
            Tags (comma separated)
          </label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-sm focus:outline-none focus:shadow-outline"
            placeholder="e.g., technology, programming"
          />
        </div>
        <div className="mb-6 text-gray-900 border-2 border-black">
          <label htmlFor="content" className="block text-sm font-bold text-gray-700 mb-2">
            Content
          </label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            className="bg-gray-400 border-4 border-black rounded-lg h-64"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="language" className="block text-sm font-bold text-gray-700 mb-2">
            Select Language
          </label>
          <Select
            options={options}
            value={options.find(option => option.value === selectedLanguage)}
            onChange={handleLanguageChange}
            placeholder="Select Language"
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 mt-4"
            disabled={loading || !selectedLanguage}
          >
            {loading ? 'Creating...' : 'Create Post'}
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
