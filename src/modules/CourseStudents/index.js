import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Table } from "antd";
import { db } from "../../db";

const CourseStudents = () => {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const course = await db.courses.get(Number(courseId));
      setCourseName(course?.name || `#${courseId}`);

      const allStudents = await db.students.where("courseId").equals(Number(courseId)).toArray();
      setStudents(allStudents);
    };

    loadData();
  }, [courseId]);

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  return (
    <Card title={`Students in ${courseName}`} style={{ margin: 20 }}>
      <Table dataSource={students} columns={columns} rowKey="id" pagination={false} />
    </Card>
  );
};

export default CourseStudents;