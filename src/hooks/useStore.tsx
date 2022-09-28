import produce from "immer";
import { useEffect, useState } from 'react';
import { client } from '../api/client';
import { ContentType, Entry } from 'contentful';
import useMember from './useMember';
import useContentType from "./useContentType";
import useGroup from "./useGroup";
import useBoradgame from "./useBoardgame";

const MEMBER = 'member';
const GROUP = 'group';
const BOARDGAME = 'boardgame';

const filterEntries = (entries: Entry<any>[], conentTypeId: string) => {
    return entries.filter(data => data.sys.contentType.sys.id === conentTypeId)
}

const getIdsFromContentType = (contentTypes: ContentType[]) => {
    return contentTypes.map(ct => ct.sys.id)
}

// const mapEntriesByContentType = (entries: Entry<any>[], contentTypes: ContentType[]) => {
//     return getIdsFromContentType(contentTypes).map(ct => filterEntries(entries, ct))
// }


const useStore = () => {
    const {setContentTypes} = useContentType();
    const {setMembers} = useMember();
    const {setGroups} = useGroup()
    const {setBoardgames} = useBoradgame();
    const [loading, setLoading] = useState(true);
    const [forceUpdate, setForceUpdate] = useState(0);

    useEffect(() => {
      Promise.all([client.getContentTypes(), client.getEntries()])
      .then(([conentTypeRes, entriesRes]) => {
        setContentTypes(conentTypeRes.items)
        getIdsFromContentType(conentTypeRes.items).forEach(ct => {
            const filteredEntires = filterEntries(entriesRes.items, ct)
            if(ct === MEMBER) setMembers(filteredEntires)
            else if(ct === GROUP) setGroups(filteredEntires)
            else if(ct === BOARDGAME) setBoardgames(filteredEntires)
        })
      })
      .catch(console.error)
      .finally(() => {
          setLoading(false);
      })
    }, [forceUpdate]);

    const update = () => {
        setForceUpdate(forceUpdate + 1);
    }

    return {loading, update}
}

export default useStore;


