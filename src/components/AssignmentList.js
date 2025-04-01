import React, { useState } from 'react';

function AssignmentList({ assignments, setAssignments }) {
  const [assignmentName, setAssignmentName] = useState('');
  const [totalPoints, setTotalPoints] = useState('');

  const addAssignment = () => {
    if (assignmentName.trim() === '' || totalPoints.trim() === '') return;
    setAssignments([
      ...assignments,
      { id: Date.now(), name: assignmentName, totalPoints: Number(totalPoints) }
    ]);
    setAssignmentName('');
    setTotalPoints('');
  };

  const deleteAssignment = (id) => {
    setAssignments(assignments.filter(assign => assign.id !== id));
  };

  return (
    <div className="section">
      <h2>📝 Assignments</h2>
      <input
        type="text"
        value={assignmentName}
        onChange={(e) => setAssignmentName(e.target.value)}
        placeholder="Assignment name"
      />
      <input
        type="number"
        value={totalPoints}
        onChange={(e) => setTotalPoints(e.target.value)}
        placeholder="Total points"
      />
      <button className="add" onClick={addAssignment}>Add</button>
      <ul>
        {assignments.map(assign => (
          <li key={assign.id}>
            {assign.name} - {assign.totalPoints} pts
            <button className="delete" onClick={() => deleteAssignment(assign.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AssignmentList;
