import { ContentType } from 'contentful';
import { atom, useAtom } from 'jotai';

const _init : ContentType[] = [];
const contentTypesAtom = atom(_init);

const useContentType = () => {
    const [contentTypes, setContentTypes] = useAtom(contentTypesAtom);
    return {
        contentTypes, setContentTypes
    }
}

export default useContentType
