import { Card } from 'antd';
import React from 'react';
import useGroup from '../../hooks/useGroup';
import Group from './Group';

const GroupWrap = () => {
    const {groupMembers} = useGroup();
    
    return (
        <Card title="그룹 별 멤버">
            {groupMembers.map( (gm) => <Group key={gm.groupId} groupMembers={gm} />)}
        </Card>
    )
}

export default GroupWrap
