import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import HomepageUsages from '../components/HomepageUsages';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="https://meta3d-local-9gacdhjl439cff76-1302358347.tcloudbaseapp.com/gts_play_production/dist/index.html">
            进入游戏
          </Link>
        </div>
        <div className={styles.buttons}>
          <Link
            style={{
              "marginTop": "2rem"
            }}
            className="button button--secondary button--lg"
            to="https://tieba.baidu.com/f?kw=%E5%B7%A8%E5%A4%A7%E5%A8%98%E7%9A%84%E7%8E%A9%E8%80%8D&ie=utf-8&tab=main">
            进入论坛
          </Link>
        </div>
        <div className={styles.buttons}>
          <Link
            style={{
              "marginTop": "2rem"
            }}
            className="button button--secondary button--lg"
            to="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=QpNrLbhk5TZD8bg_sNalLrAKHVS3qCD2&authKey=ePPMKFJ1H3OXMdRLXJlYKNdyMPoO%2Fh2FWzcxgx5LjtdqZGmKU5i5QbYbAZeZRoz%2F&noverify=0&group_code=892578345">
            交流加QQ群
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        {/* <HomepageFeatures />
        <HomepageUsages /> */}
      </main>
    </Layout>
  );
}
