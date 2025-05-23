
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Calendar, DollarSign, Award, TrendingUp } from 'lucide-react';

interface HistoryEntry {
  id: number;
  winner: string;
  amount: number;
  date: string;
  round: number;
}

interface WinnerHistoryProps {
  history: HistoryEntry[];
}

const WinnerHistory: React.FC<WinnerHistoryProps> = ({ history }) => {
  const totalDistributed = history.reduce((sum, entry) => sum + entry.amount, 0);
  const averageWinAmount = history.length > 0 ? Math.floor(totalDistributed / history.length) : 0;

  return (
    <div className="space-y-6">
      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">{history.length}</div>
                <div className="text-white/70 text-sm">Total Draws</div>
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
                <div className="text-2xl font-bold">₹{totalDistributed.toLocaleString()}</div>
                <div className="text-white/70 text-sm">Total Distributed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">₹{averageWinAmount.toLocaleString()}</div>
                <div className="text-white/70 text-sm">Avg Win Amount</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* History List */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Winner History ({history.length} draws)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {history.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-white/60 text-lg">No draws completed yet</p>
              <p className="text-white/40 text-sm mt-2">
                Start your first lucky draw to see the winner history here!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((entry, index) => (
                <div 
                  key={entry.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                        index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-500' :
                        index === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-600' :
                        'bg-gradient-to-r from-blue-400 to-blue-600'
                      }`}>
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                      <Badge 
                        className="absolute -top-1 -right-1 w-6 h-6 rounded-full text-xs bg-white text-gray-900 p-0 flex items-center justify-center"
                      >
                        {entry.round}
                      </Badge>
                    </div>
                    <div>
                      <div className="font-semibold text-white text-lg">{entry.winner}</div>
                      <div className="flex items-center text-white/60 text-sm space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(entry.date).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400">
                      ₹{entry.amount.toLocaleString()}
                    </div>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                      Round {entry.round} Winner
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Draw Rules */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader>
          <CardTitle>Draw Rules & Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-white/80">
            <p className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
              Each member contributes ₹1000 per round
            </p>
            <p className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
              Winner takes the entire pool amount
            </p>
            <p className="flex items-center">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
              Previous winners are excluded from future draws
            </p>
            <p className="flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
              Any family member can initiate the draw
            </p>
            <p className="flex items-center">
              <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
              System ensures fair and random selection
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WinnerHistory;
