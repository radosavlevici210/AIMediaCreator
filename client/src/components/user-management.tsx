import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Crown, 
  Mail, 
  Shield, 
  UserPlus,
  Settings
} from "lucide-react";

interface User {
  id: string;
  email: string;
  role: 'admin' | 'user' | 'collaborator';
  status: 'active' | 'pending' | 'inactive';
  joinDate: string;
}

export default function UserManagement() {
  const [users] = useState<User[]>([
    {
      id: '1',
      email: 'ervin210@icloud.com',
      role: 'admin',
      status: 'active',
      joinDate: '2024-01-01'
    },
    {
      id: '2',
      email: 'radosavlevici210@icloud.com',
      role: 'admin',
      status: 'active',
      joinDate: '2024-01-01'
    },
    {
      id: '3',
      email: 'radosavlevici.ervin@gmail.com',
      role: 'admin',
      status: 'active',
      joinDate: '2024-01-01'
    }
  ]);

  const [newUserEmail, setNewUserEmail] = useState("");

  const rootUsers = ['ervin210@icloud.com', 'radosavlevici210@icloud.com', 'radosavlevici.ervin@gmail.com'];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="w-4 h-4" />;
      case 'user':
        return <Users className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'user':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* User Management Header */}
      <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Users className="w-6 h-6" />
            User Management & Administration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-4">
            Manage users and administrative access for AI Movie & Music Studio Pro+
          </p>
          
          {/* Root Users Info */}
          <div className="bg-black/30 rounded-lg p-4 mb-6">
            <h3 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
              <Crown className="w-5 h-5" />
              Root Administrators
            </h3>
            <div className="space-y-2">
              {rootUsers.map((email, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-yellow-500/10 rounded border border-yellow-500/20">
                  <Mail className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-300 font-medium">{email}</span>
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                    Root Admin
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Add New User */}
          <div className="bg-black/20 rounded-lg p-4 mb-6">
            <h3 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Add New User
            </h3>
            <div className="flex gap-3">
              <div className="flex-1">
                <Label className="text-gray-300">Email Address</Label>
                <Input
                  type="email"
                  placeholder="user@example.com"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="bg-black/40 border-white/20 text-white"
                />
              </div>
              <div className="flex items-end">
                <Button className="bg-green-500 hover:bg-green-600">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Invite User
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Users */}
      <Card className="bg-gradient-to-br from-gray-500/10 to-blue-500/10 border-gray-500/30">
        <CardHeader>
          <CardTitle className="text-gray-300 flex items-center gap-2">
            <Settings className="w-6 h-6" />
            Current Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getRoleIcon(user.role)}
                    <span className="text-white font-medium">{user.email}</span>
                  </div>
                  <Badge className={getRoleBadgeColor(user.role)}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                  {rootUsers.includes(user.email) && (
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                      <Crown className="w-3 h-3 mr-1" />
                      Root
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-sm text-gray-400">
                    Joined: {user.joinDate}
                  </div>
                  <Badge 
                    className={
                      user.status === 'active' 
                        ? 'bg-green-500/20 text-green-400 border-green-500/30'
                        : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                    }
                  >
                    {user.status}
                  </Badge>
                  {!rootUsers.includes(user.email) && (
                    <Button size="sm" variant="outline" className="border-red-500/50 text-red-400">
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Project Information */}
          <div className="mt-8 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <h4 className="text-blue-400 font-semibold mb-2">Project Information</h4>
            <div className="space-y-1 text-sm text-gray-300">
              <p><strong>Project:</strong> AI Movie & Music Studio Pro+</p>
              <p><strong>Owner:</strong> Ervin Radosavlevici</p>
              <p><strong>Primary Contact:</strong> ervin210@icloud.com</p>
              <p><strong>Team Contact:</strong> radosavlevici210@icloud.com</p>
              <p><strong>Version:</strong> 1.0.0 (Production Ready)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}