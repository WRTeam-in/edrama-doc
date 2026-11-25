// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/**
 * eDrama documentation site.
 *
 * To host it somewhere else, set DOCS_URL and DOCS_BASE_URL when you build, for example:
 *   DOCS_URL=https://wrteam-in.github.io DOCS_BASE_URL=/edrama-doc/ npm run build
 */
const siteUrl = process.env.DOCS_URL || 'https://docs.edrama.example';
const baseUrl = process.env.DOCS_BASE_URL || '/';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'eDrama Documentation',
  tagline: 'Install, run and grow your short-drama streaming platform.',
  favicon: 'img/brand/favicon.png',

  url: siteUrl,
  baseUrl,
  trailingSlash: true,
  organizationName: 'WRTeam-in',
  projectName: 'eDrama-Doc',
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  headTags: [
    {tagName: 'meta', attributes: {name: 'theme-color', content: '#000000'}},
  ],

  // A slim reading-progress bar on documentation pages.
  clientModules: ['./src/clientModules/readingProgress.js'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs',
          routeBasePath: 'docs',
          sidebarPath: './sidebars.js',
          breadcrumbs: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      /** @type {import('@easyops-cn/docusaurus-search-local').PluginOptions} */
      ({
        hashed: true,
        language: ['en'],
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        docsRouteBasePath: 'docs',
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        searchResultLimits: 12,
        searchResultContextMaxLength: 70,
        searchBarShortcutHint: true,
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/brand/logo-dark-lg.png',
      metadata: [
        {name: 'keywords', content: 'eDrama, short drama, streaming app, documentation, admin panel, creator portal, Flutter, Laravel'},
      ],
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 3,
      },
      announcementBar: {
        id: 'edrama-v1',
        content: `<span class="ed-ann-long">eDrama documentation</span><span class="ed-ann-sep">·</span><span class="ed-ann-mid">New here? Start with the</span><span class="ed-ann-short">New here?</span><a href="${baseUrl}docs/getting-started/launch-checklist/">launch checklist</a>`,
        // The bar is brand black in both themes; these replace Docusaurus's inline white and black.
        backgroundColor: '#070708',
        textColor: '#b4b1a8',
        isCloseable: true,
      },
      navbar: {
        title: 'Docs',
        hideOnScroll: false,
        logo: {
          alt: 'eDrama',
          src: 'img/brand/logo-light.png',
          srcDark: 'img/brand/logo-dark.png',
          height: 28,
        },
        items: [
          {type: 'doc', docId: 'intro', label: 'Introduction', position: 'left'},
          {
            type: 'dropdown',
            label: 'Setup',
            position: 'left',
            items: [
              {type: 'docSidebar', sidebarId: 'install', label: 'Server installation'},
              {type: 'docSidebar', sidebarId: 'appsetup', label: 'Mobile app setup'},
              {type: 'docSidebar', sidebarId: 'website', label: 'Website setup'},
            ],
          },
          {type: 'docSidebar', sidebarId: 'admin', label: 'Admin Panel', position: 'left'},
          {type: 'docSidebar', sidebarId: 'creator', label: 'Creator Portal', position: 'left'},
          {type: 'docSidebar', sidebarId: 'app', label: 'Viewer App', position: 'left'},
          {type: 'docSidebar', sidebarId: 'money', label: 'Monetization', position: 'left'},
          {type: 'docSidebar', sidebarId: 'integrations', label: 'Integrations', position: 'left'},
          {
            type: 'dropdown',
            label: 'Help',
            position: 'left',
            items: [
              {type: 'doc', docId: 'help/faqs', label: 'FAQs'},
              {type: 'doc', docId: 'help/troubleshooting', label: 'Troubleshooting'},
              {type: 'doc', docId: 'help/support', label: 'Support'},
              {type: 'doc', docId: 'help/changelog', label: 'Changelog'},
            ],
          },
          {type: 'search', position: 'right'},
          {href: 'https://www.wrteam.in/', label: 'WRTeam', position: 'right', className: 'navbar-company'},
        ],
      },
      footer: {
        style: 'dark',
        logo: {
          alt: 'eDrama',
          src: 'img/brand/logo-dark.png',
          height: 30,
        },
        links: [
          {
            title: 'Get started',
            items: [
              {label: 'Introduction', to: '/docs/intro/'},
              {label: 'Launch checklist', to: '/docs/getting-started/launch-checklist/'},
              {label: 'Server installation', to: '/docs/installation/overview/'},
              {label: 'Mobile app setup', to: '/docs/app-setup/overview/'},
              {label: 'Website setup', to: '/docs/website/overview/'},
            ],
          },
          {
            title: 'Guides',
            items: [
              {label: 'Admin Panel', to: '/docs/admin/overview/'},
              {label: 'Creator Portal', to: '/docs/creator/overview/'},
              {label: 'Viewer App', to: '/docs/viewer-app/overview/'},
              {label: 'Monetization', to: '/docs/monetization/overview/'},
            ],
          },
          {
            title: 'Help',
            items: [
              {label: 'FAQs', to: '/docs/help/faqs/'},
              {label: 'Troubleshooting', to: '/docs/help/troubleshooting/'},
              {label: 'Integrations', to: '/docs/integrations/overview/'},
              {label: 'Support', to: '/docs/help/support/'},
            ],
          },
          {
            title: 'WRTeam',
            items: [
              {label: 'Website', href: 'https://www.wrteam.in/'},
              {label: 'Email support', href: 'mailto:support@wrteam.in'},
              {label: 'Find your purchase code', href: 'https://help.market.envato.com/hc/en-us/articles/202822600-Where-Is-My-Purchase-Code-'},
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} WRTeam. All rights reserved.`,
      },
      prism: {
        theme: prismThemes.oneDark,
        darkTheme: prismThemes.oneDark,
        additionalLanguages: ['bash', 'php', 'dart', 'ini', 'nginx', 'apacheconf', 'kotlin', 'properties', 'yaml', 'json', 'diff'],
      },
    }),
};

export default config;
