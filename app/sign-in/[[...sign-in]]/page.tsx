import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'
import { BookOpen, Sparkles, Brain, Zap } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-200/20 dark:bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Back to Home Link */}
      <Link 
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors z-10"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </Link>

      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Branding & Features */}
        <div className="hidden lg:flex flex-col space-y-8 pr-12">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                S
              </div>
              Studia
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              Welcome Back!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Sign in to continue your learning journey with AI-powered study tools.
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-6">
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Transform Your Notes</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Upload text or PDFs and generate summaries instantly</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">AI-Powered Learning</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Create flashcards and quizzes automatically</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6 text-pink-600 dark:text-pink-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Study Smarter</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Access your history and track your progress</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Lightning Fast</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Get results in seconds with advanced AI</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">10K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">50K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Notes Generated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">4.9★</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Rating</div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-lg font-bold">
                  S
                </div>
                Studia
              </Link>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-2">Welcome Back!</h2>
              <p className="text-gray-600 dark:text-gray-400">Sign in to your account</p>
            </div>

            {/* Clerk Sign In Component */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8">
              <SignIn 
                appearance={{
                  elements: {
                    rootBox: "mx-auto",
                    card: "bg-transparent shadow-none",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton: "bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600",
                    formButtonPrimary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
                    footerActionLink: "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300",
                    formFieldInput: "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600",
                    identityPreviewEditButton: "text-blue-600 dark:text-blue-400"
                  }
                }}
              />
            </div>

            {/* Additional Links */}
            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link href="/sign-up" className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                Sign up for free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}