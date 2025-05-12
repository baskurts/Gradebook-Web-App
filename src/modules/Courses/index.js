import { useEffect, useState } from "react";
import { Card, Input, Button, List } from "antd";
import { useNavigate } from "react-router-dom";
import { db } from "../../db";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadCourses = async () => {
      const allCourses = await db.courses.toArray();
      setCourses(allCourses);
    };
    loadCourses();
  }, []);

  const addCourse = async () => {
    if (courseName.trim() === "") return;
    const id = await db.courses.add({ name: courseName });
    setCourses([...courses, { id, name: courseName }]);
    setCourseName("");
  };

  const deleteCourse = async (id) => {
    await db.courses.delete(id);
    setCourses(courses.filter((course) => course.id !== id));
  };

  return (
    <Card title="Courses" style={{ margin: 20 }}>
      <Input
        placeholder="Course name"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <Button type="primary" onClick={addCourse} style={{ marginBottom: 20 }}>
        Add Course
      </Button>
      <List
        bordered
        dataSource={courses}
        renderItem={(course) => (
          <List.Item
            actions={[
              <Button onClick={() => navigate(`/courses/${course.id}/students`)}>
                View Students
              </Button>,
              <Button onClick={() => navigate(`/courses/${course.id}/assignments`)}>
                View Assignments
              </Button>,
              <Button type="text" danger onClick={() => deleteCourse(course.id)}>
                Delete
              </Button>,
            ]}
          >
            {course.name}
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Courses;