import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Table } from "antd";
import { db } from "../../db";

const CourseAssignments = () => {
  const { id } = useParams(); // courseId
  const [assignments, setAssignments] = useState([]);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const courseData = await db.courses.get(Number(id));
      const assignmentData = await db.assignments
        .where("courseId")
        .equals(Number(id))
        .toArray();

      setCourse(courseData);
      setAssignments(assignmentData);
    };

    loadData();
  }, [id]);

  const columns = [
    {
      title: "Assignment",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Total Points",
      dataIndex: "totalPoints",
      key: "totalPoints",
    },
  ];

  return (
    <Card title={`Assignments in ${course?.name || "Course"}`}>
      <Table
        columns={columns}
        dataSource={assignments}
        rowKey="id"
        pagination={false}
      />
    </Card>
  );
};

export default CourseAssignments;