import { SmileOutlined, StarOutlined, UserOutlined } from "@ant-design/icons";
import { List, Space } from "antd";
import React, { useMemo } from "react";
import { replaceImageSrcTo170 } from "../../functions/functions";
import { CommentWithGroup } from "../../types/type";


const RATING = 'rating';
const DIFFICULTY  = 'difficulty';
const rateDescriptions = ["아쉬워요","살짝 아쉬워요","재밌음","너무 재밌어요","꼭 해야해요",];
const difficultyDescriptions = ["매우 쉬움","쉬움","보통","어려움","매우 어려움"];

// 초록색 > 노란색 > 빨간색
//#5bda98 //#ff6b26 //#df4751
const colors = ['#5bda98', '#ff6b26', '#df4751', '#1890ff'];

interface BoardgameWithRateProps {
    item: CommentWithGroup
}

const BoardgameWithRate = ({item}: BoardgameWithRateProps) => {

    const evaluateRating = useMemo( () => (type: 'rating' | 'difficulty', rating: number, count: number) => {
        const score = rating/count;
        if(type === RATING) {
            return `${score} (${rateDescriptions[Math.round(score)-1]})`
        } else {
            return `${score} (${difficultyDescriptions[Math.round(score)-1]})`
        }
    }, []);
    
    const evaluateColor = useMemo( ()=> (type: 'rating' | 'difficulty', score: number) => {
        if(type === RATING) {
            return (score >= 4) ? colors[3] : (score >= 3) ? colors[1] : colors[2];    
        }else {
            return (score <= 2.5) ? colors[0] : (score <= 3.5)  ? colors[1] : colors[2];
        }
    }, []);
    
    
    const IconText = useMemo(() => ({ icon, text, color }: { icon: React.ReactNode; text: string, color?: string }) => (
      <Space style={{fontWeight: 'bold', color}}>
        {icon}
        <span>{text}</span>
      </Space>
    ), []);

  return (
    <List.Item
          key={item.title}
          actions={[
            <IconText
              color={evaluateColor(RATING, item.rating / item.count)}
              icon={<SmileOutlined />}
              text={evaluateRating(RATING, item.rating, item.count)}
              key="list-vertical-star-o"
            />,
            <IconText
              color={evaluateColor(DIFFICULTY, item.difficulty / item.count)}
              icon={<StarOutlined />}
              text={evaluateRating(DIFFICULTY, item.difficulty, item.count)}
              key="list-vertical-like-o"
            />,
            <IconText
              icon={<UserOutlined />}
              text={`${item.count}`}
              key="list-vertical-message"
            />,
          ]}
          extra={
            <img
              width={100}
              height={100}
              alt={item.title}
              src={`https://boardlife.co.kr/${replaceImageSrcTo170(item.img)}`}
            />
          }
        >
          <List.Item.Meta title={item.title} description={item.comments[Math.round(Math.random()*10000)%item.comments.length]} />
        </List.Item>
  );
};

export default BoardgameWithRate;
