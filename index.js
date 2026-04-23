import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

// This allows Node to load .ts files directly in an ESM environment
register('tsx', pathToFileURL('./'));

import './server.ts';
