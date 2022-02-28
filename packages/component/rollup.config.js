import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';

export default [
  {
    input: './index.ts',
    plugins: [
      nodeResolve(),
      typescript({
        exclude: ['**/*.stories.js'],
      }),
    ],
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
];
