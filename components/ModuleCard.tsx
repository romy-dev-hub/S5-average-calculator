'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Module, ModuleGrades } from '@/types';
import { calculateModuleAverage } from '@/utils/calculations';
import { Calculator, ChevronDown, ChevronUp } from 'lucide-react';
import AnimatedNumber from './AnimatedNumber';

interface ModuleCardProps {
  module: Module;
  grades: ModuleGrades;
  onGradeChange: (id: string, grades: ModuleGrades) => void;
}

export default function ModuleCard({ module, grades, onGradeChange }: ModuleCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const moduleAverage = calculateModuleAverage(module, grades);
  const isValid = moduleAverage > 0 && moduleAverage <= 20;

  const handleGradeChange = (field: keyof ModuleGrades, value: string) => {
    // Replace comma with period to handle mobile keyboards that use comma as decimal separator
    const normalizedValue = value.replace(',', '.');

    // Only allow valid numeric input (empty, or valid number between 0-20)
    if (normalizedValue === '' || normalizedValue === '.') {
      onGradeChange(module.id, { ...grades, [field]: undefined });
      return;
    }

    // Check if it's a valid number format
    if (!/^\d*\.?\d*$/.test(normalizedValue)) {
      return; // Invalid format, don't update
    }

    const numValue = parseFloat(normalizedValue);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 20) {
      onGradeChange(module.id, { ...grades, [field]: numValue });
    }
  };

  const getCalculationFormula = () => {
    switch (module.calculationType) {
      case 'network':
        return 'TP × 0.4 + Exam × 0.6';
      case 'os2':
      case 'compilation':
        return '((TP + TD) ÷ 2) × 0.4 + Exam × 0.6';
      case 'se':
      case 'graph':
        return 'TD × 0.4 + Exam × 0.6';
      default:
        return 'Exam';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-xl shadow-lg p-4 sm:p-6 ${isValid ? 'bg-green-50/30' : ''}`}
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{module.name}</h3>
          <div className="flex items-center gap-4 mt-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              Coef: {module.coefficient}
            </span>
            <div className="flex items-center gap-2 text-gray-600">
              <Calculator size={16} />
              <span className="text-sm">{getCalculationFormula()}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-4">
        {module.hasTP && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">TP Note</label>
            <input
              type="text"
              inputMode="decimal"
              pattern="[0-9]*[.,]?[0-9]*"
              value={grades.tp ?? ''}
              onChange={(e) => handleGradeChange('tp', e.target.value)}
              className="w-full px-3 sm:px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-400 transition-colors"
              placeholder="0-20"
            />
          </div>
        )}

        {module.hasTD && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">TD Note</label>
            <input
              type="text"
              inputMode="decimal"
              pattern="[0-9]*[.,]?[0-9]*"
              value={grades.td ?? ''}
              onChange={(e) => handleGradeChange('td', e.target.value)}
              className="w-full px-3 sm:px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-400 transition-colors"
              placeholder="0-20"
            />
          </div>
        )}

        {module.hasExam && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Exam Note</label>
            <input
              type="text"
              inputMode="decimal"
              pattern="[0-9]*[.,]?[0-9]*"
              value={grades.exam ?? ''}
              onChange={(e) => handleGradeChange('exam', e.target.value)}
              className="w-full px-3 sm:px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-400 transition-colors"
              placeholder="0-20"
            />
          </div>
        )}
      </div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-4 pt-4 border-t border-gray-200"
        >
          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>Calculation:</strong> {getCalculationFormula()}</p>
            <p><strong>Current Values:</strong> TP: {grades.tp || 'N/A'}, TD: {grades.td || 'N/A'}, Exam: {grades.exam || 'N/A'}</p>
          </div>
        </motion.div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
        <div>
          <span className="text-sm text-gray-600">Module Average:</span>
          <div className="flex items-center gap-2">
            <div className={`text-2xl font-bold ${isValid ? 'text-green-600' : 'text-gray-400'}`}>
              {isValid ? (
                <AnimatedNumber value={moduleAverage} />
              ) : (
                '--.--'
              )}
            </div>
            <span className="text-gray-500">/20</span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-sm text-gray-600">Weighted:</span>
          <div className="text-lg font-semibold text-blue-600">
            {isValid ? (
              <AnimatedNumber value={moduleAverage * module.coefficient} />
            ) : (
              '--.--'
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}