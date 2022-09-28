import { Member } from "../types/type";

const avatarNames = 
     ['jean', 'jordan', 'jodi', 'jed', 'joe', 'jia', 'jeri', 'jazebelle', 'julie', 'jake', 'james', 'jaqueline', 'jocelyn', 'jon', 'josh', 'jabala', 'jeane', 'jolee', 'jerry', 'josephine', 'Jess', 'jacques', 'jack', 'jenni', 'jana', 'jude', 'jane', 'jai'];


export const getRandomAvartarNames = (numbers: number) => {
    const avatarLength = avatarNames.length;
    const randomAvartarNames: number[] = [];
    while(randomAvartarNames.length < numbers) {
        const rn = Math.floor(Math.random() * 100) % avatarLength;
        if(!randomAvartarNames.find(ran => ran === rn)) {
            randomAvartarNames.push(rn);
        }
    }

    return avatarNames
        .filter((value: string, index:number) => randomAvartarNames.includes(index))
        .map(v => `/Schmoes/${v}.svg`);
}


export const withAvatar = (members: Member[]) => {
    const rans = getRandomAvartarNames(members.length);
    return members.map((member, index) => ({...member, avatar: rans[index]}))

}