/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectForm from './pages/ProjectForm';
import Tasks from './pages/Tasks';
import TaskForm from './pages/TaskForm';
import Reports from './pages/Reports';
import People from './pages/People';
import MemberDetail from './pages/MemberDetail';
import InviteMember from './pages/InviteMember';
import Finance from './pages/Finance';
import TransactionForm from './pages/TransactionForm';
import Automation from './pages/Automation';
import Attendance from './pages/Attendance';
import Leaves from './pages/Leaves';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="leaves" element={<Leaves />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="projects/new" element={<ProjectForm />} />
          <Route path="projects/edit/:id" element={<ProjectForm />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="tasks/new" element={<TaskForm />} />
          <Route path="tasks/edit/:id" element={<TaskForm />} />
          <Route path="reports" element={<Reports />} />
          <Route path="people" element={<People />} />
          <Route path="people/invite" element={<InviteMember />} />
          <Route path="people/:id" element={<MemberDetail />} />
          <Route path="finance" element={<Finance />} />
          <Route path="finance/new" element={<TransactionForm />} />
          <Route path="automation" element={<Automation />} />
        </Route>
      </Routes>
    </Router>
  );
}

