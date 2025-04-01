import React, { useState } from 'react';

function CourseList({ courses, setCourses }) {
  const [newCourse, setNewCourse] = useState('');

  const addCourse = () => {
    if (newCourse.trim() === '') return;
    setCourses([...courses, { id: Date.now(), name: newCourse }]);
    setNewCourse('');
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  return (
    <div className="section">
      <h2>🎓 Courses</h2>
      <input
        type="text"
        value={newCourse}
        onChange={(e) => setNewCourse(e.target.value)}
        placeholder="Course name"
      />
      <button className="add" onClick={addCourse}>Add</button>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            {course.name} <button className="delete" onClick={() => deleteCourse(course.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList;