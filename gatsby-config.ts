import type { GatsbyConfig } from 'gatsby';

require('dotenv').config({
  path: `.env.public`
});

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: `https://barbara-mauz.at/`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  flags: {
    DEV_SSR: false
  },
  plugins: [
    `gatsby-plugin-cloudflare-pages`,
    {
      resolve: `gatsby-plugin-jaen`,
      options: {
        pylonUrl: 'https://pylons.photonq.org/jaen-agent/graphql',
        remote: {
          repository: 'netsnek/netsnek.com'
        },
        zitadel: {
          organizationId: '268207341512496739',
          clientId: '268418317486724723@photonq',
          authority: 'https://accounts.photonq.org',
          redirectUri:
            process.env.NODE_ENV === 'production'
              ? 'https://dev.barbara-mauz.at/'
              : 'https://psychic-dollop-6vwv6x9vq9jf464g-8000.app.github.dev',
          projectIds: ['263491274097563233']
        },
        // sentry: {
        //   org: 'photonq',
        //   project: 'website',
        //   dsn: 'https://37ffbc7589f79cfab5936ce5fca4f310@sentry.cronit.io/10'
        // },
        googleAnalytics: {
          trackingIds: ['G-M58K75M9PG']
        }
      }
    },
    {
      resolve: `gatsby-jaen-mailpress`,
      options: {
        pylonUrl: 'https://pylons.photonq.org/mailpress/graphql'
      }
    }
  ]
};

export default config;
