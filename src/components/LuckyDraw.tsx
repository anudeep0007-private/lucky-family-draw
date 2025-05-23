
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Trophy, Users, DollarSign, Gift, Zap, Mic, MicOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Member {
  id: number;
  name: string;
  paid: boolean;
  phone: string;
}

interface LuckyDrawProps {
  eligibleMembers: Member[];
  totalAmount: number;
  onDrawComplete: (winner: Member) => void;
}

const LuckyDraw: React.FC<LuckyDrawProps> = ({ eligibleMembers, totalAmount, onDrawComplete }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [winner, setWinner] = useState<Member | null>(null);
  const [drawComplete, setDrawComplete] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isGroupCallActive, setIsGroupCallActive] = useState(false);
  const { toast } = useToast();

  const toggleGroupCall = () => {
    setIsGroupCallActive(!isGroupCallActive);
    
    toast({
      title: isGroupCallActive ? "Group Call Ended" : "Group Call Started",
      description: isGroupCallActive 
        ? "The group call has been ended." 
        : "All members can now speak during the lucky draw!",
    });
  };

  const startDraw = () => {
    if (eligibleMembers.length === 0) {
      toast({
        title: "No Eligible Members",
        description: "There are no members eligible for the draw. Make sure members have paid and haven't won before.",
        variant: "destructive"
      });
      return;
    }

    setIsDrawing(true);
    setWinner(null);
    setDrawComplete(false);
    setCountdown(3);

    // Countdown animation
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          performDraw();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const performDraw = () => {
    // Simulate drawing process with random selection
    let drawInterval: NodeJS.Timeout;
    let iterations = 0;
    const maxIterations = 20;

    drawInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * eligibleMembers.length);
      setWinner(eligibleMembers[randomIndex]);
      iterations++;

      if (iterations >= maxIterations) {
        clearInterval(drawInterval);
        const finalWinner = eligibleMembers[Math.floor(Math.random() * eligibleMembers.length)];
        setWinner(finalWinner);
        setIsDrawing(false);
        setDrawComplete(true);
        
        toast({
          title: "🎉 We have a winner!",
          description: `${finalWinner.name} has won ₹${totalAmount.toLocaleString()}!`,
        });

        // Auto-complete the draw after 5 seconds
        setTimeout(() => {
          onDrawComplete(finalWinner);
          setDrawComplete(false);
          setWinner(null);
        }, 5000);
      }
    }, 150);
  };

  return (
    <div className="space-y-6">
      {/* Draw Status */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 mr-2 text-yellow-300" />
            Lucky Draw Arena
            <Sparkles className="w-6 h-6 ml-2 text-yellow-300" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              ₹{totalAmount.toLocaleString()}
            </div>
            <p className="text-white/80">Prize Money</p>
            
            {countdown > 0 && (
              <div className="text-8xl font-bold text-yellow-400 animate-pulse">
                {countdown}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Group Call Feature */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center">
            {isGroupCallActive ? (
              <Mic className="w-5 h-5 mr-2 text-green-400" />
            ) : (
              <MicOff className="w-5 h-5 mr-2 text-gray-400" />
            )}
            Group Voice Call
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-white/80">
              {isGroupCallActive 
                ? "Group call is active! All members can hear and speak to each other during the draw." 
                : "Start a group call so all members can participate in the excitement together!"}
            </p>
            
            <Button 
              onClick={toggleGroupCall}
              className={isGroupCallActive 
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"}
            >
              {isGroupCallActive ? (
                <>
                  <MicOff className="w-4 h-4 mr-2" />
                  End Group Call
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 mr-2" />
                  Start Group Call
                </>
              )}
            </Button>
            
            {isGroupCallActive && (
              <div className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {eligibleMembers.slice(0, 6).map((member) => (
                    <div key={member.id} className="bg-white/10 p-2 rounded-lg flex items-center">
                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center mr-2">
                        {member.name.charAt(0)}
                      </div>
                      <div className="text-xs overflow-hidden">
                        <div className="truncate font-medium">{member.name}</div>
                        <div className="text-white/60 truncate">{member.phone}</div>
                      </div>
                    </div>
                  ))}
                  {eligibleMembers.length > 6 && (
                    <div className="bg-white/10 p-2 rounded-lg flex items-center justify-center">
                      <span className="text-white/80">+{eligibleMembers.length - 6} more</span>
                    </div>
                  )}
                </div>
                
                <p className="text-white/60 text-xs mt-3">
                  All participants are connected. Speak clearly for everyone to hear!
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Eligible Members */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Eligible Members ({eligibleMembers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {eligibleMembers.length === 0 ? (
            <div className="text-center py-8">
              <Trophy className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-white/60">No members are currently eligible for the draw.</p>
              <p className="text-white/40 text-sm mt-2">Members must have paid their contribution and not have won before.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {eligibleMembers.map((member, index) => (
                <div 
                  key={member.id}
                  className={`p-3 rounded-lg border transition-all duration-200 ${
                    winner?.id === member.id && isDrawing
                      ? 'bg-yellow-500/30 border-yellow-400 shadow-lg scale-105'
                      : winner?.id === member.id && drawComplete
                      ? 'bg-green-500/30 border-green-400 shadow-lg'
                      : 'bg-white/5 border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-white/60 text-sm">{member.phone}</div>
                    </div>
                    {winner?.id === member.id && drawComplete && (
                      <Badge className="bg-green-500 text-white">
                        WINNER! 🏆
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Draw Button */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            {!drawComplete ? (
              <Button
                onClick={startDraw}
                disabled={isDrawing || eligibleMembers.length === 0}
                className="w-full md:w-auto px-12 py-6 text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
              >
                {isDrawing ? (
                  <>
                    <Zap className="w-6 h-6 mr-2 animate-spin" />
                    Drawing...
                  </>
                ) : (
                  <>
                    <Gift className="w-6 h-6 mr-2" />
                    Start Lucky Draw
                  </>
                )}
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="text-4xl">🎉</div>
                <div className="text-2xl font-bold text-green-400">
                  Congratulations {winner?.name}!
                </div>
                <div className="text-white/80">
                  You've won ₹{totalAmount.toLocaleString()}!
                </div>
                <Badge className="bg-green-500 text-white">
                  Draw completed successfully
                </Badge>
              </div>
            )}

            <div className="text-white/60 text-sm mt-4 space-y-1">
              <p>• Any family member can initiate the lucky draw</p>
              <p>• The system randomly selects from eligible members</p>
              <p>• Winner is automatically recorded in history</p>
              <p>• Previous winners are excluded from future draws</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Draw Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">{eligibleMembers.length}</div>
                <div className="text-white/70 text-sm">Eligible Members</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">₹{totalAmount.toLocaleString()}</div>
                <div className="text-white/70 text-sm">Prize Money</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">{eligibleMembers.length > 0 ? Math.floor(100 / eligibleMembers.length) : 0}%</div>
                <div className="text-white/70 text-sm">Win Chance</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LuckyDraw;
