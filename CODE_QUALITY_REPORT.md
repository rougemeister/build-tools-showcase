
# 🧾 Code Quality Report – Build Tools Showcase

**Date:** May 29, 2025  
**Project:** `build-tools-showcase`  
**Lint Command:** `eslint . --ext .js,.ts`  
**Tooling:** ESLint

---

## 🔍 Summary

- **Total Issues Found:** 17
- **Errors:** 17
- **Warnings:** 0

---

## ⚠️ Detailed Issues

### 1. **Disallowed Console Usage**

| File | Line | Issue |
|------|------|-------|
| `src/scripts/script.ts` | 3 | `console.log` is not allowed – only `console.warn` and `console.error` are permitted by the `no-console` rule. |

**Recommendation:** Replace `console.log` with `console.warn` or `console.error`, or remove it if unnecessary.

---

### 2. **Common Issues in Webpack Config Files**

Files affected:
- `webpack.common.js`
- `webpack.dev.js`
- `webpack.prod.js`

**Errors:**

| Rule | Description | Count |
|------|-------------|-------|
| `@typescript-eslint/no-require-imports` | Forbids `require()` syntax in TypeScript files. | 6 |
| `no-undef` | `require`, `module`, and `__dirname` are undefined in ES module or browser environments. | 9 |

**Details:**

| File | Line | Issue |
|------|------|-------|
| All webpack files | Lines 2-5 | Use of `require`, `module`, and `__dirname` is flagged as undefined. |

**Recommendation:**
- If these files are not TypeScript (i.e., `.js`), remove `@typescript-eslint` rules from them by excluding them in `.eslintignore` or configuring `.eslintrc` overrides.
- Otherwise, consider switching to ES module syntax:
  ```ts
  import path from 'path';
  import { fileURLToPath } from 'url';
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  ```

---

## ✅ Suggested Fixes

1. **Console Usage**
   - Replace `console.log(...)` with:
     ```ts
     console.warn('message'); // or
     console.error('message');
     ```

2. **Module Imports**
   - Replace `require(...)` with ES6 `import` syntax where possible.
   - Or update ESLint config to allow CommonJS in config files using overrides:
     ```json
     "overrides": [
       {
         "files": ["webpack.*.js"],
         "env": {
           "node": true
         },
         "rules": {
           "@typescript-eslint/no-require-imports": "off",
           "no-undef": "off"
         }
       }
     ]
     ```

3. **Global Variables in Node**
   - Ensure `env.node` is enabled in `.eslintrc`:
     ```json
     {
       "env": {
         "node": true
       }
     }
     ```

---

## 📊 Issue Breakdown by File

| File | Errors |
|------|--------|
| `script.ts` | 1 |
| `webpack.common.js` | 5 |
| `webpack.dev.js` | 3 |
| `webpack.prod.js` | 3 |
| **Total** | **17** |

---

## 🛠️ Recommendations

- **Update ESLint configuration** to use proper environment and file-specific overrides.
- **Use consistent module syntax** (ES6 or CommonJS).
- **Avoid console logs** in production code – use logging utilities or proper logging levels.