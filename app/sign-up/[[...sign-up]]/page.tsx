import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'
import { BookOpen, Sparkles, Brain, Zap, Check } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200/30 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-200/20 dark:bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Back to Home Link */}
      <Link 
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors z-10"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </Link>

      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Branding & Benefits */}
        <div className="hidden lg:flex flex-col space-y-8 pr-12">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 text-3xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                S
              </div>
              Studia
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              Start Your Learning Journey
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Join thousands of students using AI to study smarter, not harder.
            </p>
          </div>

          {/* Benefits List */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-gray-700 dark:text-gray-300">Free to start - No credit card required</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-gray-700 dark:text-gray-300">Unlimited AI-powered note generation</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-gray-700 dark:text-gray-300">Create summaries, flashcards & quizzes</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-gray-700 dark:text-gray-300">Upload PDFs and text documents</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-gray-700 dark:text-gray-300">Access your history anytime, anywhere</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-gray-700 dark:text-gray-300">Export notes as PDF</span>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-3 group">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm">Smart Summaries</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">AI-powered</div>
              </div>
            </div>

            <div className="flex items-start gap-3 group">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm">Flashcards</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Interactive</div>
              </div>
            </div>

            <div className="flex items-start gap-3 group">
              <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Brain className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm">Quiz Mode</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Test yourself</div>
              </div>
            </div>

            <div className="flex items-start gap-3 group">
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm">Fast Results</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">In seconds</div>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 italic mb-3">
              "Studia transformed how I study. Creating flashcards used to take hours, now it's done in seconds!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold">
                JD
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">Jessica Davis</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Medical Student</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                <div className="w-8 h-8 bg-linear-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white text-lg font-bold">
                  S
                </div>
                Studia
              </Link>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-2">Create Your Account</h2>
              <p className="text-gray-600 dark:text-gray-400">Start learning smarter today</p>
            </div>

            {/* Clerk Sign Up Component */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8">
              <SignUp 
                appearance={{
                  elements: {
                    rootBox: "mx-auto",
                    card: "bg-transparent shadow-none",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton: "bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600",
                    formButtonPrimary: "bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
                    footerActionLink: "text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300",
                    formFieldInput: "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600",
                    identityPreviewEditButton: "text-purple-600 dark:text-purple-400"
                  }
                }}
              />
            </div>

            {/* Additional Links */}
            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link href="/sign-in" className="font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
                Sign in
              </Link>
            </div>

            {/* Terms */}
            <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-500">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}