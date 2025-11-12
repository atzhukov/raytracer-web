# raytracer-web 🔦

## Installation

Before moving on to the next steps, make sure you have [Node.js](https://nodejs.org/en/download) 22.0+ and [pnpm](https://pnpm.io/installation) installed.
Then, install dependencies with:

```sh
$ pnpm install
```

### Compile Ray Tracer

This application consists of two parts: a Rust [ray tracer](https://github.com/atzhukov/raytracer) and a Next.js frontend.
The former has to be compiled to WebAssembly first, for which you will need the [Rust toolchain](https://rust-lang.org/tools/install/).
Then you will need to add the `wasm32-unknown-unknown` target:

```sh
$ rustup target add wasm32-unknown-unknown
```

Then you can compile the WebAssembly binary with:

```sh
$ pnpm build:rt:wasm
```

### Start Next.js App

You will need [Node.js](https://nodejs.org/en/download) 22.0+ (installed with [nvm](https://github.com/nvm-sh/nvm), for example).
Then simply run the following command to start the server:

```sh
$ pnpm dev
```
