import { Member } from '../types/type';
import { Entry } from 'contentful';
import { atom, useAtom } from 'jotai';

// const [filter, set] = useAtom(filterAtom)
// setTodos((prev) => [...prev, atom<Todo>({ title, completed: false })])
// const setMembers = useSetAtom(membersAtom);

// For Typescript
const _init :Entry<Member>[] = [];
export const membersAtom = atom(_init);

const useMember = () => {
    const [members, setMembers] = useAtom(membersAtom);
    
    const getMemberByName = (name: string) => {
        console.log(members);
        return members.find(m => m.fields.name === name)
    }

    return {members, setMembers, getMemberByName}
}

export default useMember


