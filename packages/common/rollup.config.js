import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: './index.ts',
    plugins: [typescript({ declaration: false })],
    onwarn: (warning, next) => {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      next(warning);
    },
    output: {
      file: './dist/fesm2015/index.js',
      format: 'esm',
      sourcemap: true,
    },
  },
  {
    input: './index.ts',
    plugins: [typescript({ declaration: false })],
    onwarn: (warning, next) => {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      next(warning);
    },
    output: {
      file: './dist/bundles/index.js',
      format: 'cjs',
      sourcemap: true,
    },
  },
];
