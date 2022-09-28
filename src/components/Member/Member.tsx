import React from 'react'
import Card from 'antd/lib/card/Card'
import { getFieldsFromEntries } from '../../functions/functions';
import { List } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { withAvatar } from '../../data/avartars';
import useMember from '../../hooks/useMember';



const Member = () => {
    const { members } = useMember();
    return (
        <Card bordered={true} bodyStyle={{maxHeight: '100vh', overflowY: 'auto'}}>
             <List
                itemLayout="horizontal"
                dataSource={withAvatar(getFieldsFromEntries(members))}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href="https://ant.design">{item.name}</a>}
                            description="타이틀을 따내시면 추가해드립니다. ex) 그룹 대전 1위, The king of 카탄"
                        />
                        아바타 요청 가능
                        {/* {`${JSON.stringify(item.group)}`} */}
                    </List.Item>
                )}
            />
        </Card>
    )
}

export default Member
