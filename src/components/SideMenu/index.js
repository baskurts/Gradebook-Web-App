import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const SideMenu = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: '/dashboard',
      label: 'Dashboard',
    },
    {
      key: '/courses',
      label: 'Courses',
    },
    {
      key: '/students',
      label: 'Students',
    },
    {
      key: '/assignments',
      label: 'Assignments',
    }
  ];

  return (
    <Menu
      items={menuItems}
      onClick={(menuItem) => navigate(menuItem.key)}
    />
  );
};

export default SideMenu;