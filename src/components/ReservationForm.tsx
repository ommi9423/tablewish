
import React, { useState } from 'react';
import { Calendar, Clock, Users, MessageSquare } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Restaurant } from '@/utils/types';

interface ReservationFormProps {
  restaurant: Restaurant;
}

const timeSlots = [
  '12:00 PM', '12:30 PM',
  '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM',
  '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM',
  '7:00 PM', '7:30 PM',
  '8:00 PM', '8:30 PM',
  '9:00 PM', '9:30 PM',
];

const ReservationForm: React.FC<ReservationFormProps> = ({ restaurant }) => {
  const { toast } = useToast();
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [partySize, setPartySize] = useState<number>(2);
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Reservation Confirmed!",
        description: `Your table at ${restaurant.name} has been reserved for ${date} at ${time}.`,
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="glass-card rounded-xl p-6 md:p-8 animate-fade-in">
      <h2 className="font-serif text-xl md:text-2xl font-medium mb-6">Reserve a Table</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date & Time Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="reservation-date" className="flex items-center text-sm font-medium">
              <Calendar className="mr-2 h-4 w-4" />
              Date
            </Label>
            <Input
              id="reservation-date"
              type="date"
              required
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="focus-visible:ring-black"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reservation-time" className="flex items-center text-sm font-medium">
              <Clock className="mr-2 h-4 w-4" />
              Time
            </Label>
            <select
              id="reservation-time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Select a time</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Party Size */}
        <div className="space-y-2">
          <Label htmlFor="party-size" className="flex items-center text-sm font-medium">
            <Users className="mr-2 h-4 w-4" />
            Number of People
          </Label>
          <select
            id="party-size"
            required
            value={partySize}
            onChange={(e) => setPartySize(Number(e.target.value))}
            className="w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'person' : 'people'}
              </option>
            ))}
            <option value="11">11+ people</option>
          </select>
        </div>
        
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="guest-name" className="text-sm font-medium">
              Name
            </Label>
            <Input
              id="guest-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="focus-visible:ring-black"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="guest-phone" className="text-sm font-medium">
              Phone Number
            </Label>
            <Input
              id="guest-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="focus-visible:ring-black"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="guest-email" className="text-sm font-medium">
            Email
          </Label>
          <Input
            id="guest-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus-visible:ring-black"
          />
        </div>
        
        {/* Special Requests */}
        <div className="space-y-2">
          <Label htmlFor="special-requests" className="flex items-center text-sm font-medium">
            <MessageSquare className="mr-2 h-4 w-4" />
            Special Requests (Optional)
          </Label>
          <Textarea
            id="special-requests"
            placeholder="Any special requests or dietary requirements?"
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            className="resize-none h-24 focus-visible:ring-black"
          />
        </div>
        
        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-black hover:bg-black/80 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Confirming..." : "Confirm Reservation"}
        </Button>
        
        <p className="text-xs text-gray-500 text-center">
          By clicking "Confirm Reservation", you agree to our terms and conditions.
        </p>
      </form>
    </div>
  );
};

export default ReservationForm;
