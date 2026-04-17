# Vue 2 E-Commerce App

A Vue 2 + TypeScript storefront application with product listing, product details, sorting, cart drawer, category browsing, and static informational pages.

Deployed app:
`https://saqaya-e-commerce-m1qj04gc8-anwars-projects-727fb88d.vercel.app/`

## Tech Stack

- Vue 2 (`vue`, `vue-template-compiler`)
- Vue Router 3
- Vuex 3
- TypeScript
- Axios
- Sass (`sass` + `sass-loader`)
- Jest + Vue Test Utils
- Swiper (home sliders)
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
|   |       |-- abstracts/
|   |       |   |-- _variables.scss
|   |       |   |-- _mixins.scss
|   |       |   |-- _functions.scss
|   |       |   `-- _placeholders.scss
|   |       |-- base/
|   |       |   |-- _typography.scss
|   |       |   `-- _base.scss
|   |       |-- components/
|   |       |   |-- _buttons.scss
|   |       |   |-- _cards.scss
|   |       |   |-- _forms.scss
|   |       |   |-- _modals.scss
|   |       |   `-- _tables.scss
|   |       |-- layout/
|   |       |   |-- _header.scss
|   |       |   |-- _footer.scss
|   |       |   |-- _navigation.scss
|   |       |   |-- _sidebar.scss
|   |       |   `-- _grid.scss
|   |       |-- pages/
|   |       |   |-- _home.scss
|   |       |   |-- _products.scss
|   |       |   |-- _cart.scss
|   |       |   `-- _auth.scss
|   |       |-- themes/
|   |       |   `-- _default.scss
|   |       |-- vendors/
|   |       |   |-- _bootstrap.scss
|   |       |   `-- _vuetify-overrides.scss
|   |       `-- main.scss
|   |-- components/
|   |   |-- about/
|   |   |-- cart/
|   |   |   `-- CartDrawer.vue
|   |   |-- contact/
|   |   |-- home/
|   |   |-- product/
|   |   |   |-- ProductHeader.vue
|   |   |   |-- ProductList.vue
|   |   |   `-- LoadMore.vue
|   |   |-- product-detail/
|   |   `-- shared/
|   |       |-- BreadCrumbs.vue
|   |       `-- ProductCard.vue
|   |-- layouts/
|   |   |-- MainLayout.vue
|   |   |-- HeaderSection.vue
|   |   `-- FooterSection.vue
|   |-- router/
|   |   |-- index.ts
|   |   `-- guards.ts
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
|   `-- main.ts
|-- tests/
|   `-- unit/
|       |-- App.spec.ts
|       `-- components/
|           |-- ProductCard.spec.ts
|           |-- SortDropdown.spec.ts
|           `-- CartDrawer.spec.ts
|-- .env
|-- package.json
`-- README.md
```

## Routing Overview

Configured in `src/router/index.ts`:

- `/` -> Home
- `/products` -> Products list
- `/products/:id` -> Product details (dynamic route)
- `/about` -> About
- `/contact` -> Contact
- `*` -> Not found

Route guards live in `src/router/guards.ts`:

- `ensureProductsLoaded`: preloads products when needed
- `validateProductId`: validates dynamic product id before entering details page

## State Management (Vuex)

Store entry: `src/store/index.ts`

Modules:

- `product`: product list, pagination, loading, `hasMore`
- `category`: category list + loading state
- `cart`: cart items, quantity updates, totals, localStorage persistence

## Styling Architecture

- Global stylesheet entry is `src/assets/styles/main.scss` and is imported in `src/main.ts`.
- Styles follow a 7-1 Sass layout under `src/assets/styles/` (`abstracts`, `base`, `components`, `layout`, `pages`, `themes`, `vendors`).
- Runtime CSS custom properties are exposed in `src/assets/styles/themes/_default.scss` for components that consume `var(--...)`.
- Component, view, and layout style blocks use `<style lang="scss" scoped>`.

## Data Layer

Services are in `src/services/`:

- `http.ts`: Axios instance (`VUE_APP_API_BASE_URL`)
- `product.service.ts`: fetch product list + fetch product by id
- `category.service.ts`: fetch categories
- `validation.service.ts`: contact form validation

## Key Feature Notes

- Product sorting (price/rating) is handled in `ProductsView.vue`.
- Product detail uses route param (`$route.params.id`) to load the product.
- Breadcrumbs use route query context (`from`, `fromLabel`, etc.) when navigating between list/detail.
- Cart drawer UI is in `src/components/cart/CartDrawer.vue`; cart state is in Vuex `cart` module.

## Getting Started

### Prerequisites

- Node.js 18.12+ recommended
- npm

### Install

```bash
npm install
```

### Environment

`.env` currently uses:

```env
VUE_APP_API_BASE_URL=https://dummyjson.com
```

## Available Scripts

```bash
npm run serve         # start dev server (hot reload)
npm run build         # production build
npm run lint          # lint project
npm run test:unit     # run unit tests
npm run coverage      # run tests with coverage
npm run format        # apply prettier formatting
npm run format:check  # check formatting
```

## Testing

Unit tests are under `tests/unit`.

Current component test files:

- `ProductCard.spec.ts`
- `SortDropdown.spec.ts`
- `CartDrawer.spec.ts`

Run:

```bash
npm run test:unit
```

## Configuration Reference

- Vue CLI docs: `https://cli.vuejs.org/config/`
