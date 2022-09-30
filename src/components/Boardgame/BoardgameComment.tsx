import { Avatar, Card, Comment, Divider, Tooltip } from 'antd';
import moment from 'moment';
import React from 'react';
import { BoardgameComment as BoardgameCommentType } from "../../types/type";
import DifficultyForm from '../Form/DifficultyForm';
import RateForm from '../Form/RateForm';

interface BoardgameCommentProps {
    boardgame: BoardgameCommentType;
    createdAt: string;
}

const BoardgameComment = ({boardgame, createdAt}: BoardgameCommentProps) => {

    const actions = [
        <div><b>{boardgame.title}</b></div>,
        <Divider type="vertical" />,
        <div>평점 : <RateForm disabled={true} defaultValue={boardgame.rating} /></div>,
        <Divider type="vertical" />,
        <div>난이도 : <DifficultyForm disabled={true} defaultValue={boardgame.difficulty} /></div>,
        <Divider type="vertical" />,
        <div>{moment(boardgame.playDate).format('YYYY-MM-DD')}</div>
      ];

    return (
          <Card>
            <Comment
                actions={actions}
                author={<a>{boardgame.author?.fields.name}</a>}
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                content={
                    <p>
                        {boardgame.comment || '작성한 후기가 없습니다.'}
                    </p>
                }
                datetime={
                    <Tooltip>
                        <span>{moment(createdAt).fromNow()}</span>
                    </Tooltip>
                }
                />
          </Card>
    )
}

export default BoardgameComment
