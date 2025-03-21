
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/context/AuthContext';
import { mockVideos, getUserProgress } from '@/lib/supabase';
import VideoCard from '@/components/VideoCard';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { Loader2, BookOpen } from 'lucide-react';

const Learn: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const progress = getUserProgress();
  
  // Simulate loading delay
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  if (!user) {
    return <Navigate to="/signin" />;
  }
  
  const filteredVideos = activeCategory === 'all' 
    ? mockVideos 
    : mockVideos.filter(video => video.category === activeCategory);
  
  const categories = ['all', 'basics', 'alphabet', 'numbers', 'phrases', 'conversation', 'expressions'];
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 page-transition">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Learn Indian Sign Language</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our comprehensive collection of Indian Sign Language tutorials and lessons.
              From beginner basics to advanced conversations, we have everything you need to become fluent.
            </p>
          </div>

          {/* Progress Section */}
          <div className="mb-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-2">
              <BookOpen className="mr-2 h-5 w-5 text-green-600" />
              <h2 className="text-xl font-semibold">Your Learning Progress</h2>
            </div>
            <div className="mb-2 flex justify-between">
              <span className="text-sm font-medium">Course completion</span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              <p>Complete all modules to become proficient in Indian Sign Language</p>
            </div>
          </div>
          
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
            <div className="flex justify-center">
              <TabsList className="bg-white dark:bg-gray-800 border p-1 shadow-sm">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="capitalize"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {categories.map((category) => (
              <TabsContent key={category} value={category} className="mt-6">
                {loading ? (
                  <div className="flex justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : filteredVideos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVideos.map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-gray-500 dark:text-gray-400">No videos found in this category yet.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default Learn;
