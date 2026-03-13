import { Version } from '../types.js';
import { config } from '../config.js';

// 1. Add static imports for all supported versions
import * as v5 from '@dicebear/api-5';
import * as v6 from '@dicebear/api-6';
import * as v7 from '@dicebear/api-7';
import * as v8 from '@dicebear/api-8';
import * as v9 from '@dicebear/api-9';

const availableVersions: Record<string, Version> = {
  '5.x': v5,
  '6.x': v6,
  '7.x': v7,
  '8.x': v8,
  '9.x': v9,
};

export async function getVersions(): Promise<Record<string, Version>> {
  const versions: Record<string, Version> = {};

  for (const versionNum of config.versions) {
    // 2. Map the config versions to our statically imported modules
    versions[`${versionNum}.x`] = availableVersions[`${versionNum}.x`];
  }

  return versions;
}