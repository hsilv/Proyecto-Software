async function importCommonJSModule(modulePath) {
  const { default: module } = await import(modulePath);
  return module;
}

export default importCommonJSModule;
