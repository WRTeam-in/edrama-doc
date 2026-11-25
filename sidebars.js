// @ts-check

/**
 * One sidebar per navbar section. Each page's place is set here, so the order
 * reads like the product: set up, run the Admin Panel, then the people who use it.
 *
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  start: [
    'intro',
    'getting-started/how-it-works',
    'getting-started/roles-and-access',
    'getting-started/launch-checklist',
    'getting-started/glossary',
  ],

  install: [
    'installation/overview',
    {
      type: 'category',
      label: 'Prepare the server',
      collapsed: false,
      items: ['installation/vps-server', 'installation/shared-hosting'],
    },
    'installation/web-installer',
    'installation/cron-and-queues',
    'installation/video-processing',
    'installation/environment-file',
    'installation/commands',
    'installation/license-and-updates',
    'installation/after-installation',
  ],

  website: ['website/overview', 'website/connect', 'website/deploy', 'website/pages-and-languages'],

  appsetup: [
    'app-setup/overview',
    'app-setup/flutter-setup',
    {
      type: 'category',
      label: 'First build',
      collapsed: false,
      items: ['app-setup/name-and-package', 'app-setup/firebase', 'app-setup/connect-to-server', 'app-setup/run-the-app'],
    },
    {
      type: 'category',
      label: 'Make it yours',
      collapsed: false,
      items: ['app-setup/logo-and-icons', 'app-setup/colors-and-fonts', 'app-setup/defaults-and-limits', 'app-setup/languages'],
    },
    {
      type: 'category',
      label: 'Connect services',
      collapsed: false,
      items: ['app-setup/push-notifications', 'app-setup/ads-setup', 'app-setup/in-app-purchases', 'app-setup/deep-links'],
    },
    {
      type: 'category',
      label: 'Release',
      collapsed: false,
      items: ['app-setup/permissions', 'app-setup/signing', 'app-setup/release-build', 'app-setup/publishing'],
    },
  ],

  admin: [
    'admin/overview',
    'admin/sign-in-and-account',
    'admin/dashboard',
    {
      type: 'category',
      label: 'Content',
      items: [
        'admin/content/titles',
        'admin/content/title-editor',
        'admin/content/episodes-and-subtitles',
        'admin/content/categories',
        'admin/content/upload-pipeline',
        'admin/content/bulk-imports',
        'admin/content/release-schedule',
        'admin/content/home-builder',
        'admin/content/website',
        'admin/content/ai-studio',
      ],
    },
    {
      type: 'category',
      label: 'Community',
      items: [
        'admin/community/creators',
        'admin/community/review-queue',
        'admin/community/comments-and-reviews',
        'admin/community/ai-usage',
      ],
    },
    {
      type: 'category',
      label: 'Audience',
      items: [
        'admin/audience/users',
        'admin/audience/balance-adjustments',
        'admin/audience/support-tickets',
        'admin/audience/push',
      ],
    },
    {
      type: 'category',
      label: 'Money',
      items: [
        'admin/money/regions',
        'admin/money/coin-packs-and-vip',
        'admin/money/ads-and-rewards',
        'admin/money/transactions',
        'admin/money/creator-revenue',
      ],
    },
    {
      type: 'category',
      label: 'Settings',
      items: [
        'admin/settings/overview',
        'admin/settings/branding',
        'admin/settings/regions-and-languages',
        'admin/settings/payments-and-revenue',
        'admin/settings/storage-and-video',
        'admin/settings/ai-studio',
        'admin/settings/app-and-support',
        'admin/settings/legal-pages',
        'admin/settings/notifications',
        'admin/settings/email',
        'admin/settings/security',
      ],
    },
    {
      type: 'category',
      label: 'System',
      items: [
        'admin/system/team-and-roles',
        'admin/system/audit-log',
        'admin/system/system-health',
        'admin/system/license-and-updates',
        'admin/system/clear-demo-data',
      ],
    },
  ],

  creator: [
    'creator/overview',
    'creator/becoming-a-creator',
    'creator/home',
    {
      type: 'category',
      label: 'Your series',
      collapsed: false,
      items: [
        'creator/series',
        'creator/create-series',
        'creator/upload-episodes',
        'creator/submit-for-review',
        'creator/release-times',
      ],
    },
    {
      type: 'category',
      label: 'Audience & money',
      collapsed: false,
      items: ['creator/stats', 'creator/comments-and-reviews', 'creator/earnings'],
    },
    {
      type: 'category',
      label: 'AI Studio',
      collapsed: false,
      items: ['creator/ai-studio', 'creator/ai-episode-editor'],
    },
    'creator/notices-and-account',
  ],

  app: [
    'viewer-app/overview',
    'viewer-app/first-launch',
    'viewer-app/accounts',
    {
      type: 'category',
      label: 'Watching',
      collapsed: false,
      items: [
        'viewer-app/home-and-discovery',
        'viewer-app/series-page',
        'viewer-app/player',
        'viewer-app/library-and-notifications',
        'viewer-app/comments-and-reviews',
      ],
    },
    {
      type: 'category',
      label: 'Paying & earning',
      collapsed: false,
      items: [
        'viewer-app/unlocking-episodes',
        'viewer-app/coins-and-wallet',
        'viewer-app/rewards',
        'viewer-app/vip',
      ],
    },
    'viewer-app/settings-and-help',
  ],

  money: [
    'monetization/overview',
    'monetization/coins-and-pricing',
    'monetization/unlock-methods',
    'monetization/vip-subscriptions',
    'monetization/rewards-economy',
    'monetization/regions-and-currencies',
    'monetization/refunds-and-chargebacks',
    'monetization/creator-earnings',
    'monetization/fair-play-rules',
  ],

  integrations: [
    'integrations/overview',
    'integrations/firebase',
    'integrations/google-play',
    'integrations/app-store',
    'integrations/admob',
    'integrations/storage-and-streaming',
    'integrations/email-and-alerts',
    'integrations/gemini-and-youtube',
  ],

  help: ['help/faqs', 'help/troubleshooting', 'help/support', 'help/changelog'],
};

export default sidebars;
