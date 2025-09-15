module.exports = {
	plugins: {
		"@tailwindcss/postcss": {},
		"postcss-preset-mantine": {},
		"postcss-simple-vars": {
			variables: {
				"mantine-breakpoint-sm": "40rem",
				"mantine-breakpoint-md": "48rem",
				"mantine-breakpoint-lg": "64rem",
				"mantine-breakpoint-xl": "80rem",
			},
		},
	},
};
