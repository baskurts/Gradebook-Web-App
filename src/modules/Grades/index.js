import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../db";
import { Card, Table, InputNumber, Select, Button, message } from "antd";

const { Option } = Select;

const Grades = () => {
  const { assignmentId } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const assignmentData = await db.assignments.get(Number(assignmentId));
      setAssignment(assignmentData);

      const allGrades = await db.grades
        .where({ assignmentId: Number(assignmentId) })
        .toArray();
      setGrades(allGrades);

      const allStudents = await db.students
        .where({ courseId: assignmentData.courseId })
        .toArray();
      setStudents(allStudents);
    };

    fetchData();
  }, [assignmentId]);

  const addGrade = async () => {
    if (!selectedStudentId || score < 0) {
      message.error("Please select a student and enter a valid score.");
      return;
    }

    const newGrade = {
      assignmentId: Number(assignmentId),
      studentId: selectedStudentId,
      score,
    };

    await db.grades.add(newGrade);
    const updatedGrades = await db.grades
      .where({ assignmentId: Number(assignmentId) })
      .toArray();
    setGrades(updatedGrades);
    setSelectedStudentId(null);
    setScore(0);
    message.success("Grade added successfully.");
  };

  const handleDelete = async (record) => {
    await db.grades.delete(record.id);
    const updatedGrades = await db.grades
      .where({ assignmentId: Number(assignmentId) })
      .toArray();
    setGrades(updatedGrades);
    message.success("Grade deleted.");
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "studentId",
      render: (id) => students.find((s) => s.id === id)?.fullName || "Unknown",
    },
    {
      title: "Email",
      dataIndex: "studentId",
      render: (id) => students.find((s) => s.id === id)?.email || "",
    },
    {
      title: "Score",
      dataIndex: "score",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button danger onClick={() => handleDelete(record)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Card title={`Grades for ${assignment?.name || "Assignment"}`} style={{ margin: 20 }}>
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <Select
          placeholder="Select Student"
          style={{ flex: 2 }}
          value={selectedStudentId || undefined}
          onChange={setSelectedStudentId}
        >
          {students.map((student) => (
            <Option key={student.id} value={student.id}>
              {student.fullName}
            </Option>
          ))}
        </Select>
        <InputNumber
          placeholder="Score"
          min={0}
          max={assignment?.totalPoints || 100}
          value={score}
          onChange={setScore}
          style={{ flex: 1 }}
        />
        <Button type="primary" onClick={addGrade}>
          Submit Grade
        </Button>
      </div>
      <Table
        dataSource={grades}
        columns={columns}
        rowKey={(record) => `${record.assignmentId}-${record.studentId}`}
      />
    </Card>
  );
};

export default Grades;