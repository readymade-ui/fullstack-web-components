import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';

export default [
  {
    input: './src/index.ts',
    plugins: [nodeResolve(), typescript()],
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
  {
    input: './src/config.ts',
    plugins: [nodeResolve(), typescript()],
    onwarn: (warning, next) => {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      next(warning);
    },
    output: {
      file: './dist/bundles/config.js',
      format: 'cjs',
      sourcemap: true,
    },
  },
];
