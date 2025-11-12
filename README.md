# raytracer-web 🔦

## Installation

Before moving on to the next steps, make sure you have [Node.js](https://nodejs.org/en/download) 22.0+ and [pnpm](https://pnpm.io/installation) installed.
Then, install dependencies with:

```sh
$ pnpm install
```

### Compile Ray Tracer (optional)

This application consists of two parts: a Rust [ray tracer](https://github.com/atzhukov/raytracer) and a Next.js frontend.
The repository already includes a `.wasm` binary, however, you can also compile it yourself.
You will need the [Rust toolchain](https://rust-lang.org/tools/install/).
Then, add the `wasm32-unknown-unknown` target:

```sh
$ rustup target add wasm32-unknown-unknown
```

After which you can compile the WebAssembly binary with:

```sh
$ pnpm build:rt:wasm
```

### Start Next.js App

Simply run the following command to start the server:

```sh
$ pnpm dev
```
