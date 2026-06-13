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

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Cloudflare Pages sets CF_PAGES_BRANCH automatically. Production is main;
  // staging is the staging branch/custom domain.
  url: siteUrl,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  organizationName: 'newenglandmesh',
  projectName: 'newenglandmesh',

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
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
              label: 'Overview',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Project',
          items: [
            {
              label: 'Deployment',
              to: '/docs/deployment',
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
