import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";

// Get the publishable key from environment
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "";

// Create a wrapper component to conditionally render ClerkProvider
const Root = () => {
  // If no key is available, render the app without Clerk
  if (!PUBLISHABLE_KEY) {
    console.warn("Missing Clerk Publishable Key. Authentication features will be disabled.");
    return <App />;
  }

  // Otherwise, render with Clerk
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
