import React, { useState, useEffect } from "react";
import { Card, Input, Button, Select} from 'antd';
import { db } from '../../db';
import { Table } from 'antd';

const { Option } = Select;

const Students = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  // Verileri yükle
  useEffect(() => {
    const loadData = async () => {
      const loadedStudents = await db.students.toArray();
      const loadedCourses = await db.courses.toArray();
      setStudents(loadedStudents);
      setCourses(loadedCourses);
    };
    loadData();
  }, []);

  const addStudent = async () => {
    if (!fullName.trim() || !email.trim() || !selectedCourse) return;

    const newStudent = {
      fullName: fullName,
      email,
      courseId: selectedCourse,
    };
    const id = await db.students.add(newStudent);
    setStudents([...students, { ...newStudent, id }]);

    setFullName('');
    setEmail('');
    setSelectedCourse('');
  };

  const deleteStudent = async (id) => {
    await db.students.delete(id);
    setStudents(students.filter((s) => s.id !== id));
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Course',
      key: 'courseId',
      render: (_, record) => {
        const course = courses.find((c) => c.id === record.courseId);
        return course ? course.name : 'Unknown';
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button danger onClick={() => deleteStudent(record.id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Card title="Students">
      <Select
        placeholder="Select Course"
        style={{ marginBottom: 8, width: '100%' }}
        value={selectedCourse || undefined}
        onChange={(value) => setSelectedCourse(value)}
      >
        {courses.map((course) => (
          <Option key={course.id} value={course.id}>
            {course.name}
          </Option>
        ))}
      </Select>
      <Input
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        style={{ marginBottom: 8 }}
      />
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: 8 }}
      />
      <Button type="primary" onClick={addStudent} block>
        Add Student
      </Button>
      <Table
        dataSource={students}
        columns={columns}
        rowKey="id"
        style={{ marginTop: 20 }}
      />
    </Card>
  );
};

export default Students;
