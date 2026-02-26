/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRightIcon,
  AcademicCapIcon,
  SparklesIcon,
  UserIcon,
  UserPlusIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import calc from "../../assets/calc.png";
import showcase2 from "../../assets/showcase2.png";
import showcase1 from "../../assets/showcase1.png";
import { cn } from "@/lib/utils";
// import { apiConnector } from "../../Services/api";
import { useAuth } from "@/contexts/AuthContext";
import CountUp from 'react-countup'







const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -5 }}
    transition={{ duration: 0.3 }}
    className="group bg-gray-800/80 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-emerald-500/50 hover:bg-gray-750 relative overflow-hidden backdrop-blur-sm"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <Icon className="w-12 h-12 text-emerald-500 mb-4 group-hover:text-teal-400 group-hover:scale-110 transition-all duration-300 relative z-10" />
    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-100 transition-colors duration-300 relative z-10">{title}</h3>
    <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 relative z-10">{description}</p>
  </motion.div>
);

const StatCard = ({
  icon: Icon,
  value,
  label,
}: {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  value: number;
  label: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gray-800/60 bg-opacity-30 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-emerald-400/50 flex flex-col items-center hover:border-emerald-300/70 transition-colors duration-300"
  >
    <Icon className="w-12 h-12 text-emerald-400 mb-4" />
    <motion.span
      className="text-4xl font-bold text-white mb-2"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <CountUp end={value} duration={4} enableScrollSpy scrollSpyOnce/>+
    </motion.span>
    <span className="text-gray-300">{label}</span>
  </motion.div>
);

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -3 }}
    transition={{ duration: 0.3 }}
    className="group bg-gray-700/80 p-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-600 hover:shadow-xl border border-transparent hover:border-emerald-500/30 relative overflow-hidden backdrop-blur-sm"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-100 transition-colors duration-300 relative z-10">{question}</h3>
    <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 relative z-10">{answer}</p>
  </motion.div>
);

const ScrollAnimatedSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false);
  const [userName,setuserName] = useState<(string|undefined)[]>(['Creator','Explorer','innovator']);
  const [currentname,setcurrentname] = useState(0);
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {

    if(isAuthenticated && user && user.name){
      setuserName((prev) => {return [...prev,user.name?.split(' ')[0]]})
    }

  },[isAuthenticated,user])

  useEffect(() => {

      
      const intervalId = setInterval(() => {
         setcurrentname((prev) => (prev+1)%userName.length);
      },2000)

      return () => {
        clearInterval(intervalId)
      };


  },[userName])



  useEffect(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white">
      {/* Modern Enhanced Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900/95 via-slate-800/90 to-gray-900/95 backdrop-blur-xl border-b border-emerald-500/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Enhanced Logo Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center space-x-4"
            >
              <div className="relative group">
                {/* Main Logo Container */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 group-hover:rotate-0 transition-all duration-500 hover:scale-110">
                  {/* SVG Logo */}
                  <img 
                    src="/logo.svg" 
                    alt="SnapSolver Logo" 
                    className="w-full h-full rounded-2xl"
                  />
                </div>
                {/* Glow Effect */}
                <div className="absolute inset-0 w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              </div>
              
              <div className="relative">
                <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-400 text-transparent bg-clip-text tracking-tight">
                  SnapSolver
                </h1>
              </div>
            </motion.div>

            {/* Auth Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center space-x-4"
            >
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  {/* Canvas Button */}
                  <Link to="/canvas">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.5)" }}
                      whileTap={{ scale: 0.98 }}
                      className="group bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-cyan-600 text-white px-6 py-2.5 rounded-2xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center space-x-2 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      <span>🎨</span>
                      <span className="hidden sm:inline relative z-10">Open Canvas</span>
                      <span className="sm:hidden">Canvas</span>
                    </motion.button>
                  </Link>

                  {/* User Dropdown */}
                  <div className="relative group">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2.5 border border-white/20 hover:border-white/30 transition-all duration-300 shadow-lg"
                    >
                      <div className="w-9 h-9 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div className="hidden md:block text-left">
                        <p className="text-white font-medium text-sm">{user?.name || userName[currentname]}</p>
                        <p className="text-emerald-200/60 text-xs">{user?.email}</p>
                      </div>
                      <svg className="w-4 h-4 text-emerald-200 group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.button>

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 top-full mt-2 w-64 bg-gray-900/95 backdrop-blur-xl border border-emerald-500/30 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="p-4">
                        {/* User Info */}
                        <div className="flex items-center space-x-3 pb-4 border-b border-emerald-500/20">
                          <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                          <div>
                            <p className="text-white font-semibold">{user?.name || userName[currentname]}</p>
                            <p className="text-emerald-200/70 text-sm">{user?.email}</p>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-3 space-y-1">
                          <Link to="/canvas" className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-white/10 transition-colors duration-200 group/item">
                            <span className="text-lg">🎨</span>
                            <span className="text-white group-hover/item:text-emerald-300">Open Canvas</span>
                          </Link>
                        </div>

                        {/* Logout Button */}
                        <div className="pt-3 border-t border-emerald-500/20">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={logout}
                            className="w-full flex items-center space-x-3 px-3 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 rounded-xl transition-all duration-200 group/logout"
                          >
                            <span className="text-lg">👋</span>
                            <span className="text-red-200 group-hover/logout:text-white font-medium">Sign Out</span>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-2.5 rounded-2xl font-medium backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
                    >
                      Login
                    </motion.button>
                  </Link>
                  
                  <Link to="/register">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)" }}
                      whileTap={{ scale: 0.98 }}
                      className="group bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-2.5 rounded-2xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      <span className="relative z-10">Get Started</span>
                    </motion.button>
                  </Link>
                </div>
              )}


            </motion.div>
          </div>
        </div>

        {/* Enhanced glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-transparent to-teal-600/10 pointer-events-none"></div>
      </nav>

      <main className="pt-20">
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl w-full text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600 bg-clip-text text-transparent"
            >
              Revolutionize Your Calculations
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              SnapSolver harnesses the power of AI to transform how you approach mathematics. 
              Draw your equations and get instant solutions.
            </motion.p>
            <Link to={"/canvas"}>
              <motion.button
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg text-lg flex items-center mx-auto space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <span>Start Calculating</span>
                <ArrowRightIcon className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </section>

        <section className="py-20 px-4 bg-gray-800/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Unlock the Power of AI-Driven Mathematics
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Experience cutting-edge features designed to transform your mathematical journey
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={SparklesIcon}
                title="Intelligent Problem Solving"
                description="Our AI analyzes and solves complex mathematical problems, providing step-by-step explanations."
              />
              <FeatureCard
                icon={DocumentChartBarIcon}
                title="Advanced Visualization"
                description="Transform abstract concepts into interactive visual representations for deeper understanding."
              />
              <FeatureCard
                icon={AcademicCapIcon}
                title="Personalized Learning"
                description="Adaptive learning algorithms tailor problems and explanations to your skill level."
              />
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white">
              See SnapSolver in Action
            </h2>
            <div className="space-y-8">
              {/* Enhanced Showcase Card 1 */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
                className="group bg-gray-800/80 rounded-2xl p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-700 hover:border-emerald-500/50 relative overflow-hidden backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="bg-gray-900 rounded-xl overflow-hidden relative z-10">
                  <div className="bg-gray-800 p-2 flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-4 text-sm text-gray-400">SnapSolver Canvas - Advanced Drawing Interface</span>
                  </div>
                  <div className="p-4">
                    <img
                      src={showcase2}
                      alt="SnapSolver Drawing Interface - Modern canvas with floating toolbars, color palette, and real-time equation solving"
                      className="w-full rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Showcase Card 2 */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
                className="group bg-gray-800/80 rounded-2xl p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-700 hover:border-emerald-500/50 relative overflow-hidden backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="bg-gray-900 rounded-xl overflow-hidden relative z-10">
                  <div className="bg-gray-800 p-2 flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-4 text-sm text-gray-400">SnapSolver Results - Centered Solution Display</span>
                  </div>
                  <div className="p-4">
                    <img
                      src={showcase1}
                      alt="SnapSolver Results Interface - Clean solution display with mathematical equations rendered in center"
                      className="w-full rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <ScrollAnimatedSection>
          <section className="py-24 px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-r from-gray-800 via-slate-800 to-gray-800 rounded-3xl p-12 shadow-2xl border border-emerald-500/20"
              >
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-8 md:mb-0 md:mr-8">
                    <h3 className="text-3xl font-bold text-white mb-4">
                      Experience the Future of Calculation
                    </h3>
                    <p className="text-gray-300 mb-6">
                      Join thousands of students and professionals who have
                      transformed their mathematical capabilities with
                      SnapSolver.
                    </p>
                    <Link to={"/canavs"}>
                      <motion.div
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg flex items-center w-fit hover:from-emerald-600 hover:to-teal-600"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                      >
                        Start Free Trial
                        <motion.div
                          animate={{ x: isHovered ? 5 : 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                        >
                          <ArrowRightIcon className="w-5 h-5 ml-2" />
                        </motion.div>
                      </motion.div>
                    </Link>
                  </div>
                  <motion.div
                    animate={{
                      y: [0, -15, 0],
                      transition: { repeat: Infinity, duration: 3 },
                    }}
                    className="w-64 h-64"
                  >
                    <img src={calc} alt="SnapSolver App Interface" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>
        </ScrollAnimatedSection>

        <ScrollAnimatedSection>
          <section className="py-24 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                SnapSolver by the Numbers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard
                  icon={UserIcon}
                  value={1500}
                  label="Website Visitors"
                />
                <StatCard
                  icon={UserPlusIcon}
                  value={800}
                  label="Registered Users"
                />
                <StatCard
                  icon={DocumentChartBarIcon}
                  value={2000}
                  label="Calculations Performed"
                />
              </div>
            </div>
          </section>
        </ScrollAnimatedSection>

        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
                className="group bg-gray-800/80 p-6 rounded-2xl shadow-lg border border-gray-700 hover:border-emerald-500/50 hover:shadow-2xl transition-all duration-300 relative overflow-hidden backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                    "SnapSolver has completely changed how I approach complex calculations. It's like having a brilliant math tutor available 24/7!"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      A
                    </div>
                    <div>
                      <p className="font-semibold text-white">Adarsh Verma</p>
                      <p className="text-gray-400 text-sm">Engineering Student</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial 2 */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
                className="group bg-gray-800/80 p-6 rounded-2xl shadow-lg border border-gray-700 hover:border-emerald-500/50 hover:shadow-2xl transition-all duration-300 relative overflow-hidden backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                    "As a research scientist, I need accurate calculations quickly. SnapSolver's AI-powered solutions have boosted my productivity tremendously!"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      S
                    </div>
                    <div>
                      <p className="font-semibold text-white">Dr. Sarah Chen</p>
                      <p className="text-gray-400 text-sm">Research Scientist</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial 3 */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
                className="group bg-gray-800/80 p-6 rounded-2xl shadow-lg border border-gray-700 hover:border-emerald-500/50 hover:shadow-2xl transition-all duration-300 relative overflow-hidden backdrop-blur-sm md:col-span-2 lg:col-span-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                    "Teaching mathematics became so much easier with SnapSolver. My students love the interactive approach and visual solutions!"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      M
                    </div>
                    <div>
                      <p className="font-semibold text-white">Mike Rodriguez</p>
                      <p className="text-gray-400 text-sm">High School Math Teacher</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <ScrollAnimatedSection>
          <section className="py-24 px-4 bg-gray-800 flex flex-col items-center justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={cn(
                "md:text-4xl text-xl text-white mb-9"
              )}
            >
              Frequently Asked Questions
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto z-10">
              <FAQItem
                question="How accurate is SnapSolver?"
                answer="Our AI is trained on vast datasets and continuously updated, ensuring high accuracy across various mathematical domains."
              />
              <FAQItem
                question="Can SnapSolver handle advanced mathematics?"
                answer="SnapSolver is equipped to handle problems from basic arithmetic to advanced calculus and beyond."
              />
            </div>
          </section>
        </ScrollAnimatedSection>
      </main>

      <footer className="bg-gray-900 py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold text-emerald-300 mb-2">
              SnapSolver
            </h3>
            <p className="text-gray-400">
              Empowering mathematical minds with AI
            </p>
          </div>
          <nav className="flex gap-8">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Pricing
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
        <div className="mt-8 flex justify-center">
          <div className="bg-gradient-to-r from-emerald-600/20 via-teal-600/20 to-emerald-600/20 backdrop-blur-sm border border-emerald-500/30 rounded-2xl px-6 py-3 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
            <p className="text-emerald-200 font-medium">
              Developed by
              <span className="font-bold text-transparent bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text ml-1">
                Sujay Rana
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
