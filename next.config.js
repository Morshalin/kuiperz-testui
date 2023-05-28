/** @type {import('next').NextConfig} */
/* const nextConfig = {
    env: {
		api_url: 'http://127.0.0.1:8000/api',
	},
	images: {
		domains: ['localhost'],
	},
}

module.exports = nextConfig */

module.exports = {
	env: {
		api_url: 'http://127.0.0.1:8000/api',
		mode: 'development',
	},
	images: {
		domains: ['localhost'],
	},
	// trailingSlash: true,
}

