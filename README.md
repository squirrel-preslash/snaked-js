[![Test Status](https://github.com/squirrel-preslash/snaked-js/workflows/Test%20Snaked/badge.svg)](https://github.com/squirrel-preslash/snaked-js/actions)

Slim. Beautiful. Snaked.

**This module is also available for Python as `snaked-py`.**

# Snaked - Snakifying Your JavaScript Code

`snaked-js` is a universal wrapper for JavaScript objects of all kinds.
It allows you to access `camelCase` and `PascalCase` fields of wrapped objects using
`snake_case` syntax.

## Installation

You can install the latest stable release of `snaked-js` using npm:

`$ npm install --save snaked-js`

## Requirements

This is a CommonJS module. It will work out of the box with NodeJS.
It requires at least **ECMAScript 2015 / ES6**.

## Features

- auto-enables snake_case access for camelCase objects
- autp-enables snake_case access for PascalCase objects
- wraps around any kind of object/3rd-party module/etc.
- includes runtime optimizations like caching
- lightweight with only one dependency

## Why should I use Snaked?

JavaScript has no standard guidelines for coding style. If you're used to the
snake_case syntax or if your backend is written in a Python-like coding language and you
want to have a consistent coding style, you might want to write JavaScript using
snake_case syntax instead of camelCase.

Since there's a broad range of camelCase JavaScript objects, classes and functions,
you would write inconsistent code if you decided to use snake_case names for your own
code parts.

`Snaked` solves this problem by providing convenient wrapper utilities for accessing your
camelCase objects using the preferred snake_case syntax.

## Example Usage

Let's use the following class in this example:

```
class Camel {
    createMe(name) {
        this.name = name;
    }
    sayHello() {
        console.log("Hey, I'm " + self.name);
    }
}
```

Usual access:

```
> let animal = new Camel();
> animal.createMe("Mr. C. Java");
> animal.sayHello();
Hey, I'm Mr. C. Java
```

Snaked Access:

```
> const snaked = require("snaked-js");
> let animal = snaked(new Camel());
> animal.create_me("Mr. C. JavaScript");
> animal.say_hello();
Hey, I'm Mr. C. JavaScript
```

## Edge Cases

Snaked uses resolution-caching by default to improve performance.
In some rare situations, you might remove camelCase/pascalCase-attributes
of your wrapped objects and re-introduce them in a different case.

Example:

```
> let original = new Camel();
> let animal = snaked(original);
> animal.create_me("Mr. Ed");
> animal.say_hello();
Hey, I'm Mr. Ed
> original.SayHello = original.sayHello;
> delete original.sayHello;
> animal.say_hello()
TypeError: 'sayHello' is not a function
```

You will then have to clear the resolution cache to let Snaked search again for the
corresponding new camelCase/PascalCase/snake_case version:

```
> original.SayHello = original.sayHello;
> delete original.sayHello;
> animal.__clear_cache(); // <- this line is important
> animal.say_hello();
Hey, I'm Mr. Ed
```

---------------------------------

You can also circumvent this situation by preventing Snaked from caching resolved attributes.
Note however, that this will decrease your program's performance drastically.

```
let animal = snaked(original, false) // added use_cache=false as 2nd argument
```

## License

This project is licensed under the MIT license by Squirrel-Preslash.
It is free to use for any commercial or non-commercial purpose.

If you do so, you are required to include the full license text in a special section of your
compiled program (i.e. in a credits or startup screen) or a copy of the license in the distributed
source code.
