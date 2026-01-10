# Search Library Localization Instructions

## Issue
Currently, the search functionality depends on an external CDN (unpkg.com). This creates a single point of failure.

## Solution
Download the library locally to `/assets/js/vendor/`

## Steps to Download

### Option 1: Using curl (from your local machine)
```bash
mkdir -p assets/js/vendor
curl -o assets/js/vendor/simple-jekyll-search.min.js \
  https://unpkg.com/simple-jekyll-search@1.10.0/dest/simple-jekyll-search.min.js
```

### Option 2: Using wget
```bash
mkdir -p assets/js/vendor
wget -O assets/js/vendor/simple-jekyll-search.min.js \
  https://unpkg.com/simple-jekyll-search@1.10.0/dest/simple-jekyll-search.min.js
```

### Option 3: Manual download
1. Visit: https://unpkg.com/simple-jekyll-search@1.10.0/dest/simple-jekyll-search.min.js
2. Save the file as `assets/js/vendor/simple-jekyll-search.min.js`

### Option 4: Using npm
```bash
npm install simple-jekyll-search
cp node_modules/simple-jekyll-search/dest/simple-jekyll-search.min.js assets/js/vendor/
```

## Files Updated
The following files have been updated to use the local path:
- `en/search/index.md`
- `es-419/buscar/index.md`
- `pt-br/busca/index.md`

All now reference: `{{ "/assets/js/vendor/simple-jekyll-search.min.js" | relative_url }}`

## Verification
After downloading, verify:
1. File exists at: `assets/js/vendor/simple-jekyll-search.min.js`
2. File size should be approximately 6.5 KB
3. Test search functionality on your site
4. Works offline (disconnect from internet and test)

## Fallback
If you prefer to keep using the CDN, revert the changes to the 3 search pages.

## Note
I attempted to download this automatically but network restrictions prevented it. Please download manually using one of the options above.
