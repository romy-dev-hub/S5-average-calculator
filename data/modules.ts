import { Module } from '@/types';

export const modules: Module[] = [
  {
    id: 'network',
    name: 'Network',
    coefficient: 3,
    hasTP: true,
    hasTD: false,
    hasExam: true,
    calculationType: 'network',
    weights: { tp: 0.4, exam: 0.6 }
  },
  {
    id: 'os2',
    name: 'Operating System 2',
    coefficient: 3,
    hasTP: true,
    hasTD: true,
    hasExam: true,
    calculationType: 'os2',
  },
  {
    id: 'compilation',
    name: 'Compilation',
    coefficient: 3,
    hasTP: true,
    hasTD: true,
    hasExam: true,
    calculationType: 'compilation',
  },
  {
    id: 'software-engineering',
    name: 'Software Engineering',
    coefficient: 3,
    hasTP: false,
    hasTD: true,
    hasExam: true,
    calculationType: 'se',
    weights: { td: 0.4, exam: 0.6 }
  },
  {
    id: 'graph-theory',
    name: 'Graph Theory',
    coefficient: 3,
    hasTP: false,
    hasTD: true,
    hasExam: true,
    calculationType: 'graph',
    weights: { td: 0.4, exam: 0.6 }
  },
  {
    id: 'info-extraction',
    name: 'Information Extraction',
    coefficient: 2,
    hasTP: false,
    hasTD: false,
    hasExam: true,
    calculationType: 'info',
  },
  {
    id: 'english3',
    name: 'English 3',
    coefficient: 2,
    hasTP: false,
    hasTD: false,
    hasExam: true,
    calculationType: 'english',
  },
];