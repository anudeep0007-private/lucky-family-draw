
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Trophy, DollarSign, Sparkles, History, Gift, PhoneCall } from 'lucide-react';
import GroupMembers from '@/components/GroupMembers';
import LuckyDraw from '@/components/LuckyDraw';
import WinnerHistory from '@/components/WinnerHistory';
import { useToast } from '@/hooks/use-toast';

// Mock data - replace with Supabase integration
const mockMembers = [
  { id: 1, name: 'அப்பா (Papa)', paid: true, phone: '+91 98765 43210' },
  { id: 2, name: 'அம்மா (Mama)', paid: true, phone: '+91 98765 43211' },
  { id: 3, name: 'அண்ணா (Anna)', paid: true, phone: '+91 98765 43212' },
  { id: 4, name: 'அக்காள் (Akka)', paid: false, phone: '+91 98765 43213' },
  { id: 5, name: 'தம்பி (Thambi)', paid: true, phone: '+91 98765 43214' },
  { id: 6, name: 'தங்கை (Thangai)', paid: true, phone: '+91 98765 43215' },
  { id: 7, name: 'மாமா (Mama)', paid: false, phone: '+91 98765 43216' },
  { id: 8, name: 'மாமி (Mami)', paid: true, phone: '+91 98765 43217' },
  { id: 9, name: 'சித்தப்பா (Chithappa)', paid: true, phone: '+91 98765 43218' },
  { id: 10, name: 'சித்தி (Chithi)', paid: false, phone: '+91 98765 43219' }
];

const mockHistory = [
  { id: 1, winner: 'அண்ணா (Anna)', amount: 10000, date: '2024-01-15', round: 1 },
  { id: 2, winner: 'அம்மா (Mama)', amount: 10000, date: '2024-02-15', round: 2 },
  { id: 3, winner: 'தம்பி (Thambi)', amount: 10000, date: '2024-03-15', round: 3 }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [members, setMembers] = useState(mockMembers);
  const [drawHistory, setDrawHistory] = useState(mockHistory);
  const [currentUser] = useState({ id: 1, name: 'அப்பா (Papa)', isAdmin: true });
  const { toast } = useToast();

  const paidMembers = members.filter(member => member.paid);
  const totalPool = paidMembers.length * 1000;
  const eligibleForDraw = members.filter(member => 
    member.paid && !drawHistory.some(h => h.winner === member.name)
  );

  const togglePaymentStatus = (memberId: number) => {
    setMembers(prev => prev.map(member => 
      member.id === memberId 
        ? { ...member, paid: !member.paid }
        : member
    ));
    toast({
      title: "Payment Status Updated",
      description: "Member payment status has been updated successfully.",
    });
  };

  const handleDrawComplete = (winner: any) => {
    const newEntry = {
      id: drawHistory.length + 1,
      winner: winner.name,
      amount: totalPool,
      date: new Date().toISOString().split('T')[0],
      round: drawHistory.length + 1
    };
    setDrawHistory(prev => [...prev, newEntry]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-green-500">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Family Lucky Draw</h1>
                <p className="text-white/80 text-sm">குடும்ப அதிர்ஷ்ட சீட்டு</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Round {drawHistory.length + 1}
              </Badge>
              {currentUser.isAdmin && (
                <Badge variant="outline" className="border-purple-400 text-purple-300">
                  Admin
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex space-x-2 mb-6 bg-white/10 backdrop-blur-md rounded-lg p-2 overflow-x-auto">
          <Button
            variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 ${activeTab === 'dashboard' ? 'bg-white text-gray-900' : 'text-white hover:bg-white/20'}`}
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
          <Button
            variant={activeTab === 'members' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('members')}
            className={`flex-1 ${activeTab === 'members' ? 'bg-white text-gray-900' : 'text-white hover:bg-white/20'}`}
          >
            <Users className="w-4 h-4 mr-2" />
            Members
          </Button>
          <Button
            variant={activeTab === 'draw' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('draw')}
            className={`flex-1 ${activeTab === 'draw' ? 'bg-white text-gray-900' : 'text-white hover:bg-white/20'}`}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Lucky Draw
          </Button>
          <Button
            variant={activeTab === 'history' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('history')}
            className={`flex-1 ${activeTab === 'history' ? 'bg-white text-gray-900' : 'text-white hover:bg-white/20'}`}
          >
            <History className="w-4 h-4 mr-2" />
            History
          </Button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-300" />
                    Total Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{members.length}/10</div>
                  <p className="text-white/70">Family members</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-green-300" />
                    Total Pool
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₹{totalPool.toLocaleString()}</div>
                  <p className="text-white/70">{paidMembers.length} paid members</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-yellow-300" />
                    Eligible for Draw
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{eligibleForDraw.length}</div>
                  <p className="text-white/70">Active members</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gift className="w-5 h-5 mr-2 text-purple-300" />
                  Welcome, {currentUser.name}!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4">
                  Welcome to the family lucky draw! Each member contributes ₹1000, and one lucky winner takes home the entire pool of ₹{totalPool.toLocaleString()}!
                </p>
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">How it works:</h3>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Each family member contributes ₹1000</li>
                    <li>• Any member can initiate the lucky draw</li>
                    <li>• Winner takes the entire pool amount</li>
                    <li>• Previous winners are excluded from future draws</li>
                    <li>• Fair and transparent for everyone!</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Members Tab */}
        {activeTab === 'members' && (
          <GroupMembers 
            members={members} 
            onTogglePayment={togglePaymentStatus}
            isAdmin={currentUser.isAdmin}
          />
        )}

        {/* Lucky Draw Tab */}
        {activeTab === 'draw' && (
          <LuckyDraw 
            eligibleMembers={eligibleForDraw}
            totalAmount={totalPool}
            onDrawComplete={handleDrawComplete}
          />
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <WinnerHistory history={drawHistory} />
        )}
      </div>
    </div>
  );
};

export default Index;
