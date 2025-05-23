
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Phone, DollarSign } from 'lucide-react';

interface Member {
  id: number;
  name: string;
  paid: boolean;
  phone: string;
}

interface GroupMembersProps {
  members: Member[];
  onTogglePayment: (memberId: number) => void;
}

const GroupMembers: React.FC<GroupMembersProps> = ({ members, onTogglePayment }) => {
  const paidCount = members.filter(m => m.paid).length;
  const pendingCount = members.length - paidCount;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">{paidCount}</div>
                <div className="text-white/70 text-sm">Paid Members</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <X className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">{pendingCount}</div>
                <div className="text-white/70 text-sm">Pending Payment</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">₹{(paidCount * 1000).toLocaleString()}</div>
                <div className="text-white/70 text-sm">Total Collected</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Members List */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Phone className="w-5 h-5 mr-2" />
            Family Members ({members.length}/10)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {members.map((member) => (
              <div 
                key={member.id}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    member.paid ? 'bg-green-500' : 'bg-gray-500'
                  }`}>
                    {member.paid ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <X className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{member.name}</div>
                    <div className="text-white/60 text-sm">{member.phone}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={member.paid ? "default" : "secondary"} className={
                    member.paid 
                      ? "bg-green-500 text-white" 
                      : "bg-orange-500 text-white"
                  }>
                    {member.paid ? "Paid ₹1000" : "Pending ₹1000"}
                  </Badge>
                  <Button
                    size="sm"
                    variant={member.paid ? "destructive" : "default"}
                    onClick={() => onTogglePayment(member.id)}
                    className="min-w-20"
                  >
                    {member.paid ? "Mark Unpaid" : "Mark Paid"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Instructions */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader>
          <CardTitle>Payment Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-white/80">
            <p>• Each member must contribute ₹1000 to participate in the lucky draw</p>
            <p>• Only paid members are eligible for the draw</p>
            <p>• Admin can toggle payment status by clicking the button next to each member</p>
            <p>• Total pool amount = Number of paid members × ₹1000</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupMembers;
