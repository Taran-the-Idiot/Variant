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
};

const ideaPool: Idea[] = [
  {
    title: 'A keyboard that folds in half',
  },
  {
    title: 'A macropad that drives around',
  },
  {
    title: 'A chocolate 3D printer',
  },
  {
    title: 'A keyboard that has individually modular keys',
  },
  {
    title: 'A lamp that turns on when you stop moving',
  },
  {
    title: 'A calculator that requires you to solve a puzzle before it will work',
  },
  {
    title: 'A handheld game device with swappable controller layouts',
  },
  {
    title: 'A clock that reveals the time with moving tiles',
  },
  {
    title: 'A 3D printer that moves the bed instead of the extruder',
  },
];

function pickRandomIdea(previousTitle?: string): Idea {
  if (ideaPool.length === 0) {
    return {
      title: 'A project waiting for an idea',
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
          <img src="/img/logo-full.png" alt={siteConfig.title} />
        </Heading>
        <p className="hero__subtitle" style={{color: 'white'}}>{siteConfig.tagline}</p>
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
          </div>
          <div className={styles.ideaActions}>
            <button
              type="button"
              style={{color: 'white', background: 'var(--ifm-color-primary-lightest)', outlineColor: 'var(--ifm-color-primary-lightest)'}}
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
