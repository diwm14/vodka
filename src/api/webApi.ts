import axios from 'axios';
import { utfToEuckr } from '../functions/functions';
import { BoardlifeBoardgame } from '../types/type';

// axios.defaults.withCredentials = true;

export const getBoardgamesApi = async (query: string): Promise<BoardlifeBoardgame[]> => {
    const res = await axios.get(`https://boardlife.co.kr/get_auto_search.php?word=${utfToEuckr(query)}`, {
        withCredentials: true,
    });
    return res.data.slice(0, 15);
}
