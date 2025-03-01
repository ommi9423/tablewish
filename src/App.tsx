
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
          <Route path="/sign-in/*" element={<AuthPage type="sign-in" />} />
          <Route path="/sign-up/*" element={<AuthPage type="sign-up" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
