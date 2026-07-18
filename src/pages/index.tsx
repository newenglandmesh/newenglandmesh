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
  const bannerUrl = useBaseUrl('/img/banner.png');
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={clsx('container', styles.heroContent)}>
        <img
          className={styles.bannerImage}
          src={bannerUrl}
          alt="New England Mesh banner"
        />
        <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
          Community Mesh Networks Across New England
        </Heading>
        <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
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
            <Heading as="h2">New England Mesh tools and links</Heading>
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
                title="Community Directory"
                description="Find public Northeast MeshCore community websites, Discords, MeshMapper regions, and CoreScope dashboards."
                href="/regional-information"
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
                title="New England Mesh Discord"
                description="Regional Discord for cross-state planning, technical discussion, build notes, and coordination."
                href="https://discord.newenglandme.sh/"
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
              <LinkCard
                title="Regional Communities and Services"
                description="Find local groups, maps, guides, MQTT services, repositories, and community spaces across New England."
                href="/docs/regional-communities"
              />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
