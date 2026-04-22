# E-Commerce Frontend (Vue 3 + TypeScript)

Single-page storefront built with Vue 3, Composition API, Pinia, and Vue Router 4.

## Architecture Overview

The app is organized by layers:

- `views`: page-level route targets.
- `components`: reusable UI grouped by domain (`home`, `product`, `cart`, `contact`, `about`, `shared`).
- `store/modules`: Pinia stores split by business domain (`product`, `category`, `cart`).
- `services`: API integration and domain-specific async calls.
- `router`: route definitions and guards.
- `types`: shared TypeScript contracts.
- `assets/styles`: global SCSS architecture (7-1 style structure).

## Tech Stack

- Vue `3.5.x` with Composition API
- Vue Router `4.x`
- Pinia `3.x`
- TypeScript `4.9.x`
- Axios
- SCSS (`sass`, `sass-loader`)
- Jest + Vue Test Utils (Vue 3)
- ESLint + Prettier

## Project Structure

```text
app/
|-- public/
|-- src/
|   |-- assets/
|   |   |-- icons/
|   |   |-- images/
|   |   `-- styles/
|   |-- components/
|   |   |-- about/
|   |   |-- cart/
|   |   |-- contact/
|   |   |-- home/
|   |   |-- product/
|   |   |-- product-detail/
|   |   `-- shared/
|   |-- layouts/
|   |-- router/
|   |   |-- guards.ts
|   |   `-- index.ts
|   |-- services/
|   |   |-- http.ts
|   |   |-- product.service.ts
|   |   |-- category.service.ts
|   |   `-- validation.service.ts
|   |-- store/
|   |   |-- index.ts
|   |   `-- modules/
|   |       |-- product/
|   |       |-- category/
|   |       `-- cart/
|   |-- types/
|   |-- utils/
|   |-- views/
|   |   |-- HomeView.vue
|   |   |-- AboutView.vue
|   |   |-- ContactView.vue
|   |   |-- NotFoundView.vue
|   |   `-- products/
|   |       |-- list/ProductsView.vue
|   |       `-- detail/ProductView.vue
|   |-- App.vue
|   |-- main.ts
|   `-- shims-vue.d.ts
|-- tests/
|   `-- unit/
|       |-- components/
|       |-- helpers/
|       `-- store/
|-- .env
|-- jest.config.js
|-- package.json
|-- tsconfig.json
`-- README.md
```

## Routing

Defined in `src/router/index.ts`:

- `/` -> `HomeView`
- `/products` -> `ProductsView`
- `/products/:id` -> `ProductView`
- `/about` -> `AboutView`
- `/contact` -> `ContactView`
- fallback -> `NotFoundView`

Route guards in `src/router/guards.ts`:

- `ensureProductsLoaded`: preloads products before relevant pages.
- `validateProductId`: validates `:id` and redirects invalid values to not found.

## State Management (Pinia)

Stores are under `src/store/modules`:

- `product`: listing data, pagination, category filter, API sorting (`sortBy`, `sortOrder`), product lookup helpers.
- `category`: category fetch + selected category state.
- `cart`: add/remove/increment/decrement cart items and localStorage persistence.

Pinia root instance is created in `src/store/index.ts` and registered in `src/main.ts`.

## API Layer

Configured in `src/services/http.ts` using `VUE_APP_API_BASE_URL`.

Main service calls:

- `productService.getProducts(limit, skip, sortBy, order)`
- `productService.getProductsByCategory(category)`
- `productService.getProductById(id)`
- `categoryService.getCategories()`

## Styling

- Global entry: `src/assets/styles/main.scss`
- SCSS organization: `abstracts`, `base`, `components`, `layout`, `pages`, `themes`, `vendors`
- Component styles use scoped SCSS where appropriate.

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Environment

Create or update `.env`:

```env
VUE_APP_API_BASE_URL=https://dummyjson.com
```

### Run Development Server

```bash
npm run serve
```

## Scripts

```bash
npm run serve         # start local dev server
npm run build         # production build
npm run lint          # lint codebase
npm run test:unit     # run unit tests
npm run coverage      # run unit tests with coverage
npm run format        # format code
npm run format:check  # check formatting
```

## Testing

Unit tests live in `tests/unit`:

- `components`: component behavior tests
- `store`: Pinia store actions/getters/state tests
- `helpers`: shared mount/setup utilities for Vue 3 tests

Run all tests:

```bash
npm run test:unit
```

Run only store tests:

```bash
npm run test:unit -- --runInBand tests/unit/store
```

Run only component tests:

```bash
npm run test:unit -- --runInBand tests/unit/components
```

## Migration Status

- Migrated from Vue 2 Options API to Vue 3 Composition API.
- Migrated from Vuex to Pinia modules.
- Updated router to Vue Router 4.
- Updated component and store unit tests for Vue 3 + Pinia behavior.
