# as-container

![CI](https://github.com/yjhmelody/as-container/workflows/CI/badge.svg)
[![npm version](https://img.shields.io/npm/v/as-container?color=light-green&label=npm%20package)](https://img.shields.io/npm/v/as-container?color=light-green&label=npm%20package)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/yjhmelody/as-container)

as-container provides some utils such as Option and Result inspired by Rust for other people to use.

## Example

```typescript
const x = Option.Some("some");
expect(x.map<string>((s) => s + s).unwrap()).toBe("somesome");
```

More examples can be found in [unit tests](./assembly/__tests__/option.spec.ts)
