# Spritelab Export
if your looking at this project it must mean you have some interest in getting something like this to work
this is **NOT** affiliated with [code.org](https://studio.code.org) and is very much going out of your way to run a project like this one

## Exporting a spritelab project

### How do i export it?
- naviagate to your project
- open up the devtools I.E. *F12 or CTRL + SHIFT + I*
- run the following code in the webtool editor
```js
__mostRecentGameLabInstance.studioApp_.editor = {getValue: function() { return __mostRecentGameLabInstance.currentCode}}
__mostRecentGameLabInstance.exportApp()
```
this ensures you get the proper `code.js` function calls compared to the original main.json file
- manually fix animation asset paths to the local ones **mainly your looking for the rootRelativePath that loads them in** and stripping the full path up to the category_<\subject>/<\image>.png
- global scope the first line of your userscript code if you have variables! specifically define them after this line
```js
var p5Inst = new p5(null, 'sketch');
// your first line of userscript variables, var myvar, count, etc..;
```
- edit your `index.html` to list the proper dependencies within this file mainly these two
```html
<script src="spritelab-api.js"></script>
<link href="spritelab.css" rel="stylesheet" type="text/css">
```
and with that you should be all set! since this project doesn't rely too much on CDO's backend all you need is an effective way of hosting your static files github can do that for you and not only that give you a runnable link within a project domain <br>
or <br>
you could relax your browser restrictions to allow local asset files to load in directly from your modified html file if you so choose
