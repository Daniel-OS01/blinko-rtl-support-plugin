const fs = require('fs');
const path = require('path');

const version = process.argv[2];
if (!version) {
    console.error('Please provide a version argument');
    process.exit(1);
}

const pluginPath = path.resolve(__dirname, '../plugin.json');
const plugin = require(pluginPath);

console.log(`Updating plugin.json version from ${plugin.version} to ${version}`);
plugin.version = version;

fs.writeFileSync(pluginPath, JSON.stringify(plugin, null, 2) + '\n');
console.log('plugin.json updated successfully');
