import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>> | string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Come up with an idea!',
    Svg: '/img/design.png',
    description: (
      <>
        Think of a cool hardware project and give it a gimmick!
      </>
    ),
  },
  {
    title: 'Make it!',
    Svg: '/img/repo.png',
    description: (
      <>
        Follow our guides to make your project, and get help from the community if you need it!
      </>
    ),
  },
  {
    title: 'Submit!',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Submit your project <a href="/docs/How-To-Start/submit" target="_blank" rel="noopener noreferrer">here</a> and profit!
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {typeof Svg === 'string' ? (
          <img src={Svg} className={styles.featureSvg} role="img" alt={title} />
        ) : (
          <Svg className={styles.featureSvg} role="img" />
        )}
      </div>
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
