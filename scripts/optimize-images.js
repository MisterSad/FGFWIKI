import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const IMAGES_DIR = path.join(projectRoot, 'public/images');
const ASSETS_DIR = path.join(projectRoot, 'public/assets');

const MAX_WIDTH = 1920;
const WEBP_QUALITY = 80;

const files = [
    ...fs.readdirSync(IMAGES_DIR)
        .filter((f) => /\.(png|jpe?g)$/i.test(f))
        .map((f) => path.join(IMAGES_DIR, f)),
    ...fs.readdirSync(ASSETS_DIR)
        .filter((f) => /\.(png|jpe?g)$/i.test(f))
        .map((f) => path.join(ASSETS_DIR, f)),
];

let saved = 0;
let removed = 0;

for (const file of files) {
    try {
        const parsed = path.parse(file);
        const outFile = path.join(parsed.dir, `${parsed.name}.webp`);

        const image = sharp(file);
        const meta = await image.metadata();
        let pipeline = image.rotate();

        if (meta.width > MAX_WIDTH) {
            pipeline = pipeline.resize({ width: MAX_WIDTH });
        }

        await pipeline
            .webp({ quality: WEBP_QUALITY, effort: 4 })
            .toFile(outFile);

        const oldSize = fs.statSync(file).size;
        const newSize = fs.statSync(outFile).size;
        saved += oldSize - newSize;

        fs.unlinkSync(file);
        removed += 1;
        console.log(`✓ ${parsed.name}.${parsed.ext} -> ${parsed.name}.webp (${(oldSize / 1024).toFixed(0)} KB -> ${(newSize / 1024).toFixed(0)} KB)`);
    } catch (err) {
        console.error(`✗ Failed to convert ${file}: ${err.message}`);
    }
}

console.log(`\nConverted ${removed} files. Net savings: ${(saved / 1024 / 1024).toFixed(1)} MB`);
