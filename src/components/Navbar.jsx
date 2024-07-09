import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { logout } from '../Reducer/authReducer.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post('/api/users/logout');
      
      // Remove tokens and user status from local storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('isUserValid');
      localStorage.removeItem('user');
      
      dispatch(logout());
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <>
      <nav className="bg-blue-300 dark:bg-gray-700 shadow-md w-full px-20 border-4 border-black">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-gray-900 dark:text-gray-100">
                THE BLOG
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                <Link to="/loginusername" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                    Login
                  </Link>
                  <Link to="/profile" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                    Profile
                  </Link>
                  <Link to="/create" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                    Create Blog
                  </Link>
                  <Link to="/chat" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                    Chats
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/register" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                    Register
                  </Link>
                  <Link to="/loginusername" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                    Login
                  </Link>
                </>
              )}
           
            </div>
            <div className="flex md:hidden items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-900 dark:text-gray-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                    Profile
                  </Link>
                  <Link to="/create" className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                    Create Blog
                  </Link>
                  <Link to="/chat" className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                    Chats
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/register" className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                    Register
                  </Link>
                  <Link to="/loginusername" className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                    Login
                  </Link>
                </>
              )}
             
            </div>
          </div>
        )}
      </nav>
      <ToastContainer />
    </>
  );
};

export default Navbar;
