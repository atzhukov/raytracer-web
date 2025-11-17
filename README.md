# raytracer-web 🔦

A hobby project that builds on the [Rust ray tracer](https://github.com/atzhukov/raytracer) and makes it available in the browser.
This repository contains the interface, while the WebAssembly packaging and publishing is handled in [the other repository](https://github.com/atzhukov/raytracer).

Try it out [here](https://raytracer-web.vercel.app).

## TODO

- Add more object types apart from spheres
- Add ray tracing on the server side
- Fix form labeling issues

## Installation

Before moving on to the next steps, make sure you have [Node.js](https://nodejs.org/en/download)
22.0+ and [pnpm](https://pnpm.io/installation) installed.
Then, install dependencies with:

```sh
$ pnpm install
```

After that, run the following command to start the server:

```sh
$ pnpm dev
```
