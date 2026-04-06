export type ProjectStatus = 'active' | 'on-hold' | 'completed' | 'archived';
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done' | 'blocked';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar?: string;
  status: 'active' | 'inactive';
  joinedAt: string;
  designation: string;
  nicNumber: string;
  contactNumber: string;
  permanentAddress: string;
  currentAddress: string;
  nicFront?: string;
  nicBack?: string;
  personalEmail: string;
  linkedinProfile?: string;
  githubProfile?: string;
  bankName: string;
  vehicleNumber?: string;
  ibanNumber: string;
  dateOfBirth: string;
  salary: string;
  technicalSkills: string[];
}

export interface Project {
  id: string;
  name: string;
  client: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  startDate: string;
  endDate?: string;
  team: string[]; // Employee IDs
  budget?: number;
  spent?: number;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  assigneeId?: string;
  dueDate?: string;
  createdAt: string;
}

export interface DailyReport {
  id: string;
  employeeId: string;
  date: string;
  tasksCompleted: string[];
  tasksInProgress: string[];
  blockers?: string;
  hoursWorked: number;
  submittedAt: string;
}

export interface FinanceRecord {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: string;
  description: string;
  projectId?: string;
}
