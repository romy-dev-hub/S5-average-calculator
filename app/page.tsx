'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { modules } from '@/data/modules';
import { ModuleGrades } from '@/types';
import { calculateSemesterAverage } from '@/utils/calculations';
import ModuleCard from '@/components/ModuleCard';
import ResultsPanel from '@/components/ResultsPanel';
import AboutCreatorModal from '@/components/AboutCreatorModal';
import { Calculator, RefreshCw, Download, User } from 'lucide-react';

export default function Home() {
  const [allGrades, setAllGrades] = useState<Record<string, ModuleGrades>>({});
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const handleGradeChange = (moduleId: string, grades: ModuleGrades) => {
    setAllGrades(prev => ({
      ...prev,
      [moduleId]: grades
    }));
  };

  const handleReset = () => {
    setAllGrades({});
  };

  const handleExport = () => {
    const data = {
      grades: allGrades,
      results: calculateSemesterAverage(modules, allGrades),
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `s5-grades-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const results = calculateSemesterAverage(modules, allGrades);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-3 sm:p-4 md:p-8">
      <AboutCreatorModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <div className="max-w-7xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="text-blue-600" size={48} />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              S5 Semester <span className="text-blue-600">Average</span> Calculator
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-6">
            Calculate your S5 semester average with precision. Enter your grades for each module and watch your results update in real-time.
          </p>
          <button
            onClick={() => setIsAboutOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <User size={18} />
            About Creator
          </button>
        </motion.header>

        <div className="flex flex-col lg:flex-row gap-8">
          <main className="lg:w-1/2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Your Modules</h2>
              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  <RefreshCw size={18} />
                  Reset All
                </button>
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Download size={18} />
                  Export Data
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {modules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ModuleCard
                    module={module}
                    grades={allGrades[module.id] || {}}
                    onGradeChange={handleGradeChange}
                  />
                </motion.div>
              ))}
            </div>
          </main>

          <aside className="lg:w-1/2">
            <ResultsPanel results={results} />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-gray-200"
            >
              <h3 className="font-bold text-gray-800 mb-4">How it works</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                  <span>Enter your grades for each module (0-20)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                  <span>Each module uses its specific calculation formula</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                  <span>The weighted average considers coefficients</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                  <span>Animations show real-time updates</span>
                </li>
              </ul>
            </motion.div>
          </aside>
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm"
        >
          <p>Made with ❤️ for S5 students | All calculations follow your university's grading system</p>
          <p className="mt-2">Enter valid grades between 0 and 20 for accurate results</p>
        </motion.footer>
      </div>
    </div>
  );
}