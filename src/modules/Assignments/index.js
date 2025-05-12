import React, { useEffect, useState } from "react";
import { Card, Input, Button, Select, Table, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { db } from '../../db';
import { useNavigate } from "react-router-dom";


const { Option } = Select;

const Assignments = () => {
  const navigate = useNavigate();
  const [assignmentName, setAssignmentName] = useState("");
  const [totalPoints, setTotalPoints] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const courseList = await db.courses.toArray();
      const assignmentList = await db.assignments.toArray();
      setCourses(courseList);
      setAssignments(assignmentList);
    };
    fetchData();
  }, []);

  const handleAddAssignment = async () => {
    if (!assignmentName || !totalPoints || !selectedCourseId) {
      message.warning("Please fill in all fields.");
      return;
    }

    const id = await db.assignments.add({
      name: assignmentName,
      totalPoints: Number(totalPoints),
      courseId: selectedCourseId,
    });

    setAssignments([
      ...assignments,
      { id, name: assignmentName, totalPoints: Number(totalPoints), courseId: selectedCourseId },
    ]);

    setAssignmentName("");
    setTotalPoints("");
    setSelectedCourseId(null);
  };

  const handleDelete = async (id) => {
    await db.assignments.delete(id);
    setAssignments(assignments.filter((a) => a.id !== id));
  };

  const columns = [
    { title: "Assignment", dataIndex: "name", key: "name" },
    { title: "Total Points", dataIndex: "totalPoints", key: "totalPoints" },
    {
      title: "Course",
      dataIndex: "courseId",
      key: "courseId",
      render: (courseId) => courses.find((c) => c.id === courseId)?.name || "Unknown",
    },
    {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <>
        <Button
          type="link"
          onClick={() => navigate(`/assignments/${record.id}/grades`)}
        >
          View Grades
        </Button>
        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
          <Button danger icon={<DeleteOutlined />}>Delete</Button>
        </Popconfirm>
      </>
    ),
  },
];

  return (
    <Card title="Assignments" style={{ margin: 20 }}>
      <Select
        placeholder="Select Course"
        value={selectedCourseId}
        onChange={(value) => setSelectedCourseId(value)}
        style={{ width: "100%", marginBottom: 10 }}
      >
        {courses.map((course) => (
          <Option key={course.id} value={course.id}>
            {course.name}
          </Option>
        ))}
      </Select>
      <Input
        placeholder="Assignment name"
        value={assignmentName}
        onChange={(e) => setAssignmentName(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <Input
        placeholder="Total points"
        type="number"
        value={totalPoints}
        onChange={(e) => setTotalPoints(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <Button type="primary" onClick={handleAddAssignment} block>
        Add Assignment
      </Button>

      <Table
        dataSource={assignments}
        columns={columns}
        rowKey="id"
        style={{ marginTop: 20 }}
      />
    </Card>
  );
};

export default Assignments;