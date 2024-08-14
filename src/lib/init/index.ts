const ENV_VARS_NAMES = [
  'API_URL'
];

export function checkEnvVars() {
  const missing_vars = [];

  for (const var_name of ENV_VARS_NAMES) {
    if (!process.env[var_name]) {
      missing_vars.push(var_name);
    }
  }

  if (missing_vars.length != 0) {
    throw new Error('Missing environment variables: ' + missing_vars.join(', '));
  }

}
