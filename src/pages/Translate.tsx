
import React, { useState, useRef, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { Camera, Mic, Type, ArrowRight, Info, Search } from 'lucide-react';
import { toast } from 'sonner';
import { signDictionary } from '@/lib/supabase';

const Translate: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('sign-to-text');
  const [textInput, setTextInput] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const [showVideoEmbed, setShowVideoEmbed] = useState(false);
  const [videoId, setVideoId] = useState('');

  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    // Automatically request camera access when component mounts
    if (activeTab === 'sign-to-text') {
      handleCameraToggle();
    }
  }, []);
  
  if (!user) {
    return <Navigate to="/signin" />;
  }

  const handleCameraToggle = async () => {
    if (cameraActive) {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setCameraActive(false);
      toast.info('Camera turned off');
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraActive(true);
        toast.success('Camera activated');
      } catch (error) {
        console.error('Error accessing camera:', error);
        toast.error('Could not access camera. Please check permissions.');
      }
    }
  };
  
  const toggleMic = () => {
    if (micActive) {
      setMicActive(false);
      toast.info('Microphone turned off');
    } else {
      setMicActive(true);
      toast.success('Microphone activated');
    }
  };

  const handleTextTranslate = () => {
    if (!textInput.trim()) {
      toast.error('Please enter some text to translate');
      return;
    }
    
    setIsTranslating(true);
    
    // Check if the input text (case insensitive) matches any entry in our dictionary
    const lowercaseInput = textInput.toLowerCase().trim();
    const videoId = signDictionary[lowercaseInput];
    
    // Simulate translation process
    setTimeout(() => {
      setIsTranslating(false);
      if (videoId) {
        setVideoId(videoId);
        setShowVideoEmbed(true);
        toast.success('Translation found!');
      } else {
        setShowVideoEmbed(false);
        toast.error('Sorry, this phrase is not in our dictionary yet.');
      }
    }, 1500);
  };

  const handleSignToTextTranslate = () => {
    if (cameraActive) {
      // Simulate sign language recognition
      setTimeout(() => {
        const randomPhrases = [
          "Hello",
          "Thank you",
          "How are you?",
          "Nice to meet you",
          "My name is"
        ];
        const randomPhrase = randomPhrases[Math.floor(Math.random() * randomPhrases.length)];
        setTranslatedText(randomPhrase);
        toast.success('Sign recognized!');
      }, 2000);
    } else {
      toast.error('Please turn on your camera first');
    }
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
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Indian Sign Language Translator</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Instantly translate between Indian Sign Language and text with our advanced AI technology.
              Choose your preferred translation method below.
            </p>
          </div>
          
          <Tabs defaultValue="sign-to-text" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-white dark:bg-gray-800 border p-1 shadow-sm">
                <TabsTrigger value="sign-to-text">Sign to Text</TabsTrigger>
                <TabsTrigger value="text-to-sign">Text to Sign</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="sign-to-text">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Sign Language Input</h3>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-md aspect-video flex items-center justify-center border relative overflow-hidden">
                        {cameraActive ? (
                          <video
                            ref={videoRef}
                            autoPlay
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center p-4 flex flex-col items-center text-gray-500 dark:text-gray-400">
                            <Camera className="h-12 w-12 mb-2 opacity-50" />
                            <p>Turn on your camera to begin translation</p>
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-4">
                        <Button
                          onClick={handleCameraToggle}
                          variant={cameraActive ? "destructive" : "default"}
                          className="flex-1"
                        >
                          <Camera className="mr-2 h-4 w-4" />
                          {cameraActive ? "Turn Off Camera" : "Turn On Camera"}
                        </Button>
                        <Button
                          onClick={toggleMic}
                          variant={micActive ? "destructive" : "outline"}
                          className="flex-1"
                        >
                          <Mic className="mr-2 h-4 w-4" />
                          {micActive ? "Turn Off Mic" : "Turn On Mic"}
                        </Button>
                      </div>
                      {cameraActive && (
                        <Button 
                          onClick={handleSignToTextTranslate}
                          className="w-full"
                        >
                          <Search className="mr-2 h-4 w-4" />
                          Recognize Sign
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Text Output</h3>
                      <div className="bg-white dark:bg-gray-800 rounded-md p-4 h-40 border overflow-y-auto">
                        {translatedText ? (
                          <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
                            {translatedText}
                          </p>
                        ) : cameraActive ? (
                          <p className="text-gray-600 dark:text-gray-300">
                            Start signing to see the translation here...
                          </p>
                        ) : (
                          <div className="h-full flex items-center justify-center">
                            <div className="text-center text-gray-500 dark:text-gray-400">
                              <Type className="h-8 w-8 mx-auto mb-2 opacity-50" />
                              <p>Turn on camera to begin translating sign language to text</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 flex items-start">
                        <Info className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <p>Our AI will analyze your signs in real-time and convert them to text.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="text-to-sign">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Enter Text</h3>
                      <textarea
                        value={textInput}
                        onChange={(e) => {
                          // Limit to a short phrase
                          if (e.target.value.length <= 50) {
                            setTextInput(e.target.value);
                          }
                        }}
                        placeholder="Type a short word or phrase (max 50 characters)..."
                        className="w-full h-40 p-3 border rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                        maxLength={50}
                      />
                      <div className="text-xs text-gray-500 text-right">
                        {textInput.length}/50 characters
                      </div>
                      <Button 
                        onClick={handleTextTranslate} 
                        className="w-full"
                        disabled={isTranslating || !textInput.trim()}
                      >
                        {isTranslating ? (
                          <>Translating...</>
                        ) : (
                          <>
                            Translate to Sign Language <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                      <div className="text-sm text-green-600">
                        <p>Try these words: hello, thank you, please, sorry, good morning, help</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Sign Language Output</h3>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-md aspect-video flex items-center justify-center border overflow-hidden">
                        {isTranslating ? (
                          <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500 mb-2"></div>
                            <p>Generating sign language...</p>
                          </div>
                        ) : showVideoEmbed ? (
                          <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <div className="text-center p-4 flex flex-col items-center text-gray-500 dark:text-gray-400">
                            <Info className="h-8 w-8 mb-2 opacity-50" />
                            <p>Enter text on the left to see the sign language translation</p>
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 flex items-start">
                        <Info className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <p>Our system will translate your text into an ISL video demonstration.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default Translate;
