import {useEffect, useState, type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

type Idea = {
  title: string;
  description: string;
};

const ideaPool: Idea[] = [
  {
    title: 'A keyboard that folds into a travel case',
    description:
      'Build a split board with hinges and magnets so it snaps shut like a compact briefcase.',
  },
  {
    title: 'A macropad that drives a tiny rover',
    description:
      'Turn the extra keys into steering and boost controls for a desk-sized robot car.',
  },
  {
    title: 'A chocolate 3D printer with a temperature story',
    description:
      'Make every print release a little steam cloud, then frame it as dessert fabrication.',
  },
  {
    title: 'A speaker that opens like a clamshell camera',
    description:
      'Hide the drivers behind a hinged shell so the sound changes when the case opens.',
  },
  {
    title: 'A desk lamp that grows a mechanical halo',
    description:
      'Add a ring of moving fins or petals that shift with the brightness setting.',
  },
  {
    title: 'A calculator that slides out into a mini workstation',
    description:
      'Pair the keypad with a little screen and fold-out stand for a pocket command center.',
  },
  {
    title: 'A badge holder that projects a tiny status display',
    description:
      'Give it an oled screen, tilt sensor, or physical flaps so the badge can change mood.',
  },
  {
    title: 'A handheld game device with swappable faceplates',
    description:
      'Let the front shell twist, slide, or clip on in different shapes depending on the game.',
  },
  {
    title: 'A clock that reveals the time with moving tiles',
    description:
      'Use mechanical shutters or flip cards so the display feels like a tiny stage trick.',
  },
  {
    title: 'A fan that unfolds into a wearable sculpture',
    description:
      'Make the blades or arms expand in an exaggerated way so it looks more dramatic than useful.',
  },
];

function pickRandomIdea(previousTitle?: string): Idea {
  if (ideaPool.length === 0) {
    return {
      title: 'A project waiting for an idea',
      description: 'Start by making something small, strange, and fun to explain.',
    };
  }

  let nextIdea = ideaPool[Math.floor(Math.random() * ideaPool.length)];
  while (ideaPool.length > 1 && nextIdea.title === previousTitle) {
    nextIdea = ideaPool[Math.floor(Math.random() * ideaPool.length)];
  }

  return nextIdea;
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/intro">
            Get Started!
          </Link>
        </div>
      </div>
    </header>
  );
}

function IdeaGenerator() {
  const [idea, setIdea] = useState<Idea>(ideaPool[0]);

  useEffect(() => {
    setIdea(pickRandomIdea());
  }, []);

  return (
    <section className={styles.ideaSection}>
      <div className="container">
        <div className={styles.ideaCard}>
          <div className={styles.ideaEyebrow}>Idea generator</div>
          <Heading as="h2" className={styles.ideaTitle}>
            Need a weird build prompt?
          </Heading>
          <p className={styles.ideaCopy}>
            Click for a random hardware concept that has a gimmick worth
            showing off.
          </p>
          <div className={styles.ideaOutput}>
            <h3 className={styles.ideaOutputTitle}>{idea.title}</h3>
            <p className={styles.ideaOutputCopy}>{idea.description}</p>
          </div>
          <div className={styles.ideaActions}>
            <button
              type="button"
              className="button button--primary button--lg"
              onClick={() => setIdea((currentIdea) => pickRandomIdea(currentIdea.title))}>
              Generate another idea
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Variant`}
      description="Make a hardware project with a gimmick, get funding to make it!">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <IdeaGenerator />
      </main>
    </Layout>
  );
}
