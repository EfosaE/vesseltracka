import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'VesselTracka',
    short_name: 'VT',
    description: 'A Progressive Web App for follow-up management',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b1e4d7',
    icons: [
      {
        src: '/pwaicon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/pwaicon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}