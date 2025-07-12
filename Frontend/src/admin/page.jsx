import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Users, AlertTriangle, MessageSquare, Download, Ban, CheckCircle, Search, Filter } from "lucide-react";

import { Button } from "../components/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/card";
import { Input } from "../components/input";
import { Badge } from "../components/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs";
import { Textarea } from "../components/textarea";
import { Label } from "../components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/select";

function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [swaps, setSwaps] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingRequests: 0,
    acceptedRequests: 0,
    rejectedRequests: 0,
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/admin/dashboard", {
          withCredentials: true,
        });

        if (res.data.isAdmin) {
          setIsAdmin(true);
          setUsers(res.data.users);
          setSwaps(res.data.swaps);
          setStats(res.data.stats);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error(err);
        setIsAdmin(false);
      }
    };

    fetchAdminStatus();
  }, []);

  const handleBanUser = async (userId) => {
    try {
      await axios.patch(`http://localhost:3000/api/admin/ban/${userId}`, {
        withCredentials: true,
      });
      alert("User banned successfully!");

      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, isBanned: true } : u))
      );
    } catch (err) {
      console.error("Ban failed", err);
      alert("Failed to ban user");
    }
  };

  const handleSendMessage = () => {
    console.log("Sending platform message:", message);
    setMessage("");
  };

  const handleDownloadReport = (type) => {
    console.log("Downloading report:", type);
  };

  if (!isAdmin) return <p className="text-red-500 p-4">Access Denied</p>;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400">Manage users, content, and platform operations</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Total Users</p>
                  <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Accepted Swaps</p>
                  <p className="text-2xl font-bold text-white">{stats.acceptedRequests}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-yellow-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Pending Swaps</p>
                  <p className="text-2xl font-bold text-white">{stats.pendingRequests}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Download className="h-8 w-8 text-purple-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Rejected Swaps</p>
                  <p className="text-2xl font-bold text-white">{stats.rejectedRequests}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="users" className="text-white data-[state=active]:bg-blue-600">User Management</TabsTrigger>
            <TabsTrigger value="swaps" className="text-white data-[state=active]:bg-blue-600">Swap Monitoring</TabsTrigger>
            <TabsTrigger value="messages" className="text-white data-[state=active]:bg-blue-600">Platform Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
<Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">User Management</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    <Button
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-700 bg-transparent"
                    >
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div
                      key={user._id}
                      className="flex items-center justify-between p-4 border border-gray-700 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="font-semibold text-white">{user.fullName}</h3>
                          <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={user.isBanned === false ? "bg-green-600" : "bg-red-600"}>
                          Active
                        </Badge>
                        {user.isBanned === false && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                            onClick={() => handleBanUser(user._id)}
                          >
                            <Ban className="h-4 w-4 mr-1" />
                            Ban
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
                      </TabsContent>

          <TabsContent value="swaps">
<Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Swap Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {swaps.map((swap, id) => (
                    <div key={id} className="p-4 border border-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-4">
                          <h3 className="font-semibold text-white">
                            {swap.user1} ↔ {swap.user2}
                          </h3>
                          <Badge
                            className={
                              swap.status === "accepted"
                                ? "bg-green-600"
                                : swap.status === "pending"
                                  ? "bg-blue-600"
                                  : "bg-red-600"
                            }
                          >
                            {swap.status}
                          </Badge>
                        </div>

                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>
                          {swap.skill1} ↔ {swap.skill2}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
                      </TabsContent>

          <TabsContent value="messages">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Send Platform-wide Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="message-type" className="text-white">
                    Message Type
                  </Label>
                  <Select>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select message type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="maintenance">Maintenance Alert</SelectItem>
                      <SelectItem value="feature">New Feature</SelectItem>
                      <SelectItem value="policy">Policy Update</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your platform-wide message..."
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 min-h-[120px]"
                  />
                </div>

                <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Download Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    onClick={() => handleDownloadReport("users")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    User Activity
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    onClick={() => handleDownloadReport("feedback")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Feedback Logs
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    onClick={() => handleDownloadReport("swaps")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Swap Statistics
                  </Button>
                </div>
              </CardContent>
            </Card>          
            </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AdminDashboard;
