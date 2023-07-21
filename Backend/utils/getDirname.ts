import { fileURLToPath } from 'url';
import path from 'path';

const getDirname = (metaUrl: string) => path.dirname(fileURLToPath(metaUrl));
export default getDirname;
