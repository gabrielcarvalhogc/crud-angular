module.exports = {
  preset: 'jest-preset-angular',
    // adicionados para evitar vazamentos
  detectOpenHandles: true,
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  testEnvironment: 'jsdom'
};
