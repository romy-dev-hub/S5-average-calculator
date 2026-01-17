'use client';

import { motion } from 'framer-motion';
import { SemesterResult } from '@/types';
import { Trophy, Target, Scale, TrendingUp } from 'lucide-react';
import AnimatedNumber from './AnimatedNumber';

interface ResultsPanelProps {
  results: SemesterResult;
}

export default function ResultsPanel({ results }: ResultsPanelProps) {
  const getStatusColor = (average: number) => {
    if (average >= 16) return 'from-green-400 to-emerald-600';
    if (average >= 14) return 'from-blue-400 to-cyan-600';
    if (average >= 12) return 'from-yellow-400 to-amber-600';
    return 'from-red-400 to-pink-600';
  };

  const getStatusText = (average: number) => {
    if (average >= 16) return 'Excellent! 🎉';
    if (average >= 14) return 'Very Good! 👍';
    if (average >= 12) return 'Good! ✅';
    if (average > 0) return 'Needs Improvement 📈';
    return 'Enter your grades';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl p-8 border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <Trophy className="text-yellow-500" />
        Semester S5 Results
      </h2>
      
      <div className="grid grid-cols-1 gap-4 mb-8">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-white p-4 sm:p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="text-blue-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-700 text-sm sm:text-base">Simple Average</h3>
          </div>
          <div className="text-3xl font-bold text-gray-800">
            <AnimatedNumber value={results.moduleAverage} />
            <span className="text-lg text-gray-500"> /20</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">Average of all modules</p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-white p-4 sm:p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Scale className="text-purple-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-700 text-sm sm:text-base">Weighted Average</h3>
          </div>
          <div className="text-3xl font-bold text-gray-800">
            <AnimatedNumber value={results.weightedAverage} />
            <span className="text-lg text-gray-500"> /20</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">Considering coefficients</p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          className={`bg-gradient-to-r ${getStatusColor(results.weightedAverage)} p-4 sm:p-6 rounded-xl shadow-sm text-white`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <TrendingUp size={24} />
            </div>
            <h3 className="font-semibold text-sm sm:text-base">Semester Average</h3>
          </div>
          <div className="text-3xl font-bold">
            <AnimatedNumber value={results.semesterAverage} />
            <span className="text-lg opacity-80"> /20</span>
          </div>
          <p className="text-sm opacity-90 mt-2">{getStatusText(results.weightedAverage)}</p>
        </motion.div>
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-4">Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Coefficient Weight:</span>
            <span className="font-semibold">22</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Modules with grades:</span>
            <span className="font-semibold">7</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Status:</span>
            <span className={`font-semibold ${results.weightedAverage >= 10 ? 'text-green-600' : 'text-red-600'}`}>
              {results.weightedAverage >= 10 ? 'Passing 🎓' : 'At Risk ⚠️'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}