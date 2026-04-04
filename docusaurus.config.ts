import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Variant',
  tagline: 'Make a hardware project with a gimmick, get funding to make it!',
  favicon: 'img/favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://variant.taranium.xyz',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/', // like if you want this on a path instead of a subdomain/apex domain

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Taran-the-Idiot', // Usually your GitHub org/user name.
  projectName: 'Variant', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

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
          // Please change this to your repo.
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/preview.jpg',
    navbar: {
      title: 'Variant', // title replace with your site name
      logo: {
        alt: 'Hack Caps Logo',
        src: 'img/hkcps.png',
      },
      items: [
        {  // copy for new section thingies
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'How-To-Start',
        },
        {  // copy for new section thingies
          type: 'docSidebar',
          sidebarId: 'workySidebar',
          position: 'left',
          label: 'Tutorial',
        },
        {
          href: 'https://github.com/Overlord-Runt/Variant', // repo link
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
              label: 'How to Start', // replace with title of the button thing
              to: '/docs/How-To-Start/intro', // path to the doc
            },
            {
              label: 'Tutorial', // replace with title of the button thing
              to: '/docs/Tutorials/intro', // path to the doc
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/Overlord-Runt/Variant',  // repo link
            },
            {
              label: 'Slack',
              href: 'https://hackclub.enterprise.slack.com/archives/C0ANNE0TN7J',
            },
          ],
        },
      ],
      copyright: `Made by @Overlord Runt // Taran The Idiot. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
