const snaked = require("./index.js");

class CamelClass {
    methodOne() {return true}
    method_two() {return false}
    methodTwo() {return true}
    attributeOne = true;
}

class PascalClass {
    MethodOne() {return true}
    method_two() {return false}
    MethodTwo() {return true}
    AttributeOne = true;
}

class SnakeClass {
    method_one() {return true}
    method_two() {return false}
    methodTwo() {return false}
    attribute_one = true;
}

let camel_class;
let pascal_class;
let snake_class;

beforeEach(() => {
    camel_class = snaked(new CamelClass());
    snake_class = snaked(new SnakeClass());
    pascal_class = snaked(new PascalClass());
});

test("functions can be resolved for snake-case access", () => {
    expect(camel_class.method_one()).toBe(true);
    expect(pascal_class.method_one()).toBe(true);
    expect(snake_class.method_one()).toBe(true);
});

test("properties can be resolved for snake-case access", () => {
    expect(camel_class.attribute_one).toBe(true);
    expect(pascal_class.attribute_one).toBe(true);
    expect(snake_class.attribute_one).toBe(true);
});

test("non-existent fields cannot be resolved", () => {
    expect(camel_class.non_existent).toBeUndefined();
    expect(pascal_class.non_existent).toBeUndefined();
    expect(snake_class.non_existent).toBeUndefined();
});

test("camelCase/PascalCase function access won't resolve on a snake_case class definition", () => {
    // (it would be the wrong direction)
    expect(snake_class.methodOne).toBeUndefined();
    expect(snake_class.MethodOne).toBeUndefined();
});

test("camelCase/PascalCase property access won't resolve on a snake_case class definition", () => {
    // (it would be the wrong direction)
    expect(snake_class.attributeOne).toBeUndefined();
    expect(snake_class.attributeOne).toBeUndefined();
});

test("case resolution happens in the right order (original -> camelCase -> PascalCase)", () => {
    expect(camel_class.method_two()).toBe(false);
    expect(pascal_class.method_two()).toBe(false);
    expect(snake_class.method_two()).toBe(false);

    expect(camel_class.methodTwo()).toBe(true);
    expect(pascal_class.MethodTwo()).toBe(true);
    expect(snake_class.method_two()).toBe(false);
});

test("setting snake-case properties will instead set existing camelCase/PascalCase on the target object", () => {
    camel_class.attribute_one = false;
    pascal_class.attribute_one = false;
    expect(camel_class.attributeOne).toBe(false);
    expect(pascal_class.AttributeOne).toBe(false);
});