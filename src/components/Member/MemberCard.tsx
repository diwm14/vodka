import React from 'react'
import { Card, Image } from 'antd'
import { Member } from '../../types/type'

// select box에 쓰려고 했는데 안 쓸 것 같음
interface MemberCardProps {
    member: Member & {avatar: string};
}

const MemberCard = ({member} : MemberCardProps) => {
    return (
        <Card size={'small'}>
            <Card.Meta
                // avatar={<Image width={50} src={member.avatar} />}
                title={member.name}
                />
        </Card>
    )
}

export default MemberCard
