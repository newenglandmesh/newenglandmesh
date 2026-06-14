import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Local-first communications',
    description: (
      <>
        Build useful neighborhood and regional links that can keep working when
        ordinary networks are congested or unavailable.
      </>
    ),
  },
  {
    title: 'MeshCore and Meshtastic',
    description: (
      <>
        Bring the radio you have, compare protocols clearly, and help document
        practical settings for New England terrain and communities.
      </>
    ),
  },
  {
    title: 'Shared infrastructure',
    description: (
      <>
        Optional MeshCore observers, Meshtastic MQTT Routers, maps, and local
        coordination make the mesh easier to discover and more useful for
        nearby operators.
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
