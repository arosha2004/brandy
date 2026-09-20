const scrape = require('website-scraper').default;const options = {
  urls: ['https://stodio.webflow.io/'],
  directory: './stodio-clone',
  recursive: true,
  maxDepth: 1, // Let's try 1 first to see if we get all assets for the homepage
  // or maybe just the homepage is enough for now, wait, the user said "exact end to end clone of this site", which could imply the whole site including other pages. Let's increase maxDepth to 2 or 3.
  maxDepth: 3,
  filenameGenerator: 'bySiteStructure',
  urlFilter: (url) => {
    // Only scrape URLs from the same origin to avoid scraping the entire internet
    // But we need to allow assets from CDNs
    if (url.includes('stodio.webflow.io') || url.includes('cdn.prod.website-files.com') || url.includes('fonts.googleapis.com')) {
      return true;
    }
    // We should probably allow everything that is an asset (css, js, img) even from other domains
    return false; // wait, website-scraper has a built in way to download assets from other domains for the current page
  }
};

// Actually, website-scraper downloads assets (css, js, images) automatically even if they are on external domains!
// The urlFilter only applies to HTML pages (links).

const betterOptions = {
  urls: ['https://stodio.webflow.io/'],
  directory: './stodio-clone-full',
  recursive: true,
  maxDepth: 5,
  filenameGenerator: 'bySiteStructure',
  urlFilter: (url) => {
    return url.indexOf('https://stodio.webflow.io') === 0 || 
           url.indexOf('https://cdn.prod.website-files.com') === 0 || 
           url.indexOf('https://fonts.googleapis.com') === 0 || 
           url.indexOf('https://fonts.gstatic.com') === 0 ||
           url.indexOf('https://unpkg.com') === 0;
  }
};

scrape(betterOptions).then((result) => {
  console.log("Entire site successfully downloaded!");
}).catch((err) => {
  console.error("An error occurred", err);
});
