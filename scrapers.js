const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
    const browser = await puppeteer.launch({
        headless: 'new', // Explicitly specifying the new Headless mode
    });

    const page = await browser.newPage();

    await page.goto(url);

    
    const [el] = await page.$x('//*[@id="MainImg"]');
    const [el2] = await page.$x('//*[@id="prodetails"]/div[2]/h4[1]');
    const [el3] = await page.$x('//*[@id="prodetails"]/div[2]/h2');
    
    if (el && el2 && el3) {
        const src = await el.getProperty('src');
        const product = await src.jsonValue();

        const txt = await el2.getProperty('textContent');
        const description = await txt.jsonValue();


        const txt2 = await el3.getProperty('textContent');
        const price = await txt2.jsonValue();

        console.log({ product, description, price });
    } else {
        console.log('Image element not found.');
    }

    await browser.close();
}

const targetUrl = 'https://ermias-tekilemarkos.github.io/e-shopping/sp01.html';

scrapeProduct(targetUrl);
