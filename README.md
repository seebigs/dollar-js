# DollarJS

**A lighter, faster, modular, jQuery replacement (manipulate DOM, bind events, and more...)**

*// full API documentation coming soon*

## Download & Embed
 * [Full](https://raw.githubusercontent.com/seebigs/dollar-js/master/prebuilt/dollar.js) (dollar.js)
 * [Minified](https://raw.githubusercontent.com/seebigs/dollar-js/master/prebuilt/dollar.min.js) (dollar.min.js)
```html
<script src="dollar.min.js"></script>
```

## Install & Require
```
$ npm install dollar-js
```
```js
var $ = require('dollar-js');
```

## Simple Usage
```js
var $body = $('body').css({ background: '#369' });
$body.addClass('foo').on('click', function () { console.log(this.className); });
```
---

# Under the Hood

## Install the development package

From Github
```
$ git clone git@github.com:seebigs/dollar-js.git
$ cd dollar-js
$ npm install
```

From NPM
```
$ npm install dollar-js
$ cd node_modules/dollar-js
$ npm install
```

## How Much Faster Are We Talking?
In the current build, we clock ourselves at over **7x faster** on average across various operations!

See for yourself
```
$ npm run benchmark
```

## We Are Modular!
If you need a custom build
```
$ npm run build --modules=core,animate,style
$ cat prebuilt/dollar.min.js
$ npm run test
```
Available Modules:
- *core (always included)*
- animate
- compat
- filter
- mutate
- readwrite
- style
- traverse
- trigger
