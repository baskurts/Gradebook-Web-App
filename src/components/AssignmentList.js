import React, { useState } from 'react';
import { db } from '../db';
import { useLiveQuery } from 'dexie-react-hooks';

function AssignmentList() {
  const [assignmentName, setAssignmentName] = useState('');
  const [totalPoints, setTotalPoints] = useState('');
  const assignments = useLiveQuery(() => db.assignments.toArray(), []);

  const addAssignment = async () => {
    if (assignmentName.trim() === '' || totalPoints.trim() === '') return;
    await db.assignments.add({ name: assignmentName, totalPoints: Number(totalPoints) });
    setAssignmentName('');
    setTotalPoints('');
  };

  const deleteAssignment = async (id) => {
    await db.assignments.delete(id);
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
        {assignments?.map(assign => (
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