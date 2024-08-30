import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { UserProvider } from './providers/userProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
      <ToastContainer autoClose={2000} position="bottom-right"
        toastClassName={({ type }) => {
          // Customize toast classes based on type (e.g., success, error, etc.)
          return 'rounded p-1 mx-auto max-w-md ' +
            (type === 'success' ? 'bg-black text-white' :
            type === 'error' ? 'bg-black text-white' :
            type === 'info' ? 'bg-black text-white' :
            'bg-gray-500 text-white');
        }}
      />
    </UserProvider>
  </React.StrictMode>
);
