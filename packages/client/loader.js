import { getOptions } from 'loader-utils';
import { minify } from 'html-minifier';
import postcss from 'postcss';

export default function (src) {
  const options = getOptions(this);
  const styleRegex = options.styleRegex
    ? options.styleRegex
    : /(?:css`)((.|\n)+?)(?=(`(\n|;|,)))/gi;
  const styleDelimiter = options.styleDelimiter ? options.styleDelimiter : /`/;
  const htmlRegex = options.styleRegex
    ? options.styleRegex
    : /(?:html`)((.|\n)+?)(?=(`(\n|;|,)))/gi;
  const htmlDelimiter = options.htmlDelimiter ? options.htmlDelimiter : /`/;

  const outputConfig = options.plugins
    ? options.plugins
    : Object.keys(config.plugins)
        .filter((key) => config.plugins[key])
        .map((key) => import(key));

  const styleMatches = src.match(styleRegex);
  const file = this.resourcePath;
  const transforms =
    styleMatches && styleMatches.length
      ? styleMatches.map((css) =>
          postcss(outputConfig).process(
            styleDelimiter ? css.split(styleDelimiter)[1] : css,
            {
              from: file,
              to: file,
            }
          )
        )
      : [];
  transforms.forEach((transform, index) => {
    src = src.replace(
      styleDelimiter
        ? styleMatches[index].split(styleDelimiter)[1]
        : styleMatches[index],
      transform.css
    );
  });

  const htmlMatches = src.match(htmlRegex);
  if (htmlMatches && htmlMatches.length) {
    htmlMatches.forEach((html, index) => {
      src = src.replace(
        htmlDelimiter
          ? htmlMatches[index].split(htmlDelimiter)[1]
          : htmlMatches[index],
        minify(htmlMatches[index].split(htmlDelimiter)[1], {
          collapseWhitespace: true,
        })
      );
    });
  }
  return src;
};
