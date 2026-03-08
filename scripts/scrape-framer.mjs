import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const VAULT_PATH = 'E:/Dropbox/VOIDCONTROLAPP/11-SITE';

const pages = [
  { url: 'https://less-oval-609998.framer.app/', out: 'index.md', title: 'Home' },
  { url: 'https://less-oval-609998.framer.app/about-page-personal', out: 'about.md', title: 'About' },
  { url: 'https://less-oval-609998.framer.app/project-rembrandtreality', out: 'projects/rembrandt-reality.md', title: 'Rembrandt Reality' },
  { url: 'https://less-oval-609998.framer.app/project-ledgerverse', out: 'projects/ledgerverse.md', title: 'Ledgerverse' },
  { url: 'https://less-oval-609998.framer.app/project-AR-garments', out: 'projects/ar-garments.md', title: 'AR Garments' },
  { url: 'https://less-oval-609998.framer.app/project-hackaton', out: 'projects/hackathon.md', title: 'Hackathon' },
  { url: 'https://less-oval-609998.framer.app/project-lovekravt-nft', out: 'projects/lovekravt-nft.md', title: 'Lovekravt NFT' },
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
  await tab.goto(page.url, { waitUntil: 'networkidle2', timeout: 30000 });
  const text = await tab.evaluate(() => document.body.innerText);
  const outPath = path.join(VAULT_PATH, page.out);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, template(page.title, text.trim()));
  console.log(`✓ ${page.out}`);
  await tab.close();
}

await browser.close();
console.log('Done — all pages scraped.');
