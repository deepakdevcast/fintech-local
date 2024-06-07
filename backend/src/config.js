try {
  process.loadEnvFile();
}catch(e) {
  console.log('.env file not loaded');
}

class EnvConfig {
  static get(key) {
    if (!process.env[key]) {
      throw new Error(`Environment variable ${key} is not defined`);
    }
    return process.env[key];
  }
}

export default EnvConfig;