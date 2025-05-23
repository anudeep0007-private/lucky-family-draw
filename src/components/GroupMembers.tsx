
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Phone, DollarSign, PhoneCall } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

interface Member {
  id: number;
  name: string;
  paid: boolean;
  phone: string;
}

interface GroupMembersProps {
  members: Member[];
  onTogglePayment: (memberId: number) => void;
  isAdmin?: boolean;
}

const GroupMembers: React.FC<GroupMembersProps> = ({ members, onTogglePayment, isAdmin = true }) => {
  const paidCount = members.filter(m => m.paid).length;
  const pendingCount = members.length - paidCount;
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);

  const handleVoiceCall = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber.replace(/\s+/g, '')}`);
  };

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

      {/* Admin Controls */}
      {isAdmin && (
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Admin Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-white/80">Manage payment status for all members at once</p>
              <Dialog open={isAdminDialogOpen} onOpenChange={setIsAdminDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="default" className="bg-purple-600 hover:bg-purple-700">
                    Bulk Edit Payments
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-white/20 text-white">
                  <DialogHeader>
                    <DialogTitle>Edit Payment Status</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/10">
                          <TableHead className="text-white">Member Name</TableHead>
                          <TableHead className="text-white">Phone</TableHead>
                          <TableHead className="text-white">Paid Status</TableHead>
                          <TableHead className="text-white">Call</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {members.map((member) => (
                          <TableRow key={member.id} className="border-white/10">
                            <TableCell className="text-white">{member.name}</TableCell>
                            <TableCell className="text-white/70">{member.phone}</TableCell>
                            <TableCell>
                              <Checkbox 
                                checked={member.paid}
                                onCheckedChange={() => onTogglePayment(member.id)}
                                className={member.paid ? "bg-green-600 text-white border-green-400" : "border-orange-400"}
                              />
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/30"
                                onClick={() => handleVoiceCall(member.phone)}
                              >
                                <PhoneCall className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      onClick={() => setIsAdminDialogOpen(false)}
                      variant="outline" 
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Close
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      )}

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
                    variant="outline"
                    onClick={() => handleVoiceCall(member.phone)}
                    className="border-blue-400 text-blue-400 hover:bg-blue-900/30"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </Button>
                  {isAdmin && (
                    <Button
                      size="sm"
                      variant={member.paid ? "destructive" : "default"}
                      onClick={() => onTogglePayment(member.id)}
                      className="min-w-20"
                    >
                      {member.paid ? "Mark Unpaid" : "Mark Paid"}
                    </Button>
                  )}
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
            <p>• Call members directly by clicking the phone button</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupMembers;
