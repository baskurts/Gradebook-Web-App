// src/modules/Dashboard/index.js
import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import { getCourses, getStudents, getAssignments } from "../../db";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const coursesData = await getCourses();
      const studentsData = await getStudents();
      const assignmentsData = await getAssignments();

      setCourses(coursesData);
      setStudents(studentsData);
      setAssignments(assignmentsData);
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Total Courses" bordered={false}>
            {courses.length}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Total Students" bordered={false}>
            {students.length}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Total Assignments" bordered={false}>
            {assignments.length}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
