import { statSync } from 'fs';
import { resolve } from 'path';

const MAX_BYTES = 200 * 1024; // 200KB limit
const FILE_PATH = resolve(process.cwd(), 'release/index.js');

try {
    const stats = statSync(FILE_PATH);
    const size = stats.size;
    console.log(`Bundle Size: ${(size / 1024).toFixed(2)} KB`);

    if (size > MAX_BYTES) {
        console.error(`❌ Bundle size exceeded! Limit: ${MAX_BYTES / 1024}KB, Actual: ${(size / 1024).toFixed(2)}KB`);
        process.exit(1);
    } else {
        console.log('✅ Bundle size within limit.');
    }
} catch (e) {
    console.error(`❌ Failed to check bundle size: ${e.message}`);
    process.exit(1);
}
