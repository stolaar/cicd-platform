### ⚠️ Before Starting

Requirements
 - Node version >=18.12.1
 - Yarn >=1.22.15

Before starting the project
 - Copy `apps/web/.env.example` to `apps/web/.env.local`
 - Make sure you have the correct datasource config in `apps/api/datasources/db.datasource.ts`

Install project dependencies
```bash
yarn
```

### Structure

```
├── 📁 apps
  ├── 📁 api
  ├── 📁 web
  ├── ...
├── 📁 packages
├── package.json
```

## Running the project 🏃‍

```bash
 yarn dev
```