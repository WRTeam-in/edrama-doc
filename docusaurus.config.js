// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** Each top-level folder is its own docs section with its own sidebar. */
const sections = [
  { id: 'mobile-app', sidebar: './mobileAppSidebar.js' },
  { id: 'admin-panel', sidebar: './adminPanelSidebar.js' },
  { id: 'website', sidebar: './websiteSidebar.js' },
  { id: 'creator-portal', sidebar: './creatorPortalSidebar.js' },
  { id: 'features', sidebar: './featuresSidebar.js' },
];

const singlePages = ['support', 'faqs', 'changelog'];

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'eDrama Documentation',
  tagline: 'Install, configure and re-brand eDrama: the app, the Admin Panel, the website and the Creator Portal.',
  favicon: 'images/brand/favicon.png',

  url: 'https://wrteam-in.github.io',
  baseUrl: '/edrama-doc/',
  organizationName: 'WRTeam-in',
  projectName: 'edrama-doc',
  deploymentBranch: 'gh-pages',
  trailingSlash: true,

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    ...sections.map(({ id, sidebar }) => [
      '@docusaurus/plugin-content-docs',
      {
        id,
        path: id,
        routeBasePath: id,
        sidebarPath: require.resolve(sidebar),
      },
    ]),
    ...singlePages.map((id) => [
      '@docusaurus/plugin-content-docs',
      {
        id,
        path: id,
        routeBasePath: id,
        sidebarItemsGenerator: async () => [],
      },
    ]),
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  headTags: [
    { tagName: 'link', attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
    { tagName: 'link', attributes: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' } },
  ],

  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap',
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'images/brand/social-card.jpg',
      metadata: [{ name: 'theme-color', content: '#000000' }],
      navbar: {
        logo: {
          alt: 'eDrama',
          src: 'images/brand/logo-horizontal-light.svg',
          srcDark: 'images/brand/logo-horizontal-dark.svg',
          height: 30,
        },
        items: [
          { docsPluginId: 'mobile-app', type: 'docSidebar', sidebarId: 'mobileAppSidebar', position: 'left', label: 'Mobile App' },
          { docsPluginId: 'admin-panel', type: 'docSidebar', sidebarId: 'adminPanelSidebar', position: 'left', label: 'Admin Panel' },
          { docsPluginId: 'website', type: 'docSidebar', sidebarId: 'websiteSidebar', position: 'left', label: 'Website' },
          { docsPluginId: 'creator-portal', type: 'docSidebar', sidebarId: 'creatorPortalSidebar', position: 'left', label: 'Creator Portal' },
          { docsPluginId: 'features', type: 'docSidebar', sidebarId: 'featuresSidebar', position: 'left', label: 'Features' },
          {
            type: 'dropdown',
            label: 'Help',
            position: 'left',
            items: [
              { docId: 'index', docsPluginId: 'support', type: 'doc', label: 'Support' },
              { docId: 'index', docsPluginId: 'faqs', type: 'doc', label: 'FAQs' },
              { docId: 'index', docsPluginId: 'changelog', type: 'doc', label: 'Changelog' },
            ],
          },
          { type: 'search', position: 'right' },
          { href: 'https://www.wrteam.in/', label: 'WRTeam', position: 'right' },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Set up',
            items: [
              { label: 'Mobile App', to: '/mobile-app/' },
              { label: 'Admin Panel', to: '/admin-panel/' },
              { label: 'Website', to: '/website/' },
              { label: 'Creator Portal', to: '/creator-portal/' },
            ],
          },
          {
            title: 'Learn',
            items: [
              { label: 'Features', to: '/features/' },
              { label: 'Earnings calculator', to: '/features/earnings-calculator/' },
              { label: 'FAQs', to: '/faqs/' },
              { label: 'Changelog', to: '/changelog/' },
            ],
          },
          {
            title: 'Help',
            items: [
              { label: 'Support', to: '/support/' },
              { label: 'Common app guides', href: 'https://wrteam-in.github.io/common_app_doc/' },
              { label: 'WRTeam', href: 'https://www.wrteam.in/' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} WRTeam. All rights reserved.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['dart', 'php', 'bash', 'json', 'kotlin', 'ini', 'nginx', 'apacheconf'],
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          hideable: true,
        },
      },
    }),

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      ({
        hashed: true,
        indexBlog: false,
        docsRouteBasePath: [...sections.map((s) => s.id), ...singlePages],
        docsDir: [...sections.map((s) => s.id), ...singlePages],
        docsPluginIdForPreferredVersion: 'admin-panel',
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      }),
    ],
  ],
};

export default config;
