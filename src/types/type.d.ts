import { Entry } from "contentful";

export interface BoardgameComment {
    title: string;
    rating: number;
    difficulty?: number;
    playDate?: string;
    author?: Entry<Member>;
    comment?: string;
    gameInfo?: BoardlifeBoardgame;
}

export interface Member {
    name: string;
    admin?: boolean;
    group: Entry<Group>;
}

export interface Group {
    groupLeader: Entry<Member>;
    groupNumber: number;
    groupName: string;
}

export interface GroupMembers {
    groupId: string;
    groupName: string;
    groupLeader: Entry<Member>;
    members: Entry<Member>[];
}

export interface BoardlifeBoardgame {
    'number': string;
    title: string;
    engtitle: string;
    years: string;
    'bbs_img': string;
}

export interface CommentWithGroup {
    key: number,
    title: string,
    rating: number,
    difficulty: number,
    img: string,
    comments: (string | undefined)[];
    count: number
}


type CustomFormItemProps = {
    value?: any;
    onChange?: (value: any) => void
};