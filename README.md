# as-container

![CI](https://github.com/yjhmelody/as-container/workflows/CI/badge.svg)
[![npm version](https://img.shields.io/npm/v/as-container?color=light-green&label=npm%20package)](https://img.shields.io/npm/v/as-container?color=light-green&label=npm%20package)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/yjhmelody/as-container)

as-container provides some utils such as `Option` and `Result` inspired by Rust for other people to use.

## APIs

### Box

Box is used to wrap non-nullable(or primitive) value such as i32. Box offers all operator overloads to call the inner type operator.

Box usage scenarios are mainly used when a function or field needs to be null. This is very common in the case of generic functions and generic classes. The generics you write for reference types cannot be used for basic types, and Box is a reference type.

```ts
import { Box } from "as-container";

let box = Box.from(2);
let box2 = Box.from(1);
expect(box == box2).toStrictEqual(false);
expect(box != box2).toStrictEqual(true);
```

More examples can be found in [unit tests](./assembly/__tests__/box.spec.ts)

### Option

Option offers some operations inspired by Rust.

```ts
import { Option } from "as-container";

const x = Option.Some("some");
expect(x.map<string>((s) => s + s).unwrap()).toBe("somesome");
```

More examples can be found in [unit tests](./assembly/__tests__/primitive/option.spec.ts)

### Result

Result offers some operations inspired by Rust.

```ts
import { Result } from "as-container";

const x = Result.Ok<string, string>("233");
expect(x.map<string>((s) => s + s).unwrap()).toBe("233233");
```

More examples can be found in [unit tests](./assembly/__tests__/primitive/result.spec.ts)

### Others

`as-container` offers two versions of Result/Option. They provide the same API, but different implementations.

The default version can handle any type including primitive type. But because the primitive types need one more byte to record state, it may take more overhead.

If you always use reference types as Option/Result parameters and need better performance, then you can use the type with the same name under `as-container/reference`.
