
import React from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <Features />
        
        {/* Testimonials section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                What Our Users Are Saying
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-600 dark:text-gray-300"
              >
                Discover how SignScribe is making a difference in people's lives around the world.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  quote: "SignScribe has transformed how I communicate with my deaf students. The translation feature is incredibly accurate.",
                  author: "Dr. Sarah Johnson",
                  role: "Professor of Linguistics"
                },
                {
                  quote: "Learning sign language was always on my bucket list, but I never found the right platform until SignScribe. The tutorials are engaging and easy to follow.",
                  author: "Mark Williams",
                  role: "Software Engineer"
                },
                {
                  quote: "As someone who was born deaf, I appreciate how SignScribe is making sign language more accessible to everyone.",
                  author: "Emily Chen",
                  role: "Disability Rights Advocate"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-4 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-lg">★</span>
                      ))}
                    </div>
                    <p className="italic mb-6 flex-grow text-gray-600 dark:text-gray-300">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Start Your Sign Language Journey Today
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl mb-10 text-blue-100"
              >
                Join thousands of users already learning and communicating with SignScribe.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  <Link to="/signup">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Link to="/learn">
                    Explore Lessons
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">SignScribe</h3>
              <p className="text-gray-400 mb-4">Breaking barriers in communication through innovative sign language technology.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
            {[
              {
                title: "Learn",
                links: ["Tutorials", "Courses", "Practice", "Resources"]
              },
              {
                title: "Company",
                links: ["About", "Careers", "Blog", "Contact"]
              },
              {
                title: "Legal",
                links: ["Terms", "Privacy", "Cookies", "Licenses"]
              }
            ].map((column, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-400 text-center">
            <p>© {new Date().getFullYear()} SignScribe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
