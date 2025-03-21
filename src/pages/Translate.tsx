
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { Camera, Mic, Type, ArrowRight, Info } from 'lucide-react';
import { toast } from 'sonner';

const Translate: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('text-to-sign');
  const [textInput, setTextInput] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [micActive, setMicActive] = useState(false);
  
  if (!user) {
    return <Navigate to="/signin" />;
  }
  
  const handleTextTranslate = () => {
    if (!textInput.trim()) {
      toast.error('Please enter some text to translate');
      return;
    }
    
    setIsTranslating(true);
    
    // Simulate translation process
    setTimeout(() => {
      setIsTranslating(false);
      toast.success('Translation complete!');
    }, 2000);
  };
  
  const toggleCamera = () => {
    if (cameraActive) {
      setCameraActive(false);
      toast.info('Camera turned off');
    } else {
      setCameraActive(true);
      toast.success('Camera activated');
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Sign Language Translator</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Instantly translate between sign language and text with our advanced AI technology.
              Choose your preferred translation method below.
            </p>
          </div>
          
          <Tabs defaultValue="text-to-sign" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-white dark:bg-gray-800 border p-1 shadow-sm">
                <TabsTrigger value="text-to-sign">Text to Sign</TabsTrigger>
                <TabsTrigger value="sign-to-text">Sign to Text</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="text-to-sign">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Enter Text</h3>
                      <textarea
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder="Type the text you want to translate to sign language..."
                        className="w-full h-40 p-3 border rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
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
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Sign Language Output</h3>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-md h-40 flex items-center justify-center border">
                        {isTranslating ? (
                          <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                            <p>Generating sign language...</p>
                          </div>
                        ) : textInput ? (
                          <div className="text-center p-4">
                            <p className="text-gray-500 dark:text-gray-400">
                              {textInput ? "Translation will appear here" : "Enter text to see translation"}
                            </p>
                          </div>
                        ) : (
                          <div className="text-center p-4 flex flex-col items-center text-gray-500 dark:text-gray-400">
                            <Info className="h-8 w-8 mb-2 opacity-50" />
                            <p>Enter text on the left to see the sign language translation</p>
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 flex items-start">
                        <Info className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <p>Our AI will translate your text into an animated sign language video.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="sign-to-text">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Sign Language Input</h3>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-md aspect-video flex items-center justify-center border relative overflow-hidden">
                        {cameraActive ? (
                          <div className="text-center">
                            <div className="absolute inset-0 bg-gray-900/20 flex items-center justify-center">
                              <p className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                                Camera preview (simulated)
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center p-4 flex flex-col items-center text-gray-500 dark:text-gray-400">
                            <Camera className="h-12 w-12 mb-2 opacity-50" />
                            <p>Turn on your camera to begin translation</p>
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-4">
                        <Button
                          onClick={toggleCamera}
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
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Text Output</h3>
                      <div className="bg-white dark:bg-gray-800 rounded-md p-4 h-40 border overflow-y-auto">
                        {cameraActive ? (
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
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default Translate;
