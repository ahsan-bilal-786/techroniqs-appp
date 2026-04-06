import { Employee, Project, Task, FinanceRecord, DailyReport } from '../types';

export const mockEmployees: Employee[] = [
  {
    id: 'emp-1',
    name: 'Ahsan Bilal',
    email: 'engr.ahsan.bilal@gmail.com',
    role: 'Senior Software Engineer',
    department: 'Engineering',
    status: 'active',
    joinedAt: '2023-01-15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahsan',
    designation: 'Senior Full Stack Developer',
    nicNumber: '35202-1234567-1',
    contactNumber: '+92 300 1234567',
    permanentAddress: 'House #123, Street #4, Model Town, Lahore',
    currentAddress: 'Apartment #5B, Gulberg Heights, Lahore',
    nicFront: 'https://picsum.photos/seed/nicfront/400/250',
    nicBack: 'https://picsum.photos/seed/nicback/400/250',
    personalEmail: 'engr.ahsan.bilal@gmail.com',
    linkedinProfile: 'https://linkedin.com/in/ahsanbilal',
    githubProfile: 'https://github.com/ahsanbilal',
    bankName: 'Habib Bank Limited (HBL)',
    vehicleNumber: 'LEC-1234',
    ibanNumber: 'PK70HABB0012345678901234',
    dateOfBirth: '1995-05-20',
    salary: 'PKR 250,000',
    technicalSkills: ['React', 'TypeScript', 'Node.js', 'Flutter', 'Firebase', 'PostgreSQL', 'Tailwind CSS', 'Docker']
  },
  {
    id: 'emp-2',
    name: 'Sarah Khan',
    email: 'sarah.khan@techroniqs.com',
    role: 'Product Manager',
    department: 'Product',
    status: 'active',
    joinedAt: '2023-03-10',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    designation: 'Product Lead',
    nicNumber: '35202-7654321-2',
    contactNumber: '+92 321 7654321',
    permanentAddress: 'House #456, DHA Phase 5, Lahore',
    currentAddress: 'House #456, DHA Phase 5, Lahore',
    personalEmail: 'sarah.khan.personal@gmail.com',
    bankName: 'Meezan Bank',
    ibanNumber: 'PK12MEZN0098765432109876',
    dateOfBirth: '1996-08-12',
    salary: 'PKR 200,000',
    technicalSkills: ['Product Strategy', 'Agile', 'Scrum', 'Jira', 'Market Research']
  },
  {
    id: 'emp-3',
    name: 'Zain Ahmed',
    email: 'zain.ahmed@techroniqs.com',
    role: 'UI/UX Designer',
    department: 'Design',
    status: 'active',
    joinedAt: '2023-05-20',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zain',
    designation: 'Senior UI/UX Designer',
    nicNumber: '35202-1122334-3',
    contactNumber: '+92 333 1122334',
    permanentAddress: 'House #789, Johar Town, Lahore',
    currentAddress: 'House #789, Johar Town, Lahore',
    personalEmail: 'zain.ahmed.design@gmail.com',
    bankName: 'Bank Alfalah',
    ibanNumber: 'PK45ALFH0011223344556677',
    dateOfBirth: '1997-11-05',
    salary: 'PKR 180,000',
    technicalSkills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Visual Design']
  }
];

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Global Logistics Platform',
    client: 'LogiCorp',
    description: 'A scalable logistics management system for international shipping.',
    status: 'active',
    progress: 65,
    startDate: '2024-01-01',
    team: ['emp-1', 'emp-2', 'emp-3'],
    budget: 150000,
    spent: 95000
  },
  {
    id: 'proj-2',
    name: 'Techroniqs ERP Internal',
    client: 'Internal',
    description: 'Our own modular ERP system to automate workflows.',
    status: 'active',
    progress: 30,
    startDate: '2024-03-01',
    team: ['emp-1', 'emp-2'],
    budget: 50000,
    spent: 12000
  }
];

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    projectId: 'proj-1',
    title: 'Implement OAuth2 Flow',
    status: 'in-progress',
    priority: 'high',
    assigneeId: 'emp-1',
    dueDate: '2024-04-10',
    createdAt: '2024-04-01'
  },
  {
    id: 'task-2',
    projectId: 'proj-1',
    title: 'Design Dashboard UI',
    status: 'done',
    priority: 'medium',
    assigneeId: 'emp-3',
    dueDate: '2024-04-05',
    createdAt: '2024-03-25'
  },
  {
    id: 'task-3',
    projectId: 'proj-2',
    title: 'Setup Firebase Auth',
    status: 'todo',
    priority: 'high',
    assigneeId: 'emp-1',
    dueDate: '2024-04-15',
    createdAt: '2024-04-01'
  }
];

export const mockFinance: FinanceRecord[] = [
  {
    id: 'fin-1',
    type: 'income',
    category: 'Project Payment',
    amount: 25000,
    date: '2024-03-15',
    description: 'Milestone 2 payment for LogiCorp',
    projectId: 'proj-1'
  },
  {
    id: 'fin-2',
    type: 'expense',
    category: 'SaaS Subscription',
    amount: 1200,
    date: '2024-03-20',
    description: 'AWS Monthly Bill'
  }
];

export const mockReports: DailyReport[] = [
  {
    id: 'rep-1',
    employeeId: 'emp-1',
    date: '2024-04-05',
    tasksCompleted: ['task-2'],
    tasksInProgress: ['task-1'],
    blockers: 'Waiting for API documentation from client.',
    hoursWorked: 8,
    submittedAt: '2024-04-05T18:30:00Z'
  }
];
