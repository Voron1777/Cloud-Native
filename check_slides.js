/* Measure per-slide content overflow of a Shower presentation (list mode). */
const { pathToFileURL } = require('url');
const path = require('path');

const file = process.argv[2] || 'lecture-10.html';

(async () => {
  const puppeteer = (await import('puppeteer-core')).default;
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  const url = pathToFileURL(path.resolve(__dirname, file)).href;
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 800));

  const data = await page.evaluate(() => {
    const slides = [...document.querySelectorAll('.slide')];
    return slides.map((s, i) => {
      const inner = s.getBoundingClientRect();
      return {
        n: i + 1,
        title: (s.querySelector('h2')?.textContent || '').trim()
          .replace(/\s+/g, ' ').slice(0, 60),
        ch: s.clientHeight, sh: s.scrollHeight,
        cw: s.clientWidth, sw: s.scrollWidth,
        over: s.scrollHeight - s.clientHeight,
        overW: s.scrollWidth - s.clientWidth,
      };
    });
  });

  let bad = 0;
  for (const d of data) {
    const flagV = d.over > 4 ? `OVER +${d.over}px` : 'ok';
    const flagW = d.overW > 4 ? ` WIDE +${d.overW}px` : '';
    if (d.over > 4 || d.overW > 4) bad++;
    console.log(
      String(d.n).padStart(2) + '  ' +
      flagV.padEnd(12) + (flagW || '').padEnd(14) +
      `${d.sh}/${d.ch}px  ${d.title}`
    );
  }
  console.log(`\n${bad} slide(s) overflow of ${data.length}`);
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
