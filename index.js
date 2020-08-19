/**
 * @file The Snaked main function file
 * @author Squirrel-Preslash
 * @license MIT
 */

const {camelcase, capitalcase, constcase, cramcase, decapitalcase, dotcase, enumcase, lowercase,
    pascalcase, pathcase, sentencecase, snakecase, spacecase, spinalcase, titlecase, trimcase,
    uppercase} = require('stringcase');


/**
 * Enables snake-case access to camelCase and PascalCase attributes and methods on an object
 * 
 * @param {Object} target - Object to wrap for snake-case access
 * @param {boolean} [use_cache=true] - When a certain snake_cased attribute was resolved to camelCase/PascalCase, don't re-resolve every time the snake_cased attribute is being accessed but return the previously resolved attribute. Improves Performance.
 * @returns {Proxy} - Object whose fields you can access using snake_case syntax instead of camelCase/PascalCase
 */
function snaked(target, use_cache) {
    use_cache = use_cache || true;
    let __resolution_cache = {};
    return new Proxy(target, {
        __clear_cache: function() {
            __resolution_cache = {};
        },

        setget(_target, name, receiver, mode, value) {
            if (use_cache && __resolution_cache.hasOwnProperty(name)) {
                if (mode === "get") return Reflect.get(_target, __resolution_cache[name], receiver);
                else if (mode === "set") return Reflect.set(_target, __resolution_cache[name], value, receiver);
            }
            if (Reflect.has(_target, name)) {
                if (use_cache) __resolution_cache[name] = name;
                if (mode === "get") return Reflect.get(_target, name, receiver);
                else if (mode === "set") return Reflect.set(_target, name, value, receiver);
            } else {
                let camel_case = camelcase(name);
                if (Reflect.has(_target, camel_case) && snakecase(name) === name) {
                    // snakecase(name) === name makes sure that we're only auto-converting snake-case names. Anything else may lead to unexpected results.
                    if (use_cache) __resolution_cache[name] = camel_case;
                    if (mode === "get") return Reflect.get(_target, camel_case, receiver);
                    else if (mode === "set") return Reflect.set(_target, camel_case, value, receiver);
                } else {
                    let pascal_case = pascalcase(name);
                    if (Reflect.has(_target, pascal_case) && snakecase(name) === name) {
                        // snakecase(name) === name makes sure that we're only auto-converting snake-case names. Anything else may lead to unexpected results.
                        if (use_cache) __resolution_cache[name] = pascal_case;
                        if (mode === "get") return Reflect.get(_target, pascal_case, receiver);    
                        else if (mode === "set") return Reflect.set(_target, pascal_case, value, receiver);
                    } else {
                        if (name === "__clear_cache") {
                            return this.__clear_cache;
                        }
                        // go through the usual (now potentially error-throwing) routine of obtaining an attribute
                        if (mode === "get") return Reflect.get(_target, name, receiver);
                        else if (mode === "set") return Reflect.set(_target, name, value, receiver);
                    }
                }
            }
        },

        set(target, name, value, receiver) {
            return this.setget(target, name, receiver, "set", value);
        },

        get(target, name, receiver) {
            return this.setget(target, name, receiver, "get");
        }
    });
}

module.exports = snaked;