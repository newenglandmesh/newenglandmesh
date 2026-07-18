import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './regional-information.module.css';

type Community = {
  name: string;
  area: string;
  state: 'ma' | 'ct' | 'nh' | 'vt' | 'ri' | 'me' | 'ny' | 'pa';
  description: string;
  website?: string;
  discord?: string;
  guide?: {label: string; href: string};
  meshMapper?: {label: string; href: string};
  coreScope?: {label: string; href: string};
};

const statewideCommunities: Community[] = [
  {
    name: 'CT Mesh',
    area: 'Connecticut',
    state: 'ct',
    description: 'Statewide Connecticut user group with MeshCore guides, repeaters, and a live node map.',
    website: 'https://ctmesh.org/',
    discord: 'https://ctmesh.org/discord',
    meshMapper: {label: 'BDL · Connecticut Statewide', href: 'https://bdl.meshmapper.net/'},
    coreScope: {label: 'CT Mesh CoreScope', href: 'https://analyzer.ctmesh.org/'},
  },
  {
    name: 'NHMesh',
    area: 'New Hampshire',
    state: 'nh',
    description: 'Statewide, dual-protocol community with an active MeshCore room, setup guides, and live network tools.',
    website: 'https://nhmesh.com/',
    discord: 'https://discord.gg/8Axh3rdgDD',
    guide: {label: 'Observer and setup knowledge base', href: 'https://nhmesh.live/kb'},
    meshMapper: {label: 'CON · New Hampshire Statewide', href: 'https://con.meshmapper.net/'},
  },
  {
    name: 'Vermont MeshCore',
    area: 'Vermont',
    state: 'vt',
    description: 'Statewide MeshMapper coverage region. We were not able to find a website or Discord',
    meshMapper: {label: 'RUT · Vermont', href: 'https://rut.meshmapper.net/'},
  },
  {
    name: 'Rhode Island Mesh',
    area: 'Rhode Island',
    state: 'ri',
    description: 'Statewide regional community with Discord and a dedicated MeshMapper region.',
    discord: 'https://discord.gg/RSXmVP8bP2',
    meshMapper: {label: 'PVD · Rhode Island Statewide', href: 'https://pvd.meshmapper.net/'},
  },
  {
    name: 'Maine Mesh',
    area: 'Maine',
    state: 'me',
    description: 'Maine’s broader LoRa mesh community on GitHub; members operate both Meshtastic and MeshCore infrastructure and coordinate through Discord and Facebook.',
    website: 'https://github.com/JFRHorton/MaineMesh',
    discord: 'https://discord.gg/2Uhz4AzB8E',
    meshMapper: {label: 'BGR · Maine Statewide', href: 'https://bgr.meshmapper.net/'},
  },
];

const localNewEnglandCommunities: Community[] = [
  {
    name: 'Greater Boston Mesh',
    area: 'Greater Boston, Massachusetts',
    state: 'ma',
    description: 'MeshCore community with regional documentation, live packet tools, and a dedicated coordination Discord.',
    website: 'https://bostonme.sh/',
    discord: 'https://discord.gg/MUVASVEEES',
    meshMapper: {label: 'BOS · Boston', href: 'https://bos.meshmapper.net/'},
  },
  {
    name: 'Fitchburg Mesh',
    area: 'Fitchburg, Massachusetts',
    state: 'ma',
    description: 'Old Growth Co-op’s local MeshCore network, serving Fitchburg',
    website: 'https://mesh.og.coop/',
  },
  {
    name: 'PVMesh',
    area: 'Pioneer Valley, Massachusetts',
    state: 'ma',
    description: 'Pioneer Valley network that has MeshCore repeaters alongside its established Meshtastic network.',
    website: 'https://pvmesh.org/',
  },
  {
    name: 'Berkshire Mesh',
    area: 'Berkshire County, Massachusetts',
    state: 'ma',
    description: 'Community-built MeshCore network focused on Berkshire County and its mountain-top backbone.',
    website: 'https://brkme.sh/',
    discord: 'https://discord.gg/j9mr2Q48gM',
    meshMapper: {label: 'PSF · Western Massachusetts', href: 'https://psf.meshmapper.net/'},
  },
];

const northeastCommunities: Community[] = [
  {
    name: 'MeshNY',
    area: 'New York City metro',
    state: 'ny',
    description: 'New York-area mesh community',
    website: 'https://nyme.sh/',
    discord: 'https://discord.nyme.sh/',
    meshMapper: {label: 'NYC · New York City', href: 'https://nyc.meshmapper.net/'},
  },
  {
    name: 'Kaatskills Mesh',
    area: 'Sullivan County & Southern Catskills, New York',
    state: 'ny',
    description: 'MeshCore network with a shared backbone and partner links into northern New Jersey and the Hudson Valley.',
    website: 'https://kmesh.us/',
    discord: 'https://discord.gg/2J6BuhR',
    meshMapper: {label: 'MSV · Sullivan County', href: 'https://msv.meshmapper.net/'},
  },
  {
    name: 'Upstate Mesh',
    area: 'Capital Region & Hudson Valley, New York',
    state: 'ny',
    description: 'Mesh-agnostic Capital Region community with an active MeshCore repeater network.',
    website: 'https://www.upstatemesh.org/',
    discord: 'https://discord.gg/FvajRmXEsb',
    meshMapper: {label: 'ALB · Albany', href: 'https://alb.meshmapper.net/'},
  },
  {
    name: 'WNY MeshCore',
    area: 'Western New York',
    state: 'ny',
    description: 'MeshCore-focused community building solar-powered coverage from the Pennsylvania border to Lake Ontario.',
    website: 'https://wnymeshcore.org/',
    discord: 'https://discord.gg/QNmC8rDxtS',
    meshMapper: {label: 'BUF · Buffalo', href: 'https://buf.meshmapper.net/'},
  },
  {
    name: 'ROCMesh',
    area: 'Rochester, New York',
    state: 'ny',
    description: 'Rochester’s local mesh community, with members operating both Meshtastic and MeshCore nodes.',
    website: 'https://rocmesh.com/',
    discord: 'https://discord.gg/wQQ4XQjQtp',
    meshMapper: {label: 'ROC · Rochester', href: 'https://roc.meshmapper.net/'},
  },
  {
    name: 'CNYmesh',
    area: 'Syracuse & Central New York',
    state: 'ny',
    description: 'Dual-protocol MeshCore and Meshtastic community serving the Syracuse region and nearby Central New York counties.',
    website: 'https://cnymesh.org/',
    discord: 'https://discord.gg/xBb5eGTpuy',
    meshMapper: {label: 'SYR · North Syracuse', href: 'https://syr.meshmapper.net/'},
  },
  {
    name: 'Southern Tier Mesh',
    area: 'Southern Tier, New York',
    state: 'ny',
    description: 'Local LoRa community with a MeshCore network, scoped public channel, room server, and coverage work.',
    website: 'https://stmesh.net/',
    discord: 'https://discord.gg/FwMV4M59DF',
    meshMapper: {label: 'ELM · Elmira/Corning', href: 'https://elm.meshmapper.net/'},
    coreScope: {label: 'Local CoreScope dashboard', href: 'https://stmesh.net/stmesh/stmeshcore.html'},
  },
  {
    name: 'Susquehanna Valley Mesh',
    area: 'Susquehanna Valley, Pennsylvania',
    state: 'pa',
    description: 'Regional LoRa community with an active MeshCore coverage map for the Susquehanna Valley.',
    website: 'https://svmesh.net/',
    discord: 'https://discord.gg/bySed6vGax',
    meshMapper: {label: 'LNS · Susquehanna Valley Mesh', href: 'https://lns.meshmapper.net/'},
  },
  {
    name: 'Centre County LoRa Radio Network',
    area: 'Centre County, Pennsylvania',
    state: 'pa',
    description: 'Local MeshCore community serving Centre County and the surrounding central Pennsylvania region.',
    discord: 'https://discord.gg/Xe5WvYtHPg',
    meshMapper: {label: 'SCE · Houserville', href: 'https://sce.meshmapper.net/'},
  },
  {
    name: 'PIT MeshMapper Region',
    area: 'Carnot-Moon & Pittsburgh area, Pennsylvania',
    state: 'pa',
    description: 'MeshCore coverage region for the Pittsburgh-area network; no independently verified public community site or Discord is listed here.',
    meshMapper: {label: 'PIT · Carnot-Moon', href: 'https://pit.meshmapper.net/'},
  },
  {
    name: 'Lehigh Valley Mesh',
    area: 'Lehigh Valley, Pennsylvania',
    state: 'pa',
    description: 'Multi-protocol community with MeshCore observer onboarding and a dedicated regional analyzer.',
    website: 'https://lvmesh.com/',
    discord: 'https://lvmesh.com/discord/',
    coreScope: {label: 'ABE · Lehigh Valley CoreScope', href: 'https://map.lvmesh.com/'},
  },
];

function CommunityCard({community}: {community: Community}): ReactNode {
  return (
    <article className={`${styles.card} ${styles[`state${community.state}`]}`}>
      <p className={styles.area}>{community.area}</p>
      <Heading as="h3">{community.name}</Heading>
      <p className={styles.description}>{community.description}</p>
      <dl className={styles.links}>
        {community.website && (
          <div>
            <dt>Website</dt>
            <dd><a href={community.website} target="_blank" rel="noopener noreferrer">Visit site</a></dd>
          </div>
        )}
        {community.discord && (
          <div>
            <dt>Discord</dt>
            <dd><a href={community.discord} target="_blank" rel="noopener noreferrer">Join community</a></dd>
          </div>
        )}
        {community.guide && (
          <div>
            <dt>Guide</dt>
            <dd><a href={community.guide.href} target="_blank" rel="noopener noreferrer">{community.guide.label}</a></dd>
          </div>
        )}
        {community.meshMapper && (
          <div>
            <dt>MeshMapper</dt>
            <dd><a href={community.meshMapper.href} target="_blank" rel="noopener noreferrer">{community.meshMapper.label}</a></dd>
          </div>
        )}
        {community.coreScope && (
          <div>
            <dt>CoreScope</dt>
            <dd><a href={community.coreScope.href} target="_blank" rel="noopener noreferrer">{community.coreScope.label}</a></dd>
          </div>
        )}
      </dl>
    </article>
  );
}

function CommunitySection({title, communities}: {title: string; communities: Community[]}): ReactNode {
  return (
    <section className={styles.section}>
      <Heading as="h2">{title}</Heading>
      <div className={styles.grid}>
        {communities.map((community) => <CommunityCard community={community} key={community.name} />)}
      </div>
    </section>
  );
}

export default function CommunityDirectory(): ReactNode {
  return (
    <Layout
      title="Community Directory"
      description="Public MeshCore communities, websites, Discord servers, MeshMapper regions, and CoreScope dashboards in the Northeast United States.">
      <main className={styles.page}>
        <header className={styles.header}>
          <div className="container">
            <Heading as="h1">Community Directory</Heading>
            <p>
              Public MeshCore community hubs in the Northeast, grouped by New England and neighboring regions.
              Each card links to the community’s website and coordination Discord, plus its public MeshMapper
              region or CoreScope dashboard when one is published.
            </p>
          </div>
        </header>
        <div className="container">
          <CommunitySection title="Statewide New England Meshes" communities={statewideCommunities} />
          <CommunitySection title="Local New England Meshes" communities={localNewEnglandCommunities} />
          <CommunitySection title="Northeast Beyond New England" communities={northeastCommunities} />
          <p className={styles.note}>
            Last researched July 18, 2026. This directory includes public MeshCore communities and nearby
            dual-protocol groups that actively publish MeshCore information.
          </p>
        </div>
      </main>
    </Layout>
  );
}
