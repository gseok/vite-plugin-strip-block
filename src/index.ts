import { Plugin } from 'vite';

interface StripBlockPluginOptions {
  start?: string;
  end?: string;
}

const regexCharsRegex = /[-[\]{}()*+?.,\\^$\\/|#]/g;

const escapeRegexChars = (comment: string) => {
  return comment && regexCharsRegex.test(comment) ? comment.replace(regexCharsRegex, '\\$&') : comment;
};

const stripBlockPlugin = (options: StripBlockPluginOptions): Plugin => {
  // ref: https://github.com/jballant/webpack-strip-block
  return {
    name: 'vite-plugin-strip-block',
    transform(code, id) {
      // is not 'js, jsx, ts, tsx' file then bypass
      if (!/\.([jt]sx?)$/.test(id)) {
        return code;
      }
      const startComment = escapeRegexChars(options.start || 'develblock:start');
      const endComment = escapeRegexChars(options.end || 'develblock:end');

      const startWhitespaceMatcher = '';
      const endWhitespaceMatcher = '';

      const regexPattern = new RegExp(
        startWhitespaceMatcher +
          '\\/\\* ?' +
          startComment +
          ' ?\\*\\/[\\s\\S]*?\\/\\* ?' +
          endComment +
          ' ?\\*\\/' +
          endWhitespaceMatcher,
        'g',
      );

      return code.replace(regexPattern, '');
    },
  };
};

export default stripBlockPlugin;
