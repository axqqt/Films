import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./Components/state/store.jsx";

// import { AuthProvider } from "react-auth-kit";

{
  /* <AuthProvider //still learning how to properly authenticate!
  authType={"cookie"}
  authName={"_auth"}
  cookieDomain={window.location.hostname}
  cookieSecure={false}
></AuthProvider>; */
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
