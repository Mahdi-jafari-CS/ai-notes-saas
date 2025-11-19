"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Sparkles,
  FileText,
  Zap,
  BookOpen,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description:
      "Transform your notes into interactive study materials with advanced AI technology.",
  },
  {
    icon: Sparkles,
    title: "Smart Flashcards",
    description:
      "Automatically generate flashcards from your notes to enhance memory retention.",
  },
  {
    icon: FileText,
    title: "Interactive Quizzes",
    description:
      "Create custom quizzes instantly to test your knowledge and track progress.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Get results in seconds with our optimized AI processing engine.",
  },
  {
    icon: BookOpen,
    title: "PDF Support",
    description:
      "Upload PDFs and convert them into structured, digestible study notes.",
  },
  {
    icon: Clock,
    title: "Study History",
    description:
      "Access your complete study history and track your learning journey.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful Features for
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Smarter Learning
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to transform your study sessions and achieve
            academic excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
