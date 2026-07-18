import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'regional-communities',
    {
      type: 'category',
      label: 'Operations',
      items: [
        'meshcore-operations',
        'meshtastic-operations',
      ],
    },
    'contributing',
  ],
};

export default sidebars;
