import { Entry } from 'contentful';
import { atom, useAtom } from 'jotai';

// For Typescript
const _init :Entry<any>[] = [];
const boardgamesAtom = atom(_init);

// const group3 = memberArray.filter(m => m.group === "4");
    // group3.map((g) => {
    //   manageClient.then(env => env.createEntry('member', {
    //     fields: {
    //       name: {
    //         'en-US': g.name
    //       },
    //       admin: {
    //         'en-US': false
    //       },
    //       group: {
    //         "en-US": {
    //           "sys": {
    //               "type": "Link",
    //               "linkType": "Entry",
    //               "id": "7AbhKXUbk2yTDz5ZEb6Nrn"
    //           }
    //         }
    //       }
    //     }
    //   })).then(res => res.publish())
    // })
    
const useBoradgame = () => {
    const [boardgames, setBoardgames] = useAtom(boardgamesAtom);
    return { boardgames, setBoardgames }
}

export default useBoradgame
