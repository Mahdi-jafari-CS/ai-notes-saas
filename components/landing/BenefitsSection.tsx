"use client";

import { motion } from "framer-motion";
import { CheckCircle, Star } from "lucide-react";

const benefits = [
  "Save hours of study time",
  "Improve retention rates",
  "Personalized learning experience",
  "Track your progress",
  "Study smarter, not harder",
  "Access anywhere, anytime",
];

export function BenefitsSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Students
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Love Us
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of students who have transformed their study habits
              and achieved better results.
            </p>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 shrink-0" />
                  <span className="text-lg dark:text-gray-200">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
              <div className="mb-6">
                <Star className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">
                  Student Success Story
                </h3>
                <p className="text-blue-100 mb-4">
                  "StudyNotes AI helped me improve my grades by 30% in just one
                  semester. The flashcards and quizzes made studying so much more
                  efficient!"
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold">JD</span>
                  </div>
                  <div>
                    <div className="font-semibold">Jessica Davis</div>
                    <div className="text-sm text-blue-100">
                      Computer Science Student
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
