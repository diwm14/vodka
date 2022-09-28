import { Entry } from "contentful";
import {decode,encode } from "iconv-lite";
import {Buffer} from 'buffer';

const getFieldsFromEntries = (entries: Entry<any>[]) => {
    return entries.map(e => e.fields);
}

const utfToEuckr = (str: string) => {
    return escape(encode(str, 'EUC-KR').toString('binary'))
}

const euckrToUtf = (str: string) => {
    return decode(new Buffer(str), 'UTF-8')
}

const replaceImageSrcTo170 = (src: string) => {
    return src.replace('30x30_100_6', '170x170_100_5')
}

const entryToLink = (entry?: Entry<any>) => {
    return entry ? {sys: {type: "Link", linkType: "Entry", id: entry.sys.id}} : null;
}


export {getFieldsFromEntries, utfToEuckr, euckrToUtf, replaceImageSrcTo170, entryToLink}