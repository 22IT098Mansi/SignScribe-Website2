
import React from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { Info, Users, BookOpen, Award, GitFork } from 'lucide-react';

const About: React.FC = () => {
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">About ISL Translator</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Learn about our mission to make Indian Sign Language accessible to everyone.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-10">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              ISL Translator is dedicated to bridging the communication gap between the deaf community 
              and the hearing world through technology. We believe that language should never be a barrier 
              to understanding and connection.
            </p>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our platform leverages cutting-edge AI technology to translate between Indian Sign Language 
              and text, making communication more accessible for everyone. Whether you're learning ISL 
              for personal or professional reasons, or need to communicate with someone who uses sign 
              language, our tools are designed to help.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 dark:bg-green-800 p-3 rounded-full">
                    <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold ml-4">Inclusivity</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  We're committed to making digital spaces more inclusive for the deaf and 
                  hard-of-hearing community through accessible technology.
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 dark:bg-green-800 p-3 rounded-full">
                    <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold ml-4">Education</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Our comprehensive learning modules make it easy for anyone to learn 
                  Indian Sign Language, regardless of prior experience.
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 dark:bg-green-800 p-3 rounded-full">
                    <Info className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold ml-4">Awareness</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  We aim to raise awareness about ISL and deaf culture, promoting 
                  understanding and appreciation across different communities.
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 dark:bg-green-800 p-3 rounded-full">
                    <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold ml-4">Innovation</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  We continuously improve our technology to make sign language 
                  translation more accurate and accessible.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Our Technology</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              The ISL Translator uses advanced computer vision and machine learning algorithms to 
              recognize and interpret Indian Sign Language gestures. Our text-to-sign translation 
              is powered by a comprehensive database of sign language videos created by native signers.
            </p>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
              <h3 className="text-xl font-bold mb-4">Get Involved</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We welcome contributions from developers, sign language experts, and anyone passionate 
                about accessibility. If you'd like to contribute to our project or have suggestions for 
                improvement, please contact us.
              </p>
              
              <div className="flex justify-center mt-6">
                <a 
                  href="#" 
                  className="inline-flex items-center px-4 py-2 border border-green-500 text-green-600 rounded-md hover:bg-green-50 dark:hover:bg-green-900/20"
                >
                  <GitFork className="mr-2 h-5 w-5" />
                  Contribute to Project
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default About;
