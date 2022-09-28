import { Timeline } from "antd";
import React, { useMemo } from "react";
import useBoradgame from "../../hooks/useBoardgame";
import BoardgameComment from "./BoardgameComment";
import NewComment from "./NewComment";
import { SmileOutlined } from "@ant-design/icons";

const colors = ["#00CCFF", "#e91e63", "orange"];

const BoardgameWrap = () => {
  const { boardgames } = useBoradgame();

  const getColor = useMemo(() => {
    return (index: number) => {
      return colors[index % 3];
    };
  }, []);

  return (
    <div style={{ backgroundColor: "ivory", padding: '40px 20px 20px' }}>
      <Timeline>
        <Timeline.Item color="green" dot={<SmileOutlined />}>
          <NewComment />
        </Timeline.Item>
        {boardgames &&
          boardgames.map((bg, index) => (
            <Timeline.Item color={getColor(index)} dot={<SmileOutlined />}>
              <BoardgameComment
                boardgame={bg.fields}
                createdAt={bg.sys.createdAt}
              />
            </Timeline.Item>
          ))}
      </Timeline>
    </div>
  );
};

export default BoardgameWrap;
