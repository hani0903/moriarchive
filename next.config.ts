import type { NextConfig } from 'next';
const config: NextConfig = {
    reactStrictMode: true,
    // Next 16 only serves listed qualities. 90 is for the profile photo; the rest stay at the default 75.
    images: { qualities: [75, 90] },
};
export default config;
