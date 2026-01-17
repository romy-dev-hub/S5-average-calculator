export interface Module {
  id: string;
  name: string;
  coefficient: number;
  hasTP: boolean;
  hasTD: boolean;
  hasExam: boolean;
  calculationType: 'network' | 'os2' | 'compilation' | 'se' | 'graph' | 'info' | 'english';
  weights?: {
    tp?: number;
    td?: number;
    exam: number;
  };
}

export interface ModuleGrades {
  id: string;
  tp?: number;
  td?: number;
  exam?: number;
}

export interface SemesterResult {
  moduleAverage: number;
  weightedAverage: number;
  semesterAverage: number;
}