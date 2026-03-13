import { config } from './config.js';
import fastify from 'fastify';
import cors from '@fastify/cors';

import { parseQueryString } from './utils/query-string.js';
import { versionRoutes } from './routes/version.js';
import { getVersions } from './utils/versions.js';
import { Font } from './types.js';
import { FontLookup } from './utils/fonts.js';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import * as path from 'path';

// Replace the old __dirname with this rootDir fallback
let rootDir: string;
if (process.env.LAMBDA_TASK_ROOT) {
  rootDir = process.env.LAMBDA_TASK_ROOT;
} else if (typeof __dirname !== 'undefined') {
  rootDir = path.join(__dirname, '../');
} else {
  rootDir = path.join(fileURLToPath(new URL('.', import.meta.url)), '../');
}

export const app = async () => {
  const app = fastify({
    logger: config.logger,
    ajv: {
      customOptions: {
        coerceTypes: 'array',
        removeAdditional: true,
        useDefaults: false,
      },
    },
    routerOptions: {
      maxParamLength: 1024,
      querystringParser: (str) => parseQueryString(str),
    },
  });

  const fonts = JSON.parse(
    await fs.readFile(path.join(rootDir, 'fonts/fonts.json'), 'utf-8'),
  ) as Font[];

  app.decorate('fontLookup', new FontLookup(fonts));

  await app.register(cors);

  await app.register(versionRoutes, { versions: await getVersions() });

  return app;
};
