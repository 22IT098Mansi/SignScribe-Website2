
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Languages, Video, Award, RotateCcw, Users } from 'lucide-react';

const features = [
  {
    title: "Comprehensive Learning",
    description: "Access a wide range of sign language tutorials from basic to advanced levels. Learn at your own pace with our structured curriculum.",
    icon: <BookOpen className="h-10 w-10 text-blue-500" />,
  },
  {
    title: "Real-time Translation",
    description: "Our AI-powered translation system converts sign language to text and vice versa with impressive accuracy and minimal delay.",
    icon: <Languages className="h-10 w-10 text-blue-500" />,
  },
  {
    title: "Video Tutorials",
    description: "Watch high-quality video tutorials from expert signers to perfect your form and understand nuances of sign language.",
    icon: <Video className="h-10 w-10 text-blue-500" />,
  },
  {
    title: "Practice Exercises",
    description: "Reinforce your learning with interactive exercises designed to improve your sign language proficiency over time.",
    icon: <RotateCcw className="h-10 w-10 text-blue-500" />,
  },
  {
    title: "Certification",
    description: "Earn certificates as you progress through different levels of sign language proficiency to showcase your skills.",
    icon: <Award className="h-10 w-10 text-blue-500" />,
  },
  {
    title: "Community Support",
    description: "Connect with fellow learners and native signers to practice your skills and gain cultural insights.",
    icon: <Users className="h-10 w-10 text-blue-500" />,
  },
];

const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Why Choose <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">SignScribe</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            Our platform combines cutting-edge technology with expert teaching to make learning sign language accessible and effective for everyone.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 hover-scale"
            >
              <div className="rounded-full w-16 h-16 flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
