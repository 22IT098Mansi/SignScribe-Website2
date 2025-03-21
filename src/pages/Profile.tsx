
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { User, Mail, Camera, BookOpen, Award, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const Profile: React.FC = () => {
  const { user, signOut } = useAuth();
  const [saving, setSaving] = useState(false);
  const [profileName, setProfileName] = useState(user?.user_metadata?.full_name || '');
  
  if (!user) {
    return <Navigate to="/signin" />;
  }
  
  const handleSaveProfile = () => {
    setSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      setSaving(false);
      toast.success('Profile updated successfully');
    }, 1500);
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 page-transition">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Profile</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage your account settings and view your learning progress
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1 bg-white dark:bg-gray-800 border-0 shadow-lg">
              <CardHeader className="text-center pb-0">
                <div className="mx-auto mb-4 relative">
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarImage src={user.user_metadata?.avatar_url || ''} alt={user.user_metadata?.full_name || user.email || ''} />
                    <AvatarFallback className="text-2xl">
                      {getInitials(profileName || user.email?.split('@')[0] || 'User')}
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-lg">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <CardTitle className="mt-4">{profileName || user.email?.split('@')[0]}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg flex justify-between">
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 text-blue-500 mr-2" />
                      <span>Learning streak</span>
                    </div>
                    <span className="font-semibold">3 days</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg flex justify-between">
                    <div className="flex items-center">
                      <Award className="h-5 w-5 text-blue-500 mr-2" />
                      <span>Completed lessons</span>
                    </div>
                    <span className="font-semibold">12</span>
                  </div>
                  <Button variant="destructive" className="w-full" onClick={signOut}>
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="md:col-span-2">
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="bg-white dark:bg-gray-800 border p-1 w-full mb-6 shadow-sm">
                  <TabsTrigger value="account" className="flex-1">Account</TabsTrigger>
                  <TabsTrigger value="progress" className="flex-1">Progress</TabsTrigger>
                  <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="account">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Account Information</CardTitle>
                      <CardDescription>
                        Update your account details and profile information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <Input
                            value={profileName}
                            onChange={(e) => setProfileName(e.target.value)}
                            className="pl-10"
                            placeholder="Your full name"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <Input
                            value={user.email || ''}
                            disabled
                            className="pl-10 bg-gray-50 dark:bg-gray-900/50"
                          />
                        </div>
                        <p className="text-xs text-gray-500">
                          Your email address cannot be changed
                        </p>
                      </div>
                      <Button onClick={handleSaveProfile} disabled={saving} className="w-full md:w-auto">
                        {saving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="progress">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Learning Progress</CardTitle>
                      <CardDescription>
                        Track your sign language learning journey
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Beginner course</span>
                            <span className="text-sm font-medium">75%</span>
                          </div>
                          <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: "75%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Alphabet mastery</span>
                            <span className="text-sm font-medium">90%</span>
                          </div>
                          <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: "90%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Numbers & counting</span>
                            <span className="text-sm font-medium">40%</span>
                          </div>
                          <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: "40%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Intermediate expressions</span>
                            <span className="text-sm font-medium">10%</span>
                          </div>
                          <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: "10%" }}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="settings">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                      <CardDescription>
                        Manage your account preferences and settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b">
                          <div>
                            <h3 className="font-medium">Email notifications</h3>
                            <p className="text-sm text-gray-500">Receive emails about your account activity</p>
                          </div>
                          <div className="flex items-center h-5">
                            <input
                              id="email-notifications"
                              aria-describedby="email-notifications-description"
                              name="email-notifications"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              defaultChecked
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b">
                          <div>
                            <h3 className="font-medium">Learning reminders</h3>
                            <p className="text-sm text-gray-500">Receive daily reminders to practice</p>
                          </div>
                          <div className="flex items-center h-5">
                            <input
                              id="learning-reminders"
                              aria-describedby="learning-reminders-description"
                              name="learning-reminders"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              defaultChecked
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between py-3">
                          <div>
                            <h3 className="font-medium">Two-factor authentication</h3>
                            <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Enable
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;
