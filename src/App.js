import { Layout, Image } from "antd";
import SideMenu from "./components/SideMenu";
import AppRoutes from "./components/AppRoutes";


const { Sider, Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Sider style={{ height: "100vh", backgroundColor: "white" }}>
        <Image
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Gradebook Logo"
          preview={false} 
          height={100}
          width={100}
        />
        <SideMenu />
      </Sider>

      <Layout>
        <Content>
          <AppRoutes />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Gradebook Dashboard ©2025
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;