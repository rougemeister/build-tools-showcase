# Build Tools Showcase

A modern frontend boilerplate setup showcasing **Webpack**, **TypeScript**, **Sass**, **ESLint**, **Prettier**, and **Jest** — designed for scalable, maintainable web applications.

**Live**: [quiet-cascaron.netlify.app](https://quiet-cascaron-cdce46.netlify.app/)  
**Repository**: [github.com/rougemeister/build-tools-showcase](https://github.com/rougemeister/build-tools-showcase)

---

## 🚀 Project Overview

This project serves as a demonstration of setting up a robust frontend tooling system with:

- **Bundling**: via Webpack
- **Scripting**: in TypeScript
- **Styling**: with Sass
- **Linting**: with ESLint
- **Formatting**: using Prettier
- **Testing**: using Jest with TypeScript + ESM support

---

## ⚙️ Setup & Run Instructions

### 1. Clone and Install

```bash
git clone https://github.com/rougemeister/build-tools-showcase.git
cd build-tools-showcase
npm install
```

### 2. Development Server

```bash
npm run dev
```

This runs the app locally on `http://localhost:8080/`.

### 3. Build for Production

```bash
npm run build
```

Output is placed in the `dist/` directory:
- `dist/index.html`
- `dist/scripts/script.js`

---

## 🛠 Build Process Overview

### Webpack

The project uses three configurations:
- `webpack.common.js` – shared config (entry, output, loaders)
- `webpack.dev.cjs` – development server with live reloading
- `webpack.prod.cjs` – production build with optimizations

HTML is injected using `HtmlWebpackPlugin`, and output is separated:
- HTML → `dist/index.html`
- Scripts → `dist/scripts/script.js`

### TypeScript

Configured via `ts-loader`, source files are compiled from `.ts` in `src/scripts/` to JavaScript output in `dist/scripts/`.

### Sass

Sass files are processed through:
```bash
style-loader → css-loader → sass-loader
```

This enables modular and maintainable SCSS styling directly in the build pipeline.

---

## 🧹 Linting & Formatting Strategy

### ESLint

Defined via an `eslint.config.js` using the following:
- Plugin: `@typescript-eslint`
- Rules:
  - `no-console`: Only `warn` and `error` allowed
  - Enforces semicolons

### Prettier

Enforced via `.prettierrc`:
```json
{
  "singleQuote": true,
  "semi": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2
}
```

### Combined Check

Run both linter and formatter together:

```bash
npm run check
```

Auto-fix:

```bash
npm run fix
```

---

## 📜 Available npm Scripts

| Script       | Description                                         |
|--------------|-----------------------------------------------------|
| `dev`        | Run Webpack Dev Server (with HMR)                   |
| `build`      | Build optimized production bundle                   |
| `lint`       | Run ESLint on `.ts` and `.js` files                 |
| `format`     | Format code with Prettier                           |
| `check`      | Run both `lint` and `format` checks                 |
| `fix`        | Auto-fix lint and format issues                     |
| `test`       | Run unit tests using Jest                           |
| `precommit`  | Pre-commit hook to run lint and format              |
| `prepare`    | Hook Husky installation                             |

---

## ✅ Testing

### Tool: **Jest** with `ts-jest` and ESM support

**Key config:**

```js
preset: 'ts-jest/presets/default-esm',
testEnvironment: 'jest-environment-jsdom',
extensionsToTreatAsESM: ['.ts'],
transform: {
  '^.+\.tsx?$': ['ts-jest', { useESM: true }]
}
```

### Run Tests:

```bash
npm run test
```

SCSS imports are mocked using:

```js
'\.(css|scss|sass|less)$': 'identity-obj-proxy'
```

This allows component styles to be tested without error.

---

## 🧪 Tools Used

| Tool               | Purpose                          |
|--------------------|----------------------------------|
| Webpack            | Module bundling                  |
| TypeScript         | Static typing and modern JS      |
| Sass               | Advanced CSS pre-processing      |
| ESLint             | Code quality and rule enforcement|
| Prettier           | Code formatting                  |
| Jest + ts-jest     | Unit testing                     |
| Husky              | Git hooks for pre-commit checks  |

---

## 📁 Folder Structure

```
build-tools-showcase/
├── dist/
│   ├── index.html
│   └── scripts/
├── src/
│   ├── scripts/
│   └── index.html
├── webpack.common.js
├── webpack.dev.cjs
├── webpack.prod.cjs
├── eslint.config.js
├── jest.config.js
├── .prettierrc
└── package.json
```

---

## 📌 Notes

- Ensure Node.js 18+ is installed for full ESM support.
- Git hooks are powered by Husky; use `npm install` to enable hooks via `prepare`.

---

Happy hacking! 💻✨