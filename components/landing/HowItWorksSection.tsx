"use client";

import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Upload Your Content",
    description:
      "Paste your notes or upload PDF files directly to our platform.",
  },
  {
    step: "02",
    title: "AI Magic",
    description:
      "Our AI analyzes your content and generates study materials instantly.",
  },
  {
    step: "03",
    title: "Start Learning",
    description:
      "Access flashcards, quizzes, and summaries tailored to your content.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-20 px-4 bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-800/50 dark:to-gray-900"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Get started in three simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/4 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"></div>

          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center relative"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg relative z-10">
                {item.step}
              </div>
              <h3 className="text-2xl font-semibold mb-3 dark:text-white">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
