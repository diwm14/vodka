import { Entry } from 'contentful';
import { atom, useAtom } from 'jotai';
import { Group, GroupMembers, Member } from '../types/type';
import { membersAtom } from './useMember';



// For Typescript
const _init :Entry<Group>[] = [];
const groupsAtom = atom(_init);
const groupMembersAtom = atom((get) => {
    return get(groupsAtom)
                .map((group: Entry<any>) => ({
                    groupId: group.sys.id,
                    groupLeader: group.fields.groupLeader,
                    groupName: group.fields.groupName,
                    members: get(membersAtom).filter((member: Entry<Member>) => member.fields.group && member.fields.group.sys.id === group.sys.id)
                }))
});

const useGroup = () => {
    const [groups, setGroups] = useAtom(groupsAtom);
    const [groupMembers] = useAtom<GroupMembers[]>(groupMembersAtom);
    return { groups, setGroups, groupMembers }
}

export default useGroup
