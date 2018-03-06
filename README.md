# DollarJS

**A lighter, faster, modular jQuery replacement (manipulate DOM, bind events, and more...)**

[Homepage](http://seebigs.github.io/dollar-js) | [API Documentation](http://seebigs.github.io/dollar-js/api)

## Download & Embed
 * [Full](https://raw.githubusercontent.com/seebigs/dollar-js/master/prebuilt/dollar.js) (dollar.js)
 * [Minified](https://raw.githubusercontent.com/seebigs/dollar-js/master/prebuilt/dollar.min.js) (dollar.min.js)
```html
<script src="dollar.min.js"></script>
```

## Install & Require
Available as an [NPM package](https://www.npmjs.com/package/dollar-js)
```
$ npm install dollar-js --save
```
```js
var $ = require('dollar-js');
```

## Simple Usage
See more examples in our [API Documentation](http://seebigs.github.io/dollar-js/api)
```js
var $body = $('body').css({ background: '#369' });
$body.addClass('foo').on('click', function () { console.log(this.className); });
```

## Need Ajax?
For optimal performance, Ajax features are not included in DollarJS by default. If you need them, simply add the [DollarJS Ajax Plugin](https://github.com/seebigs/dollar-js-ajax) to your page alongside the original library.
```html
<script src="dollar.js"></script>
<script src="dollar.ajax.js"></script>
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
In the current build, we clock ourselves at over **4x faster** on average across various operations!

See for yourself
```
$ npm run benchmark
```

## We Are Modular!
If you need a custom build
```
$ npm run build --modules=core,animate,style
$ cat prebuilt/dollar.min.js
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

## Test Coverage

We have strong test coverage that compares DollarJS behavior against similar methods in jQuery and against expected results on a fixtured document
```
$ npm run test
$ node bundl test --run=path/in/spec.js
$ node bundl test --run=path/to/category
```
Currently, these unit tests only run in a Node.js environment, but we have plans to expand our automated coverage across browsers.

---

# Contribute
Help us make DollarJS as useful and compatible as possible.

## Bugs

Report and discuss [issues on Github](https://github.com/seebigs/dollar-js/issues)

Please review our [limitations](http://seebigs.github.io/dollar-js/limitations/) and help us to overcome them.

## Write Code

Contribute changes using the following steps:
 1. Create a new feature branch from the latest master, then make and save your changes
 2. Run `npm run test` and ensure that all tests pass
 2. Commit your changes to your branch
 3. Add a [pull request](https://github.com/seebigs/dollar-js/pulls) and get some code review
 4. Merge your branch into master

Publish the latest changes:
 1. Increment the DollarJS version number in package.json following [semantic versioning](https://www.sitepoint.com/semantic-versioning-why-you-should-using/) ("x.y.1" -> "x.y.2")
 2. Commit this change to master with the new version number in your message ("CB: npm publish x.y.2")
 3. Run `npm publish` from the project root
