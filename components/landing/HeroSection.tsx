"use client";

import { motion } from "framer-motion";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import {
  BookOpen,
  Brain,
  Sparkles,
  Zap,
  FileText,
  CheckCircle,
  ArrowRight,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Fixed positions for sparkles to avoid hydration mismatch
  const sparklePositions = [
    { top: "15%", left: "10%" },
    { top: "25%", left: "85%" },
    { top: "40%", left: "5%" },
    { top: "55%", left: "90%" },
    { top: "70%", left: "15%" },
    { top: "80%", left: "75%" },
    { top: "35%", left: "45%" },
    { top: "60%", left: "60%" },
  ];

  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Notebook */}
        <motion.div
          className="absolute top-20 left-10 opacity-15 dark:opacity-30"
          animate={{
            y: [0, -20, 0],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <BookOpen className="w-32 h-32 text-blue-400 dark:text-blue-300" />
        </motion.div>

        {/* Floating Pen */}
        <motion.div
          className="absolute top-40 right-20 opacity-15 dark:opacity-30"
          animate={{
            y: [0, 15, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <svg
            className="w-24 h-24 text-purple-400 dark:text-purple-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M12 19l7-7 3 3-7 7-3-3z" />
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
            <path d="M2 2l7.586 7.586" />
            <circle cx="11" cy="11" r="2" />
          </svg>
        </motion.div>

        {/* Floating Paper Stack */}
        <motion.div
          className="absolute bottom-40 left-20 opacity-15 dark:opacity-30"
          animate={{
            y: [0, -10, 0],
            x: [0, 5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <FileText className="w-28 h-28 text-cyan-400 dark:text-cyan-300" />
        </motion.div>

        {/* Floating Brain/AI */}
        <motion.div
          className="absolute bottom-20 right-10 opacity-15 dark:opacity-30"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Brain className="w-36 h-36 text-pink-400 dark:text-pink-300" />
        </motion.div>

        {/* Sparkles scattered around */}
        {sparklePositions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: position.top,
              left: position.left,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            <Sparkles className="w-6 h-6 text-yellow-400 dark:text-yellow-200" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="text-center"
        >
          <motion.div variants={fadeInUp} className="inline-block mb-4">
            <motion.span
              className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm font-medium"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(59, 130, 246, 0)",
                  "0 0 0 10px rgba(59, 130, 246, 0)",
                  "0 0 0 0 rgba(59, 130, 246, 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            >
              <Sparkles
                className="w-4 h-4 mr-2 animate-spin"
                style={{ animationDuration: "3s" }}
              />
              Powered by Advanced AI
            </motion.span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient"
          >
            Transform Your Notes
            <br />
            Into Study Success
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Generate flashcards, quizzes, and summaries instantly with AI. Study
            smarter and ace your exams.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <SignedOut>
              <SignUpButton mode="modal">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-6 h-auto shadow-xl hover:shadow-2xl transition-shadow"
                  >
                    Start Learning Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-6 h-auto shadow-xl hover:shadow-2xl transition-shadow"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </Link>
            </SignedIn>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 h-auto border-2 hover:bg-blue-50 dark:hover:bg-gray-800"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          {/* AI-Generated Content Preview */}
          <motion.div
            className="mt-20 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="relative max-w-5xl mx-auto">
              {/* Main Interactive Demo Card */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 md:p-12 relative overflow-hidden"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient"></div>

                {/* Animated Gradient Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-pink-900/20"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                ></motion.div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <motion.div
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(59, 130, 246, 0.5)",
                          "0 0 0 10px rgba(59, 130, 246, 0)",
                          "0 0 0 0 rgba(59, 130, 246, 0)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    >
                      <Zap className="w-4 h-4" />
                      <span>One Upload, Multiple Formats</span>
                    </motion.div>
                    <h3 className="text-2xl md:text-3xl font-bold dark:text-white mb-2">
                      AI Transforms Your Notes Into
                    </h3>
                  </div>

                  {/* Output Format Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <motion.div
                      className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40 border border-blue-200 dark:border-blue-700 cursor-pointer"
                      whileHover={{
                        scale: 1.05,
                        y: -5,
                        boxShadow: "0 10px 40px rgba(59, 130, 246, 0.4)",
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <div className="w-12 h-12 mx-auto mb-3 bg-blue-500 rounded-lg flex items-center justify-center">
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                      </motion.div>
                      <h4 className="font-semibold text-sm mb-1 dark:text-white">
                        Flashcards
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Q&A Format
                      </p>
                    </motion.div>

                    <motion.div
                      className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/40 dark:to-purple-800/40 border border-purple-200 dark:border-purple-700 cursor-pointer"
                      whileHover={{
                        scale: 1.05,
                        y: -5,
                        boxShadow: "0 10px 40px rgba(168, 85, 247, 0.4)",
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.15, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <div className="w-12 h-12 mx-auto mb-3 bg-purple-500 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                      </motion.div>
                      <h4 className="font-semibold text-sm mb-1 dark:text-white">
                        Quizzes
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Test Yourself
                      </p>
                    </motion.div>

                    <motion.div
                      className="text-center p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/40 dark:to-orange-800/40 border border-amber-200 dark:border-amber-700 cursor-pointer"
                      whileHover={{
                        scale: 1.05,
                        y: -5,
                        boxShadow: "0 10px 40px rgba(245, 158, 11, 0.4)",
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        animate={{
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5,
                        }}
                      >
                        <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                      </motion.div>
                      <h4 className="font-semibold text-sm mb-1 dark:text-white">
                        Summaries
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Key Points
                      </p>
                    </motion.div>

                    <motion.div
                      className="text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/40 dark:to-emerald-800/40 border border-green-200 dark:border-green-700 cursor-pointer"
                      whileHover={{
                        scale: 1.05,
                        y: -5,
                        boxShadow: "0 10px 40px rgba(34, 197, 94, 0.4)",
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0, type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        animate={{
                          y: [0, -5, 0],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                      </motion.div>
                      <h4 className="font-semibold text-sm mb-1 dark:text-white">
                        Bullet Points
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Organized
                      </p>
                    </motion.div>
                  </div>

                  {/* Bottom CTA */}
                  <motion.div
                    className="mt-8 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      ⚡{" "}
                      <span className="font-semibold">
                        All formats generated in seconds
                      </span>{" "}
                      with one click
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
