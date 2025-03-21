
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { ArrowRight, BookOpen, Languages } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="relative pt-24 pb-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute left-[35%] top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute right-[15%] bottom-[20%] h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24">
        <div className="flex flex-col lg:flex-row items-center max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0 px-4"
          >
            <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
              Breaking barriers in communication
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Bridging The Gap Through{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Sign Language
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
              Learn sign language and translate in real-time with our cutting-edge technology powered by AI.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
              {user ? (
                <>
                  <Button asChild size="lg" className="rounded-full font-medium px-6 shadow-lg shadow-blue-500/25">
                    <Link to="/learn">
                      Start Learning <BookOpen className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full font-medium px-6">
                    <Link to="/translate">
                      Try Translation <Languages className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild size="lg" className="rounded-full font-medium px-6 shadow-lg shadow-blue-500/25">
                    <Link to="/signup">
                      Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full font-medium px-6">
                    <Link to="/signin">
                      Sign In
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 px-4"
          >
            <div className="relative mx-auto max-w-lg">
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur-xl opacity-30 transform -rotate-6"></div>
              <div className="relative z-10 bg-white dark:bg-gray-900 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden p-2">
                <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span className="text-sm">Sign language video preview</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Stats or trust points */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center max-w-5xl mx-auto"
        >
          {[
            { label: "Users", value: "10,000+" },
            { label: "Signs", value: "5,000+" },
            { label: "Languages", value: "10+" },
            { label: "Accuracy", value: "98%" },
          ].map((stat, index) => (
            <div key={index} className="hover-scale">
              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
