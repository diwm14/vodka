import * as cf from "contentful";
import * as cfm from "contentful-management";

const client = cf.createClient({
  space: "p64d7f6x8sx5",
  environment: "master", // defaults to 'master' if not set
  accessToken: "6igVAgnzNWASYE3pMvIY8AQFaqp-jl-bQ7G0AuowEFQ",
});

const manageClient = cfm
  .createClient({
    accessToken: "CFPAT-Ga7z7HPnkjJfGoIU8fGI2rYkxRR8DZ6WykkWt8tbAI4",
  })
  .getSpace("p64d7f6x8sx5")
  .then((space) => space.getEnvironment("master"));

async function getEntries<T>({ content_type }: any) {
  return await client.getEntries<T>({ content_type });
}

const wrapWithLocale = (key: string, value: any) => {
  return {
    [key]: {
      "en-US": value,
    },
  };
};

const wrapWithFields = (data: any) => {
  let obj = {};
  Object.entries(data).forEach(
    ([key, value]) => (obj = { ...obj, ...wrapWithLocale(key, value) })
  );
  return { fields: obj };
};

// 당장은 BoardgameComment 말고는 없긴 하다. 타입으로 구분하면 될듯?
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
async function postEntry(entryType: string, data: any) {
  const env = await manageClient;
  const res = await env.createEntry(entryType, data);
  return await res.publish();
}

export { client, manageClient, getEntries, postEntry, wrapWithFields };
