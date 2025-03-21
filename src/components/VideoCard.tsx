
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video } from '@/lib/supabase';
import { Play, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  // Format duration from seconds to minutes and seconds
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handlePractice = () => {
    // Extract YouTube video ID from URL if it's a YouTube URL
    const url = new URL(video.url);
    if (url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be')) {
      let videoId;
      if (url.hostname.includes('youtube.com')) {
        videoId = new URLSearchParams(url.search).get('v');
      } else {
        // youtu.be format
        videoId = url.pathname.slice(1);
      }
      
      if (videoId) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        window.open(embedUrl, '_blank');
      } else {
        window.open(video.url, '_blank');
      }
    } else {
      window.open(video.url, '_blank');
    }
    
    toast.success('Opening practice video');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col bg-white dark:bg-gray-800 border-0 shadow-lg">
        <div className="relative overflow-hidden">
          <div className="aspect-video bg-gray-100 dark:bg-gray-700 relative">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <Button 
                variant="default" 
                size="icon" 
                className="rounded-full bg-white/90 text-black hover:bg-white"
                onClick={handlePractice}
              >
                <Play className="h-5 w-5" />
              </Button>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {formatDuration(video.duration)}
            </div>
            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md">
              {video.level}
            </div>
            {video.completed && (
              <div className="absolute top-2 right-2">
                <CheckCircle className="h-5 w-5 text-green-500 fill-white" />
              </div>
            )}
          </div>
        </div>

        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-lg font-semibold line-clamp-1">{video.title}</CardTitle>
        </CardHeader>

        <CardContent className="p-4 pt-2">
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{video.description}</p>
        </CardContent>

        <CardFooter className="p-4 pt-0 mt-auto">
          <Button className="w-full" onClick={handlePractice}>
            Practice Now
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default VideoCard;
