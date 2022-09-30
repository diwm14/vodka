import React, { useMemo } from 'react'
import { Timeline } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import NewComment from './NewComment'
import BoardgameComment from './BoardgameComment'
import useBoardgame from '../../hooks/useBoardgame'

const colors = ["#00CCFF", "#e91e63", "orange"];

const BoardgameCommentTimeline = () => {
    const { boardgames } = useBoardgame();

    console.log(boardgames)

    const getColor = useMemo(() => {
        return (index: number) => {
          return colors[index % 3];
        };
      }, []);

    return (
        <div style={{ backgroundColor: "ivory", padding: "40px 20px 20px" }}>
        <Timeline>
          <Timeline.Item color="green" dot={<SmileOutlined />}>
            <NewComment />
          </Timeline.Item>
          {boardgames &&
            boardgames.map((bg, index) => (
              <Timeline.Item
                key={index}
                color={getColor(index)}
                dot={<SmileOutlined />}
              >
                <BoardgameComment
                  boardgame={bg.fields}
                  createdAt={bg.sys.createdAt}
                />
              </Timeline.Item>
            ))}
        </Timeline>
      </div>
    )
}

export default BoardgameCommentTimeline
