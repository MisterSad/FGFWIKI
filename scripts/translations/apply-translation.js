import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localesDir = path.resolve(__dirname, '../../public/locales');

export function applyGuildToolTranslations(lang, translations) {
  const filePath = path.join(localesDir, lang, 'translation.json');
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  data.guild_tool = {
    ...(data.guild_tool || {}),
    ...translations
  };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
  console.log(`Updated ${lang} with ${Object.keys(translations).length} guild_tool keys.`);
}
