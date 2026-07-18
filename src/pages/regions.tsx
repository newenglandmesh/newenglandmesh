import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './regions.module.css';

export default function Regions(): ReactNode {
  return (
    <Layout
      title="MeshCore Region Boundaries"
      description="Generated MeshCore coordination boundaries with notes on New England Mesh scope and suggested external regions.">
      <main className={styles.page}>
        <header className={styles.header}>
          <div className="container">
            <Heading as="h1" className={styles.title}>
              MeshCore Region Boundaries
            </Heading>
            <p className={styles.lead}>
              This map is a planning aid for MeshCore region coordination. It
              shows generated GeoJSON boundaries over OpenStreetMap so operators
              can inspect official New England regions, external regions
              coordinated with local operators, and suggested external regions.
            </p>
            <div className={styles.actions}>
              <a
                className="button button--primary button--lg"
                href="/regions/map"
                rel="noopener noreferrer"
                target="_blank">
                Open the region map
              </a>
            </div>
          </div>
        </header>

        <section className={styles.section}>
          <div className="container">
            <div className={styles.grid}>
              <article className={styles.panel}>
                <Heading as="h2">What the map shows</Heading>
                <p>
                  Boundaries are generated mostly from U.S. Census state and
                  county cartographic files, with special source data where
                  noted. They are intended for coordination, not legal,
                  regulatory, or emergency service boundaries.
                </p>
              </article>
              <article className={styles.panel}>
                <Heading as="h2">Official New England regions</Heading>
                <p>
                  New England Mesh is responsible for defining the regions within
                  New England: Connecticut, Rhode Island, Massachusetts, Vermont,
                  New Hampshire, Maine, and their coordinated subregions. These
                  areas were adopted by vote and may change as the group evolves.
                </p>
              </article>
              <article className={styles.panel}>
                <Heading as="h2">Political boundaries</Heading>
                <p>
                  Some map regions follow established political or public
                  administrative boundaries rather than New England Mesh-defined
                  boundaries. Current region codes: <code>east</code>, <code>northeast</code>,
                  and <code>adk</code>.
                </p>
              </article>
              <article className={styles.panel}>
                <Heading as="h2">Coordinated external regions</Heading>
                <p>
                  Some regions outside New England were developed in coordination
                  with local operators. The currently coordinated
                  external regions are <code>nyc</code>, <code>alb</code>,
                  <code>mv</code>, and <code>hv</code>.
                </p>
              </article>
              <article className={styles.panel}>
                <Heading as="h2">Suggested external regions</Heading>
                <p>
                  These regions are drawn from nearby coordinated regions and
                  public geographic boundaries. They are suggestions for people
                  living there, not boundaries defined by New England Mesh.
                </p>
              </article>
            </div>

            <article className={`${styles.panel} ${styles.notice}`}>
              <Heading as="h2">Before using a region code</Heading>
              <p>
                Coordinate with the people operating in that area. Region codes
                such as <code>bos</code>, <code>ct-rv</code>, <code>hud</code>,
                <code>adk</code>, and <code>erie</code> are map labels for
                planning and discussion. The interactive map identifies each
                region as official, political-boundary, proposed, coordinated
                external, or suggested external.
              </p>
            </article>

            <section className={styles.key} aria-label="Region status key">
              <Heading as="h2">Coordinator Review Key</Heading>
              <div className={styles.keyGrid}>
                <article className={styles.keyItem}>
                  <Heading as="h3">Official New England</Heading>
                  <p>Regions adopted by New England Mesh through a vote; they may evolve with the group.</p>
                  <div className={styles.codeList}>
                    <code>me</code><code>nh</code><code>vt</code><code>bos</code>
                    <code>pv</code><code>wma</code><code>ct</code><code>ct-rv</code>
                    <code>ri</code>
                  </div>
                </article>
                <article className={styles.keyItem}>
                  <Heading as="h3">Political Boundaries</Heading>
                  <p>Regions based on established political or public administrative boundaries.</p>
                  <div className={styles.codeList}>
                    <code>east</code><code>northeast</code><code>adk</code>
                  </div>
                </article>
                <article className={`${styles.keyItem} ${styles.proposedKeyItem}`}>
                  <Heading as="h3">Proposed</Heading>
                  <p>Regions proposed for coordinator review and not yet adopted as official.</p>
                  <div className={styles.codeList}>
                    <code>brk</code>
                  </div>
                </article>
                <article className={styles.keyItem}>
                  <Heading as="h3">Coordinated External</Heading>
                  <p>External regions coordinated with people operating in those areas.</p>
                  <div className={styles.codeList}>
                    <code>nyc</code><code>alb</code><code>mv</code><code>hv</code>
                  </div>
                </article>
                <article className={`${styles.keyItem} ${styles.extrapolatedKeyItem}`}>
                  <Heading as="h3">Suggested External</Heading>
                  <p>Suggested coordination areas outside New England, not regions defined by New England Mesh.</p>
                  <div className={styles.codeList}>
                    <code>erie</code><code>hud</code><code>msv</code>
                  </div>
                </article>
              </div>
            </section>

            <section className={styles.proposals} aria-label="Current region proposals">
              <Heading as="h2">Current Proposals</Heading>
              <article className={styles.proposalItem}>
                <Heading as="h3"><code>brk</code> - Berkshires / Western Massachusetts</Heading>
                <p>
                  This proposal renames the existing <code>wma</code> region to <code>brk</code>.
                  Its boundary remains Berkshire County, so it does not add any Pioneer Valley counties
                  or otherwise change the current Western Massachusetts footprint.
                </p>
              </article>
            </section>

            <section className={styles.repeaterCli} aria-label="MeshCore repeater CLI commands">
              <Heading as="h2">MeshCore Repeater CLI</Heading>
              <article className={styles.cliPanel}>
                <p>Add and allow the region codes served by the repeater:</p>
                <pre><code>{`region put <region-code>
region allowf <region-code>
region allowf *
region save`}</code></pre>
                <p>
                  Wildcard forwarding remains enabled. See the{' '}
                  <a href="https://docs.meshcore.io/cli_commands/">MeshCore CLI reference</a>
                  {' '}for the full command set.
                </p>
              </article>
            </section>
          </div>
        </section>
      </main>
    </Layout>
  );
}
