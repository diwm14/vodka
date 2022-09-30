import { Entry } from "contentful";
import { atom, useAtom } from "jotai";
import { BoardlifeBoardgame, BoardgameComment } from "../types/type";
import { getFieldsFromEntries } from "../functions/functions";

// For Typescript
const _init: Entry<any>[] = [];
const boardgamesAtom = atom(_init);
const commentWithGroupAtom = atom((get) => {
  let gameMap: any = {};
  getFieldsFromEntries(get(boardgamesAtom)).forEach(
    ({ title, rating, difficulty, gameInfo, comment }) => {
      const findGame = gameMap[gameInfo?.number!];
      if (findGame) {
        findGame.count++;
        findGame.difficulty += difficulty;
        findGame.rating += rating;
        findGame.comments = [...findGame.comments, comment];
      } else {
        gameMap[gameInfo?.number!] = {
          key: gameInfo?.number,
          title,
          rating,
          difficulty,
          count: 1,
          img: gameInfo?.bbs_img,
          comments: [comment],
        };
      }
    }
  );
  return Object.values(gameMap);
});
// author: {metadata: {…}, sys: {…}, fields: {…}}
// comment: "마피아게임st\n철판깔고 블러핑할 수 있으면 더 꿀잼각!"
// difficulty: 1
// gameInfo:
// bbs_img: "wys2/swf_upload/2022/02/24/1645642498083113_lg_N_30x30_100_6_.jpg"
// engtitle: "NO TOUCH KRAKEN"
// number: "9089"
// title: "노 터치 크라켄"
// years: "2017"
// playDate: "2022-09-27T14:45:45.273Z"
// rating: 4
// title: "노 터치 크라켄"

const groupByBoardgame = () => {
  const boardgames: BoardgameComment[] = [];
  // object 만들어서 쓰자
  let gameMap: any = {};
  for (const { title, rating, difficulty, gameInfo, comment } of boardgames) {
    // 기존에 셋팅 된 거 있는지 확인
    const findGame = gameMap[gameInfo?.number!];
    if (findGame) {
      findGame.count++;
      findGame.difficulty += difficulty;
      findGame.rating += rating;
      findGame.comments = [...findGame.comments, comment];
    } else {
      gameMap[gameInfo?.number!] = {
        key: gameInfo?.number,
        title,
        rating,
        difficulty,
        count: 1,
        img: gameInfo?.bbs_img,
        comments: [comment],
      };
    }
  }
  console.log(gameMap);

  // 완성데이터 폼
  // {key(number): 9089, title: 'boardgame title', rating: 2.3, difificulty: 2, count: 4, img: 'img_src', comments: ['comment'] }
  // {key(number): 10089, title: 'boardgame title', rating: 2.3, difificulty: 2, count: 4, img: 'img_src', comments: ['comment'] }
};

const useBoardgame = () => {
  const [boardgames, setBoardgames] = useAtom(boardgamesAtom);
  const [commentWithGroup] = useAtom(commentWithGroupAtom);

  return { boardgames, setBoardgames, commentWithGroup };
};

export default useBoardgame;
