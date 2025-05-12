import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Courses from '../../modules/Courses';
import Students from '../../modules/Students';
import Assignments from '../../modules/Assignments';
import Dashboard from '../../modules/Dashboard';
import CourseStudents from "../../modules/CourseStudents";
import CourseAssignments from "../../modules/CourseAssignments";
import Grades from "../../modules/Grades";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/students" element={<Students />} />
      <Route path="/assignments" element={<Assignments />} />
      <Route path="/courses/:courseId/students" element={<CourseStudents />} />
      <Route path="courses/:id/assignments" element={<CourseAssignments />} />
      <Route path="/assignments/:assignmentId/grades" element={<Grades />} />
    </Routes>
  );
};

export default AppRoutes;