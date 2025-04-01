import React, { useState } from 'react';
import CourseList from './components/CourseList';
import StudentList from './components/StudentList';
import AssignmentList from './components/AssignmentList';
import './App.css';

function App() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);

  return (
    <div className="App">
      <h1>📚 Gradebook Dashboard</h1>
      <CourseList courses={courses} setCourses={setCourses} />
      <StudentList students={students} setStudents={setStudents} />
      <AssignmentList assignments={assignments} setAssignments={setAssignments} />
    </div>
  );
}

export default App;