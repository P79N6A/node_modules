## gulp-css [![](http://img.shields.io/npm/v/gulp-css.svg?style=flat)](https://www.npmjs.org/package/gulp-css)
> css minfy plugin

## Usage
```
var cssMin = require('gulp-css');

gulp.task('cssMinfy', function(){
  return gulp.src('src/**/*.css')
    .pipe(cssMin())
    .pipe(gulp.dest('build/'));
});

```
## Options
> the same of [clean-css](https://github.com/GoalSmashers/clean-css#how-to-use-clean-css-programmatically) option

## update log
* 2014-5-23 first version
* 2014-8-28 [delete unused package gulp-util](https://github.com/karoo/gulp-css/issues/2)
* 2014-9-19 fixed bug (use rename({suffix: "-min"} Execute 2 times）

## LICENSE
The MIT License (MIT)

Copyright (c) 2014 [karoo](https://github.com/karoo/gulp-css)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

