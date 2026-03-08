import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const VAULT_PATH = 'E:/Dropbox/VOIDCONTROLAPP/11-SITE';

const pages = [
  { url: 'https://less-oval-609998.framer.app/project-trippinnft', out: 'projects/road-to-cartesia.md', title: 'Road to Cartesia' },
  { url: 'https://less-oval-609998.framer.app/project-dontbuymeme', out: 'projects/dont-buy-meme.md', title: "Don't Buy Meme" },
  { url: 'https://less-oval-609998.framer.app/project-nftshowroom', out: 'projects/ar-showroom.md', title: 'AR Showroom' },
];

const template = (title, content) => `---
title: "${title}"
date: 2024
status: needs-rewrite
tags: [portfolio, project]
publish: true
---

# ${title}

## Original content (scraped from Framer)

${content}

## Notes for rewrite

This content was scraped from the original Framer portfolio and needs to be
rewritten to reflect Lucas's product design narrative and new positioning.
`;

const browser = await puppeteer.launch({ headless: true });

for (const page of pages) {
  const tab = await browser.newPage();
  try {
    await tab.goto(page.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    // Wait a bit extra for JS to render
    await new Promise(r => setTimeout(r, 5000));
    const text = await tab.evaluate(() => document.body.innerText);
    const outPath = path.join(VAULT_PATH, page.out);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, template(page.title, text.trim()));
    console.log(`✓ ${page.out}`);
  } catch (err) {
    console.error(`✗ ${page.out}: ${err.message}`);
    // Write a stub so the file exists
    const outPath = path.join(VAULT_PATH, page.out);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, template(page.title, '[Content could not be scraped — add manually]'));
    console.log(`  → stub written for ${page.out}`);
  }
  await tab.close();
}

await browser.close();
console.log('Done.');
