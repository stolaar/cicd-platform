module.exports = {
  "apps/web/**/*.{js,ts,jsx,tsx}": (files) =>
    [`yarn workspace @stolaar/web lint --max-warnings=0 ${files.map(file => `"${file.split('apps/web/').pop()}"`).join(" ")}`],
  "apps/api/**/*.{js,ts,jsx,tsx}": (files) => [`yarn workspace @stolaar/api lint --max-warnings=0 ${files.map(file => `"${file.split('apps/api/').pop()}"`).join(" ")}`]
}
