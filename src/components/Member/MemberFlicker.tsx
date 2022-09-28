import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { Avatar, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import React from 'react';
import { withAvatar } from "../../data/avartars";
import { getFieldsFromEntries } from "../../functions/functions";


type MemberFlickerProps = {
    groupMembers: any[];
}

const MemberFlicker = ({groupMembers}: MemberFlickerProps) => {
    return (
        <div style={{ border: '1px solid red'}}>
            {
                withAvatar(getFieldsFromEntries(groupMembers)).map( item => <Flicking
                    align="prev"
                    circular={true}
                    onMoveEnd={e => {
                    console.log(e);
                    }}>
                        <Card>
                            <Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={<a href="https://ant.design">{item.name}</a>}
                                description="타이틀을 따내시면 추가해드립니다. ex) 그룹 대전 1위, The king of 카탄"
                            />
                            아바타 요청 가능
                        </Card>
                </Flicking>)
            }
            {/* <List
                // itemLayout="horizontal"
                dataSource={withAvatar(getFieldsFromEntries(groupMembers))}
                renderItem={item => (
                    <Flicking
                        align="prev"
                        circular={true}
                        onMoveEnd={e => {
                        console.log(e);
                        }}>
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.avatar} />}
                                    title={<a href="https://ant.design">{item.name}</a>}
                                    description="타이틀을 따내시면 추가해드립니다. ex) 그룹 대전 1위, The king of 카탄"
                                />
                                아바타 요청 가능
                            </List.Item>
                    </Flicking>
                )}
            /> */}
        </div>
    )
}

export default MemberFlicker
