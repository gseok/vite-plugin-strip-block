# vite-plugin-strip-block
Creating a vite-plugin-strip-block for Vite.js to remove code blocks

vite-plugin-strip-block for Vite.js that removes code blocks. The plugin is inspired by https://github.com/jballant/webpack-strip-block. It should work for js, jsx, ts, and tsx files.

## Install
```
npm i vite-plugin-strip-block -D

# yarn
yarn add vite-plugin-strip-block -D

# pnpm
pnpm i vite-plugin-strip-block -D
```

## Usage
Add `strip-block` plugin to `vite.config.js / vite.config.ts` and configure it:
```ts
// vite.config.js / vite.config.ts
import stripBlockPlugin from 'vite-plugin-strip-block'

export default {
  plugins: [
    stripBlockPlugin() // same to stripBlockPlugin({ start: 'develblock:start', end: 'develblock:end' })
  ]
}
```

If you want custom strip block comment:
```ts
// vite.config.js / vite.config.ts
import stripBlockPlugin from 'vite-plugin-strip-block'

export default {
  plugins: [
    stripBlockPlugin({ start: 'DEV-START', end: 'DEV-END' })
  ]
}
```


### Result:

In your client source files(using default start, end strip comment):
```javascript

// ori soruce
var makeFoo(bar, baz) {
    // The following code will be stripped with vite-plugin-strip-block
    /* develblock:start */
    if (bar instanceof Bar !== true) {
        throw new Error('makeFoo: bar param is required and must be instance of Bar');
    }
    /* develblock:end */

    // This code would remain
    return new Foo(bar, baz);
}

// after build used - stripBlockPlugin()
var makeFoo(bar, baz) {
    // The following code will be stripped with vite-plugin-strip-block

    // This code would remain
    return new Foo(bar, baz);
}
```

---

In your client source files(using custom start, end strip comment):
```javascript

// ori soruce
var makeFoo(bar, baz) {
    // The following code will be stripped with vite-plugin-strip-block
    /* DEV-START */
    if (bar instanceof Bar !== true) {
        throw new Error('makeFoo: bar param is required and must be instance of Bar');
    }
    /* DEV-END */

    // This code would remain
    return new Foo(bar, baz);
}

// after build used - stripBlockPlugin({ start: 'DEV-START', end: 'DEV-END' })
var makeFoo(bar, baz) {
    // The following code will be stripped with vite-plugin-strip-block

    // This code would remain
    return new Foo(bar, baz);
}
```
