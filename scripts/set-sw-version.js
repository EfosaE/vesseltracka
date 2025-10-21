// scripts/set-sw-version.js
const fs = require("fs");
const pkg = require("../package.json");

const versionFile = `self.APP_VERSION = "${pkg.version}";\n`;

fs.writeFileSync("public/version.js", versionFile);
console.log(`✅ Injected APP_VERSION ${pkg.version} into public/version.js`);
