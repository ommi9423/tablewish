
import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserRound, BookOpen, MessageSquare } from 'lucide-react';
import Navbar from '@/components/Navbar';

// Mock data for past bookings
const pastBookings = [
  {
    id: '1',
    restaurantName: 'La Trattoria',
    date: '2023-10-15',
    time: '19:00',
    partySize: 2,
    status: 'completed',
  },
  {
    id: '2',
    restaurantName: 'Sushi Palace',
    date: '2023-11-20',
    time: '18:30',
    partySize: 4,
    status: 'canceled',
  },
  {
    id: '3',
    restaurantName: 'Spice Garden',
    date: '2023-12-05',
    time: '20:00',
    partySize: 3,
    status: 'completed',
  },
];

const ProfilePage = () => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.emailAddresses[0]?.emailAddress || '',
    phone: user?.phoneNumbers[0]?.phoneNumber || '',
  });
  const [supportMessage, setSupportMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user's profile
    console.log('Updated profile:', formData);
    // Show success toast
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the support message
    console.log('Support message:', supportMessage);
    setSupportMessage('');
    // Show success toast
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 md:px-6 pt-28 pb-16">
        <h1 className="font-serif text-3xl md:text-4xl font-medium mb-8 text-center">Your Profile</h1>
        
        <Tabs defaultValue="personal" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <UserRound size={16} />
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <BookOpen size={16} />
              Past Bookings
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2">
              <MessageSquare size={16} />
              Support
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and preferences.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input 
                        id="firstName" 
                        name="firstName"
                        value={formData.firstName} 
                        onChange={handleChange}
                        placeholder="Your first name" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input 
                        id="lastName" 
                        name="lastName"
                        value={formData.lastName} 
                        onChange={handleChange}
                        placeholder="Your last name" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      value={formData.email} 
                      onChange={handleChange}
                      placeholder="Your email address" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      type="tel" 
                      value={formData.phone} 
                      onChange={handleChange}
                      placeholder="Your phone number" 
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full md:w-auto">
                    Save Changes
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Past Bookings</CardTitle>
                <CardDescription>
                  View your reservation history.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pastBookings.length > 0 ? (
                  <div className="space-y-4">
                    {pastBookings.map((booking) => (
                      <div 
                        key={booking.id} 
                        className="p-4 border rounded-lg transition-all hover:bg-gray-50"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-serif font-medium text-lg">{booking.restaurantName}</h3>
                            <p className="text-sm text-gray-500">
                              {new Date(booking.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })} • {booking.time}
                            </p>
                            <p className="text-sm">Party size: {booking.partySize}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            booking.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {booking.status === 'completed' ? 'Completed' : 'Canceled'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">You haven't made any bookings yet.</p>
                    <Button 
                      variant="outline"
                      asChild
                      className="mt-4"
                    >
                      <a href="/book-table">Book a Table</a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="support">
            <Card>
              <CardHeader>
                <CardTitle>Support</CardTitle>
                <CardDescription>
                  Need help? Send us a message and our team will get back to you soon.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSupportSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="supportMessage">Your message</Label>
                    <textarea 
                      id="supportMessage" 
                      rows={5}
                      value={supportMessage}
                      onChange={(e) => setSupportMessage(e.target.value)}
                      placeholder="Describe your issue or question..."
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto"
                    disabled={!supportMessage.trim()}
                  >
                    Send Message
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
