import { List } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import Card from 'antd/lib/card/Card'
import React from 'react'
import { withAvatar } from '../../data/avartars'
import { getFieldsFromEntries } from '../../functions/functions'
import { GroupMembers } from '../../types/type'
import { CrownTwoTone } from '@ant-design/icons';

import MemberFlicker from '../Member/MemberFlicker'

type GroupProps = {
    groupMembers: GroupMembers;
}

const Group = ({groupMembers}: GroupProps) => {
    return groupMembers &&  (
        <Card
            key={groupMembers.groupId}
            style={{ marginTop: 16 }}
            type="inner"
            title={groupMembers.groupName}
            >
                {/* <MemberFlicker groupMembers={getFieldsFromEntries(groupMembers.members)} /> */}
                <List
                    grid={{ gutter: 16, column: 3 }}
                    itemLayout="horizontal"
                    dataSource={withAvatar(getFieldsFromEntries(groupMembers.members))}
                    renderItem={item => (
                        <List.Item>
                            <Card>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.avatar} />}
                                    title={<span>{item.name}{item.name === groupMembers.groupLeader.fields.name && <CrownTwoTone style={{marginLeft: '4px'}} />}</span>}
                                />
                            </Card>
                        </List.Item>
                    )}
                    />
            </Card>
    )
}

export default Group
