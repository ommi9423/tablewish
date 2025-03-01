
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut } from "@clerk/clerk-react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BookTable from "./pages/BookTable";
import RestaurantDetail from "./pages/RestaurantDetail";
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";

const queryClient = new QueryClient();

// Check if Clerk is available
const isClerkAvailable = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/book-table" element={<BookTable />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          {isClerkAvailable ? (
            // Clerk is available, use authentication
            <Route path="/profile" element={
              <>
                <ClerkLoading>
                  <div className="h-screen flex items-center justify-center">
                    <div className="animate-pulse">Loading user data...</div>
                  </div>
                </ClerkLoading>
                <ClerkLoaded>
                  <SignedIn>
                    <ProfilePage />
                  </SignedIn>
                  <SignedOut>
                    <AuthPage />
                  </SignedOut>
                </ClerkLoaded>
              </>
            } />
          ) : (
            // Clerk is not available, show empty profile
            <Route path="/profile" element={
              <div className="h-screen flex flex-col items-center justify-center">
                <div className="text-xl font-medium mb-4">Authentication Not Configured</div>
                <p className="text-gray-600 max-w-md text-center">
                  To enable authentication features, please add your Clerk publishable key to the environment variables.
                </p>
              </div>
            } />
          )}
          {isClerkAvailable && (
            <>
              <Route path="/sign-in/*" element={<AuthPage type="sign-in" />} />
              <Route path="/sign-up/*" element={<AuthPage type="sign-up" />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
