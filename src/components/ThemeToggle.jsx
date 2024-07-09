// // src/ThemeToggle.jsx
// import React, { useState, useEffect } from 'react';

// const ThemeToggle = () => {
//   const [theme, setTheme] = useState('light');

//   useEffect(() => {
//     if (localStorage.getItem('theme')) {
//       setTheme(localStorage.getItem('theme'));
//     } else {
//       localStorage.setItem('theme', 'light');
//     }
//     document.documentElement.className = theme;
//   }, [theme]);

//   const toggleTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     setTheme(newTheme);
//     localStorage.setItem('theme', newTheme);
//   };

//   const sunIcon = (
//     <svg
//       className="w-6 h-6 text-yellow-500"
//       fill="currentColor"
//       viewBox="0 0 20 20"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         fillRule="evenodd"
//         d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM4.22 4.22a1 1 0 011.42 0l.7.7a1 1 0 11-1.42 1.42l-.7-.7a1 1 0 010-1.42zM2 10a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zm11-7a1 1 0 10-2 0v1a1 1 0 102 0V3zm3.78 2.78a1 1 0 00-1.42-1.42l-.7.7a1 1 0 101.42 1.42l.7-.7zM10 18a1 1 0 100-2v1a1 1 0 000 2v-1zm-7-3a1 1 0 100 2h1a1 1 0 100-2H3zm13 0a1 1 0 100 2h1a1 1 0 100-2h-1zM4.22 15.78a1 1 0 010-1.42l.7-.7a1 1 0 011.42 1.42l-.7.7a1 1 0 01-1.42 0zm11.56 0a1 1 0 000-1.42l-.7-.7a1 1 0 10-1.42 1.42l.7.7a1 1 0 001.42 0z"
//         clipRule="evenodd"
//       />
//     </svg>
//   );

//   const moonIcon = (
//     <svg
//       className="w-6 h-6 text-gray-300"
//       fill="currentColor"
//       viewBox="0 0 20 20"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         fillRule="evenodd"
//         d="M17.293 13.293a8 8 0 11-10.586-10.586A8.035 8.035 0 0010 18a8.035 8.035 0 007.293-4.707zm-7.645 1.122a7 7 0 01-7.236-7.236 6 6 0 107.236 7.236z"
//         clipRule="evenodd"
//       />
//     </svg>
//   );

//   return (
//     <button
//       onClick={toggleTheme}
//       className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center focus:outline-none"
//       aria-label="Toggle Dark Mode"
//     >
//       {theme === 'light' ? sunIcon : moonIcon}
//     </button>
//   );
// };

// export default ThemeToggle;
