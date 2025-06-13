import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  MessageCircle, 
  Share2, 
  Clock, 
  Eye,
  UserPlus,
  Video,
  Mic,
  Settings
} from "lucide-react";

interface Collaborator {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'offline' | 'busy';
  avatar?: string;
}

interface ProjectSession {
  id: string;
  name: string;
  participants: number;
  type: 'video' | 'audio' | 'music';
  lastActivity: string;
}

export default function CollaborationWorkspace() {
  const [collaborators] = useState<Collaborator[]>([
    { id: '1', name: 'Alex Chen', role: 'Director', status: 'online' },
    { id: '2', name: 'Maria Garcia', role: 'Sound Designer', status: 'online' },
    { id: '3', name: 'James Wilson', role: 'Editor', status: 'busy' },
    { id: '4', name: 'Sarah Kim', role: 'Producer', status: 'offline' }
  ]);

  const [sessions] = useState<ProjectSession[]>([
    { id: '1', name: 'AI Revolution Movie Edit', participants: 3, type: 'video', lastActivity: '2 minutes ago' },
    { id: '2', name: 'Digital Dreams Album Mix', participants: 2, type: 'music', lastActivity: '5 minutes ago' },
    { id: '3', name: 'Podcast Recording Session', participants: 4, type: 'audio', lastActivity: '1 hour ago' }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'music': return Settings;
      case 'audio': return Mic;
      default: return Video;
    }
  };

  return (
    <div className="space-y-6">
      {/* Real-time Collaboration */}
      <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Real-time Collaboration Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Active Collaborators */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Team Members ({collaborators.filter(c => c.status === 'online').length} online)
              </h3>
              <div className="space-y-3">
                {collaborators.map((collaborator) => (
                  <div 
                    key={collaborator.id}
                    className="flex items-center gap-3 p-3 bg-black/20 rounded-lg border border-white/10"
                  >
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={collaborator.avatar} />
                        <AvatarFallback>{collaborator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(collaborator.status)} border-2 border-gray-900`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white">{collaborator.name}</div>
                      <div className="text-sm text-gray-400">{collaborator.role}</div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {collaborator.status}
                    </Badge>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 space-y-2">
                <Input 
                  placeholder="Invite by email..."
                  className="bg-black/40 border-white/20"
                />
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Invite Collaborator
                </Button>
              </div>
            </div>

            {/* Active Sessions */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Active Sessions
              </h3>
              <div className="space-y-3">
                {sessions.map((session) => {
                  const TypeIcon = getTypeIcon(session.type);
                  return (
                    <Card key={session.id} className="bg-black/30 border-white/10">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <TypeIcon className="w-4 h-4 text-blue-400" />
                            <span className="font-medium text-white">{session.name}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {session.participants} active
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {session.lastActivity}
                          </span>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="text-xs">
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                            <Button size="sm" className="text-xs bg-gradient-to-r from-green-500 to-blue-500">
                              Join
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Collaboration Features */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-auto p-4 flex-col gap-2 bg-gradient-to-r from-purple-500 to-pink-500">
              <Video className="w-6 h-6" />
              <span>Start Video Call</span>
            </Button>
            <Button className="h-auto p-4 flex-col gap-2 bg-gradient-to-r from-green-500 to-teal-500">
              <Share2 className="w-6 h-6" />
              <span>Share Screen</span>
            </Button>
            <Button className="h-auto p-4 flex-col gap-2 bg-gradient-to-r from-orange-500 to-red-500">
              <MessageCircle className="w-6 h-6" />
              <span>Team Chat</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Project Sharing */}
      <Card className="bg-black/20 border-white/10">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Share2 className="w-6 h-6" />
            Project Sharing & Permissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Input 
                placeholder="Generate shareable link..."
                className="flex-1 bg-black/40 border-white/20"
                readOnly
                value="https://studio.example.com/project/ai-revolution-shared"
              />
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500">
                Copy Link
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Badge variant="outline" className="justify-center py-2">View Only</Badge>
              <Badge variant="outline" className="justify-center py-2">Comment</Badge>
              <Badge variant="outline" className="justify-center py-2">Edit</Badge>
              <Badge variant="outline" className="justify-center py-2">Full Access</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}