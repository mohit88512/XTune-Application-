import React from "react";

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import ImageProvider from "./context/ImageProvider.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <BrowserRouter>
    <ImageProvider>
      <App />
      <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
        />
    </ImageProvider>
  </BrowserRouter>,
  </Provider>
);
