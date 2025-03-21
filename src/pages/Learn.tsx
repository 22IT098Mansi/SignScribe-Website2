
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { supabase, Video } from '@/lib/supabase';
import VideoCard from '@/components/VideoCard';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const Learn: React.FC = () => {
  const { user } = useAuth();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        
        // Replace with actual Supabase database query once you've set up the database
        // For now, we'll use mock data
        const mockVideos: Video[] = [
          {
            id: '1',
            title: 'Introduction to Sign Language',
            description: 'Learn the basics of sign language with this beginner-friendly tutorial.',
            url: 'https://example.com/video1',
            thumbnail: 'https://images.unsplash.com/photo-1608403890284-86f353d83d49',
            category: 'basics',
            level: 'beginner',
            duration: 320,
            created_at: new Date().toISOString(),
          },
          {
            id: '2',
            title: 'Common Phrases in Sign Language',
            description: 'Master everyday phrases that will help you communicate effectively.',
            url: 'https://example.com/video2',
            thumbnail: 'https://images.unsplash.com/photo-1588710277537-126980e8d44e',
            category: 'phrases',
            level: 'beginner',
            duration: 480,
            created_at: new Date().toISOString(),
          },
          {
            id: '3',
            title: 'ASL Alphabet Mastery',
            description: 'Learn to sign every letter in the alphabet with perfect form.',
            url: 'https://example.com/video3',
            thumbnail: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c',
            category: 'alphabet',
            level: 'beginner',
            duration: 420,
            created_at: new Date().toISOString(),
          },
          {
            id: '4',
            title: 'Numbers and Counting in Sign Language',
            description: 'Master numbers from 1-100 and learn counting techniques.',
            url: 'https://example.com/video4',
            thumbnail: 'https://images.unsplash.com/photo-1567177662154-dfeb4c93b6ae',
            category: 'numbers',
            level: 'beginner',
            duration: 280,
            created_at: new Date().toISOString(),
          },
          {
            id: '5',
            title: 'Intermediate Conversational Signs',
            description: 'Take your signing to the next level with more complex conversational patterns.',
            url: 'https://example.com/video5',
            thumbnail: 'https://images.unsplash.com/photo-1607748851687-ba9a10438621',
            category: 'conversation',
            level: 'intermediate',
            duration: 560,
            created_at: new Date().toISOString(),
          },
          {
            id: '6',
            title: 'Advanced Expression Techniques',
            description: 'Learn to convey emotions and complex ideas through facial expressions and body language.',
            url: 'https://example.com/video6',
            thumbnail: 'https://images.unsplash.com/photo-1580130732478-4e339fb1172f',
            category: 'expressions',
            level: 'advanced',
            duration: 620,
            created_at: new Date().toISOString(),
          },
        ];
        
        // In a real application, you would fetch from Supabase like this:
        // const { data, error } = await supabase
        //  .from('videos')
        //  .select('*')
        //  .order('created_at', { ascending: false });
        
        // if (error) throw error;
        // setVideos(data || []);
        
        setVideos(mockVideos);
      } catch (error) {
        console.error('Error fetching videos:', error);
        toast.error('Failed to load videos');
      } finally {
        setLoading(false);
      }
    };
    
    fetchVideos();
  }, []);
  
  if (!user) {
    return <Navigate to="/signin" />;
  }
  
  const filteredVideos = activeCategory === 'all' 
    ? videos 
    : videos.filter(video => video.category === activeCategory);
  
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
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Learn Sign Language</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our comprehensive collection of sign language tutorials and lessons.
              From beginner basics to advanced conversations, we have everything you need to become fluent.
            </p>
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
