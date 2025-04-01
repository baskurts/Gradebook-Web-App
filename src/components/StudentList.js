import React, { useState } from 'react';

function StudentList({ students, setStudents }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const addStudent = () => {
    if (fullName.trim() === '' || email.trim() === '') return;
    setStudents([
      ...students,
      { id: Date.now(), fullname: fullName, email: email }
    ]);
    setFullName('');
    setEmail('');
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  return (
    <div className="section">
      <h2>👤 Students</h2>
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Full name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button className="add" onClick={addStudent}>Add</button>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            {student.fullname} - {student.email}
            <button className="delete" onClick={() => deleteStudent(student.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;