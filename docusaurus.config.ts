import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const deployEnv = process.env.DEPLOY_ENV ?? process.env.CF_PAGES_BRANCH ?? 'local';
const isStaging = deployEnv === 'staging';
const siteUrl = process.env.SITE_URL ?? (isStaging ? 'https://staging.newenglandme.sh' : 'https://newenglandme.sh');

const config: Config = {
  title: 'New England Mesh',
  tagline: 'Community-built resilient communications for New England.',
  favicon: 'img/logo.png',

  future: {
    v4: true,
  },

  url: siteUrl,
  baseUrl: '/',

  organizationName: 'newenglandmesh',
  projectName: 'newenglandmesh',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/newenglandmesh/newenglandmesh/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/banner.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'New England Mesh',
      logo: {
        alt: 'New England Mesh logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://map.newenglandme.sh/',
          label: 'MeshCore Map',
          position: 'left',
        },
        {
          to: '/regions',
          label: 'Region Boundaries',
          position: 'left',
        },
        {
          to: '/regional-information',
          label: 'Regional Information',
          position: 'left',
        },
        {
          href: 'https://analyzer.newenglandme.sh/',
          label: 'MeshCore Analyzer',
          position: 'left',
        },
        {
          href: 'https://github.com/newenglandmesh/newenglandmesh',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Get started',
              to: '/docs/intro',
            },
            {
              label: 'MeshCore Operations',
              to: '/docs/meshcore-operations',
            },
            {
              label: 'Meshtastic Operations',
              to: '/docs/meshtastic-operations',
            },
            {
              label: 'Contributing',
              to: '/docs/contributing',
            },
          ],
        },
        {
          title: 'Regional tools',
          items: [
            {
              label: 'New England MeshCore Map',
              href: 'https://map.newenglandme.sh/',
            },
            {
              label: 'MeshCore Region Boundaries',
              to: '/regions',
            },
            {
              label: 'Regional Information',
              to: '/regional-information',
            },
            {
              label: 'New England MeshCore Analyzer',
              href: 'https://analyzer.newenglandme.sh/',
            },
            {
              label: 'Healthcheck',
              href: 'https://healthcheck.newenglandme.sh/',
            },
            {
              label: 'New England Mesh Discord',
              href: 'https://discord.newenglandme.sh/',
            },
            {
              label: 'CT Mesh: MeshCore and Meshtastic',
              href: 'https://ctmesh.org/',
            },
          ],
        },
        {
          title: 'Project',
          items: [
            {
              label: 'MeshCore',
              href: 'https://meshcore.io/',
            },
            {
              label: 'Meshtastic',
              href: 'https://meshtastic.org/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/newenglandmesh/newenglandmesh',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} New England Mesh. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
