import { Module, ModuleGrades, SemesterResult } from '@/types';

export const calculateModuleAverage = (module: Module, grades: ModuleGrades): number => {
  const { tp, td, exam } = grades;
  
  switch (module.calculationType) {
    case 'network':
      return tp && exam ? (tp * 0.4) + (exam * 0.6) : 0;
    
    case 'os2':
    case 'compilation':
      if (tp && td && exam) {
        return ((tp + td) / 2) * 0.4 + exam * 0.6;
      }
      return 0;
    
    case 'se':
    case 'graph':
      return td && exam ? (td * 0.4) + (exam * 0.6) : 0;
    
    case 'info':
    case 'english':
      return exam || 0;
    
    default:
      return 0;
  }
};

export const calculateSemesterAverage = (
  modules: Module[], 
  allGrades: Record<string, ModuleGrades>
): SemesterResult => {
  let totalWeightedSum = 0;
  let totalCoefficient = 0;
  const moduleAverages: number[] = [];

  modules.forEach(module => {
    const grades = allGrades[module.id] || {};
    const moduleAverage = calculateModuleAverage(module, grades);
    
    if (moduleAverage > 0) {
      moduleAverages.push(moduleAverage);
      totalWeightedSum += moduleAverage * module.coefficient;
      totalCoefficient += module.coefficient;
    }
  });

  const weightedAverage = totalCoefficient > 0 ? totalWeightedSum / totalCoefficient : 0;
  const semesterAverage = moduleAverages.length > 0 
    ? moduleAverages.reduce((sum, avg) => sum + avg, 0) / moduleAverages.length 
    : 0;

  return {
    moduleAverage: semesterAverage,
    weightedAverage,
    semesterAverage: weightedAverage, // Typically weighted average is the semester average
  };
};