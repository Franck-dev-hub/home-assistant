const configModules = import.meta.glob("./*/config.js", {eager: true});

export const CUSTOM_CONFIGS = Object.values(configModules).map(m => Object.values(m)[0]);
