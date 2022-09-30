import { MessageOutlined, ToolOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, Spin } from "antd";
import React, { useState, Suspense } from "react";
import "./App.scss";
import BoardgameWrap from "./components/Boardgame/BoardgameWrap";
import GroupWrap from "./components/Group/GroupWrap";
import Member from "./components/Member/Member";
import useStore from "./hooks/useStore";

const { Header, Content, Sider } = Layout;
const DEFAULT_MENU_KEY = "1";

const App = () => {
  const [selctedMenuKey, setSelctedMenuKey] = useState(DEFAULT_MENU_KEY);
  const [collapsed, setCollapsed] = useState(false);
  const { loading } = useStore();
  const items = [
    { key: 1, label: "게임 평가", icon: <MessageOutlined /> },
    { key: 2, label: "그룹", icon: <UsergroupAddOutlined /> },
    { key: 3, label: "멤버", icon: <UserOutlined /> },
    { key: 4, label: "TODO", icon: <ToolOutlined /> },
  ];

  const handleOnMenuSelect = ({
    item,
    key,
    keyPath,
    selectedKeys,
    domEvent,
  }: any) => {
    setSelctedMenuKey(key);
  };

  return (
    <Suspense fallback={<Spin tip="Loading..."></Spin>}>
      <Layout style={{ minHeight: '100vh', backgroundColor: 'white' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
            <div className="logo">보드카</div>
            <Menu theme="dark" defaultSelectedKeys={[DEFAULT_MENU_KEY]} mode="inline" items={items} onSelect={handleOnMenuSelect} />
          </Sider>
          <Layout className="site-layout" style={{height: '100%', backgroundColor: 'white'}}>
            <Content style={{ height: '100%'}}>
              {selctedMenuKey === "1" && <BoardgameWrap />}
              {selctedMenuKey === "2" && <GroupWrap />}
              {selctedMenuKey === "3" && <Member />}
              {selctedMenuKey === "4" && <div><div>멤버 간판</div><div>게임 별로 평가보기</div><div>날짜 별로 게임한거 보기</div><div>또 있나..?</div></div>}
            </Content>
          </Layout>
      </Layout>
    </Suspense>
  );
};

export default App;
