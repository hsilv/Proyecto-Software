/* eslint-disable no-undef */
module.exports = {
    transform: {
      "^.+\\.[jt]sx?$": "babel-jest",
      "^.+\\.mjs$": "@swc-node/jest",
    },
    transformIgnorePatterns: [
      "node_modules/(?!(swiper)/)"
    ],
    moduleFileExtensions: ["js", "jsx", "mjs"],
    testEnvironment: "jsdom",
    moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
        "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js", // Mock para los archivos CSS
    },
  };