module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@tests/(.*)$': '<rootDir>/tests/unit/$1',
  },
  collectCoverageFrom: [
    'src/components/**/*.vue',
    '!src/components/home/ExploreProducts.vue',
    '!src/components/home/FlashSales.vue',
  ],
}
