'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Award, Target, BarChart3, Star, Zap } from 'lucide-react';
import AnimatedNumber from './AnimatedNumber';

interface AverageDisplayProps {
  title: string;
  value: number;
  maxValue?: number;
  description?: string;
  type?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  showIcon?: boolean;
  precision?: number;
}

const typeConfig = {
  primary: {
    gradient: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50',
    icon: TrendingUp,
    iconColor: 'text-blue-600',
  },
  secondary: {
    gradient: 'from-purple-500 to-pink-500',
    bg: 'bg-purple-50',
    icon: BarChart3,
    iconColor: 'text-purple-600',
  },
  success: {
    gradient: 'from-green-500 to-emerald-500',
    bg: 'bg-green-50',
    icon: Award,
    iconColor: 'text-green-600',
  },
  warning: {
    gradient: 'from-yellow-500 to-amber-500',
    bg: 'bg-yellow-50',
    icon: Target,
    iconColor: 'text-yellow-600',
  },
  danger: {
    gradient: 'from-red-500 to-orange-500',
    bg: 'bg-red-50',
    icon: Zap,
    iconColor: 'text-red-600',
  },
};

export default function AverageDisplay({
  title,
  value,
  maxValue = 20,
  description,
  type = 'primary',
  showIcon = true,
  precision = 2,
}: AverageDisplayProps) {
  const config = typeConfig[type];
  const Icon = config.icon;
  const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
  
  const getPerformanceLabel = () => {
    if (percentage >= 90) return 'Excellent';
    if (percentage >= 80) return 'Very Good';
    if (percentage >= 70) return 'Good';
    if (percentage >= 60) return 'Average';
    if (percentage >= 50) return 'Below Average';
    if (value > 0) return 'Needs Improvement';
    return 'No Data';
  };

  const getPerformanceColor = () => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    if (value > 0) return 'text-red-600';
    return 'text-gray-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className={`relative overflow-hidden rounded-2xl p-6 ${config.bg} border border-gray-200 shadow-lg`}
    >
      {/* Background gradient effect (replaces inline style with utility class) */}
      <motion.div
        className="absolute inset-0 opacity-10 bg-shine"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear",
        }}
      />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {showIcon && (
              <div className={`p-3 rounded-xl ${config.iconColor.replace('text', 'bg')} bg-opacity-20`}>
                <Icon size={24} className={config.iconColor} />
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          </div>
          
          <motion.div
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className={`px-3 py-1 rounded-full ${getPerformanceColor()} ${getPerformanceColor().replace('text', 'bg')} bg-opacity-20 text-sm font-medium`}
          >
            {getPerformanceLabel()}
          </motion.div>
        </div>

        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="text-4xl md:text-5xl font-bold text-gray-900"
            >
              <AnimatedNumber value={value} precision={precision} />
            </motion.div>
            <span className="text-gray-500 text-lg">/ {maxValue}</span>
          </div>
          
          {description && (
            <p className="text-gray-600 text-sm mt-2">{description}</p>
          )}
        </div>

        {/* Progress bar */}
        <div className="relative">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(percentage, 100)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full bg-gradient-to-r ${config.gradient} rounded-full`}
            />
          </div>
          
          {/* Percentage label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-between items-center mt-2"
          >
            <span className="text-sm text-gray-600">Progress</span>
            <div className="flex items-center gap-2">
              <motion.span
                key={percentage}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="font-semibold text-gray-800"
              >
                {percentage.toFixed(1)}%
              </motion.span>
              {percentage >= 60 && (
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 2,
                    times: [0, 0.25, 0.75, 1]
                  }}
                >
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Additional info based on value */}
        {value > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ delay: 0.3 }}
            className="mt-4 pt-4 border-t border-gray-300 border-opacity-30"
          >
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-gray-600">Equivalent</div>
                <div className="font-semibold text-gray-800">
                  {(value / 4).toFixed(1)}/5
                </div>
              </div>
              <div className="text-center">
                <div className="text-gray-600">Grade Point</div>
                <div className="font-semibold text-gray-800">
                  {(value / 2).toFixed(1)}/10
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Decorative elements */}
      {value >= maxValue * 0.8 && (
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity }
          }}
          className="absolute -right-4 -bottom-4 w-24 h-24 opacity-5"
        >
          <Star className="w-full h-full" />
        </motion.div>
      )}
    </motion.div>
  );
}