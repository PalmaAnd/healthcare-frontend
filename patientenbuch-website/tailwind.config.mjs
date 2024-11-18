/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: '#DEF9C4',
				secondary: '#9CDBA6',
				accent: '#50B498',
				background: '#468585'
			}
		},
	},
	plugins: [],
}
