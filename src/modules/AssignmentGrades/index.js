import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Table } from "antd";
import { db } from "../../db";

const AssignmentGrades = () => {
  const { assignmentId } = useParams();
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [assignment, setAssignment] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const assignmentData = await db.assignments.get(Number(assignmentId));
      setAssignment(assignmentData);

      const allGrades = await db.grades.where("assignmentId").equals(Number(assignmentId)).toArray();
      setGrades(allGrades);

      const allStudents = await db.students.toArray();
      setStudents(allStudents);
    };
    fetchData();
  }, [assignmentId]);

  const columns = [
    {
      title: "Full Name",
      dataIndex: "studentId",
      key: "studentId",
      render: (studentId) => {
        const student = students.find((s) => s.id === studentId);
        return student ? student.fullName : "Unknown";
      },
    },
    {
      title: "Email",
      dataIndex: "studentId",
      key: "email",
      render: (studentId) => {
        const student = students.find((s) => s.id === studentId);
        return student ? student.email : "";
      },
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
    },
  ];

  return (
    <Card title={`Grades for ${assignment?.name || "Assignment"}`} style={{ margin: 20 }}>
      <Table
        dataSource={grades}
        columns={columns}
        rowKey={(record) => `${record.assignmentId}-${record.studentId}`}
        pagination={false}
      />
    </Card>
  );
};

export default AssignmentGrades;