import React, { useState } from 'react';
import { db } from '../db';
import { useLiveQuery } from 'dexie-react-hooks';

function CourseList() {
  const [newCourse, setNewCourse] = useState('');
  const courses = useLiveQuery(() => db.courses.toArray(), []);

  const addCourse = async () => {
    if (newCourse.trim() === '') return;
    await db.courses.add({ name: newCourse });
    setNewCourse('');
  };

  const deleteCourse = async (id) => {
    await db.courses.delete(id);
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
        {courses?.map(course => (
          <li key={course.id}>
            {course.name} <button className="delete" onClick={() => deleteCourse(course.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList;
