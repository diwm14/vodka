import React from "react";
import { Select } from "antd";
import MemberCard from "./MemberCard";
import { withAvatar } from "../../data/avartars";
import { getFieldsFromEntries } from "../../functions/functions";
import useGroup from "../../hooks/useGroup";
import { CustomFormItemProps } from "../../types/type";

const MemberSelect = ({value, onChange}: CustomFormItemProps) => {
  const { groupMembers } = useGroup();
  
  return (
    <Select showSearch value={value} onChange={onChange}>
      {groupMembers &&
        groupMembers.map((groupMember) => (
          <Select.OptGroup key={groupMember.groupId} label={groupMember.groupName}>
            {withAvatar(getFieldsFromEntries(groupMember.members)).map(
              (member) => (
                <Select.Option key={member.name} value={member.name}>{member.name}</Select.Option>
              )
            )}
          </Select.OptGroup>
        ))}
    </Select>
  );
};

export default MemberSelect;
