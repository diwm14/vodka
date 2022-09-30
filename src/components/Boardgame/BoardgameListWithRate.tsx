import { List } from "antd";
import React from "react";
import useBoardgame from "../../hooks/useBoardgame";
import BoardgameWithRate from "./BoardgameWithRate";

const BoardgameListWithRate = () => {
  const { commentWithGroup } = useBoardgame();
  console.log(commentWithGroup);
  return (
    <List
      style={{ backgroundColor: "white" }}
      bordered={true}
      itemLayout="vertical"
      size="small"
      pagination={{
        showTotal: (total: number) => `Total ${total} items`,
        pageSize: 5,
      }}
      dataSource={commentWithGroup as any[]}
      renderItem={(item) => (
        <BoardgameWithRate item={item} />
      )}
    />
  );
};

export default BoardgameListWithRate;
