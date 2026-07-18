import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const bannerUrl = useBaseUrl('/img/banner.png');
  const logoUrl = useBaseUrl('/img/logo.png');
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <img
          className={styles.bannerImage}
          src={bannerUrl}
          alt="New England Mesh banner"
        />
        <img
          className={styles.logoImage}
          src={logoUrl}
          alt="New England Mesh logo"
        />
        <Heading as="h1" className="hero__title">
          Contribute to New England Mesh
        </Heading>
        <p className="hero__subtitle">
          Community-run LoRa mesh networks for resilient local messaging,
          experimentation, and backup communications across New England.
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx('button button--secondary button--lg', styles.heroButton)}
            to="/docs/intro">
            Personal Node
          </Link>
          <Link
            className={clsx('button button--secondary button--lg', styles.heroButton)}
            to="/docs/meshcore-operations">
            Repeater Setup
          </Link>
          <Link
            className={clsx('button button--secondary button--lg', styles.heroButton)}
            to="https://discord.newenglandme.sh/">
            Discord
          </Link>
        </div>
      </div>
    </header>
  );
}

function LinkCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <a className={styles.linkCard} href={href}>
      <strong>{title}</strong>
      <span>{description}</span>
    </a>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="New England Mesh community guide for MeshCore, Meshtastic, infrastructure nodes, MQTT, maps, and local coordination.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <section className={styles.section}>
          <div className="container">
            <Heading as="h2">Pick a lane and get on the air</Heading>
            <div className={styles.steps}>
              <div>
                <span className={styles.stepNumber}>1</span>
                <Heading as="h3">Start with a node</Heading>
                <p>
                  A small 915 MHz LoRa device paired with a phone is enough
                  to send messages, test local coverage, and learn how terrain
                  affects range.
                </p>
              </div>
              <div>
                <span className={styles.stepNumber}>2</span>
                <Heading as="h3">Choose MeshCore or Meshtastic</Heading>
                <p>
                  MeshCore works well for personal Companions plus fixed
                  Repeaters and Room Servers. Meshtastic works well for
                  personal Client nodes and high-site Router nodes.
                </p>
              </div>
              <div>
                <span className={styles.stepNumber}>3</span>
                <Heading as="h3">Add coverage</Heading>
                <p>
                  Place reliable nodes at good antenna sites, share public
                  coverage data when appropriate, and coordinate channels,
                  optional MeshCore observers, and Meshtastic MQTT Routers with
                  nearby operators.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.section}>
          <div className="container">
            <Heading as="h2">Tools and community links</Heading>
            <div className={styles.linkGrid}>
              <LinkCard
                title="New England MeshCore Map"
                description="Regional live map for MeshCore nodes observed across New England."
                href="https://map.newenglandme.sh/"
              />
              <LinkCard
                title="MeshCore Region Boundaries"
                description="Generated MeshCore coordination boundaries with notes on scope and extrapolated regions."
                href="/regions"
              />
              <LinkCard
                title="New England MeshCore Analyzer"
                description="Regional tools for MeshCore packets, channels, nodes, observers, and analytics."
                href="https://analyzer.newenglandme.sh/"
              />
              <LinkCard
                title="New England Mesh Healthcheck"
                description="Service health checks for New England Mesh regional tools."
                href="https://healthcheck.newenglandme.sh/"
              />
              <LinkCard
                title="CT Mesh"
                description="Connecticut community site with MeshCore and Meshtastic links, maps, guides, and Discord."
                href="https://ctmesh.org/"
              />
              <LinkCard
                title="New England Mesh Discord"
                description="Regional Discord for cross-state planning, technical discussion, build notes, and coordination."
                href="https://discord.newenglandme.sh/"
              />
              <LinkCard
                title="MeshCore"
                description="Official MeshCore site with docs, app links, flasher, map, and Discord."
                href="https://meshcore.io/"
              />
              <LinkCard
                title="MeshCore Map"
                description="Public MeshCore map for finding nearby Companion, Repeater, and Room Server devices."
                href="https://map.meshcore.io/"
              />
              <LinkCard
                title="Meshtastic"
                description="Official Meshtastic site with docs, apps, flasher, map, and community Discord."
                href="https://meshtastic.org/"
              />
              <LinkCard
                title="Meshtastic Map"
                description="Public map for opt-in Meshtastic Client and Router nodes using MQTT."
                href="https://map.meshtastic.org/"
              />
              <LinkCard
                title="New England Mesh Docs"
                description="Local getting-started notes, infrastructure guides, and contribution info."
                href="/docs/intro"
              />
              <LinkCard
                title="New England Mesh GitHub"
                description="Improve this site, add local links, and propose regional operating notes."
                href="https://github.com/newenglandmesh/newenglandmesh"
              />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
