const { Client } = require("@notionhq/client");
const fs = require('fs');

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

(async () => {
  const myPage = await notion.databases.query({
    database_id: "058cf2642e654b449b2108733cc0c2ce",
  });
  
  myPage.results.forEach(async element => {
    const pageId = element.id;
    const response = await notion.pages.retrieve({ page_id: pageId });
    const title = response.properties.Problem.title[0].plain_text;
    const difficulty = response.properties.Difficulty.multi_select[0].name;
    const url = response.properties['Leet Code Url'].url;
    const solution = response.properties.Solution.url;

    const line = `|[${title}](${url})|${difficulty}|[Link](${solution})|\n`;
    fs.appendFileSync('/home/eliasn/Desktop/markdown.txt', line);
  });
})();
