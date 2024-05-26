import config from './.eslintrc.js';

export default {
  ...config,
  ignores: [
    'node_modules/',
    'coverage',
    '.coverage',
    'jest*',
    '*.test.ts',
    '*.test.tsx',
    '.umi',
    '.umi-production',
    '.umi-test',
    '.dumi/tmp*',
    '!.dumirc.ts',
    'dist',
    'es',
    'lib',
    'logs',
    '.next'
  ]
};
