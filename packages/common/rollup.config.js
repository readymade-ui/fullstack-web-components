import typescript from '@rollup/plugin-typescript';
import html from 'rollup-plugin-string-html';

export default [
  {
    input: './index.ts',
    plugins: [
      html({
        minifier: {},
      }),
      typescript({ declaration: false }),
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
];
