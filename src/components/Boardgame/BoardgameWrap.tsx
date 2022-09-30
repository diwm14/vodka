import { BookOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Spin, Tabs } from "antd";
import React, { Suspense, useState } from "react";
import BoardgameCommentTimeline from "./BoardgameCommentTimeline";
import BoardgameListWithRate from "./BoardgameListWithRate";

const TAB_KEY_1 = "타임라인";
const TAB_KEY_2 = "게임 별 평가";

const tabList = [
  {key: 1, label: <><ThunderboltOutlined />{TAB_KEY_1}</>, children: <BoardgameCommentTimeline />},
  {key: 2, label: <><BookOutlined />{TAB_KEY_2}</>, children: <BoardgameListWithRate />},
];

const BoardgameWrap = () => {
  const [tabkey, setTabkey] = useState(TAB_KEY_1);

  const onTabChange = (key: string) => {
    setTabkey(key);
  };

  return (
    <Suspense fallback={<Spin tip="Loading..."></Spin>}>
      <div style={{padding: '40px', backgroundColor: 'ivory', minHeight: '100vh'}}>
       <Tabs
          size={'large'}
          type="card"
          onChange={onTabChange}
          defaultActiveKey="1"
          items={tabList}
        />
      </div>
    </Suspense>
  );
};

export default BoardgameWrap;
