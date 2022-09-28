import React from 'react'
import { Card, Image } from 'antd';
import { euckrToUtf, replaceImageSrcTo170 } from '../../functions/functions';
import { BoardlifeBoardgame } from '../../types/type';

interface BoardgameCardProps {
    boardgame: BoardlifeBoardgame
}

const BoardgameCard = ({boardgame} :BoardgameCardProps) => {
    return (
        <Card size={'small'}>
            <Card.Meta
                avatar={<Image width={50} src={`https://boardlife.co.kr/${replaceImageSrcTo170(boardgame.bbs_img)}`} />}
                title={euckrToUtf(boardgame.title)}
                description={boardgame.engtitle}
                />
        </Card>
    )
}

export default BoardgameCard
