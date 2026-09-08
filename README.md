# Building
Install esbuild. Example for debian:
`sudo apt install esbuild`

In the root directory, run `esbuild app.js --bundle --outfile=app.bundle.js`

# Third-party dependencies
This project makes use of **decimal.js** and **KaTeX** libraries. These dependencies are directly included under `lib/`.

**decimal.js**
Version: v10.6.0 (Modified for calc82)
License: MIT
Source: https://www.npmjs.com/package/decimal.js/v/10.6.0

**KaTeX**
Version: 0.17.0 (Extra fonts removed)
License: MIT
Source: https://www.npmjs.com/package/katex/v/0.17.0