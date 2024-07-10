// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "巨大娘的玩耍",
  tagline: "扮演巨大娘闯关",
  // url: 'https://meta3d-4g18u7z10c8427f9-1302358347.tcloudbaseapp.com/website',
  url: 'https://gts-play-public-3w5f.4everland.app',
  baseUrl: '/packages/website/build/index.html/',
  // baseUrl: '/website/build/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: '巨大娘的玩耍', // Usually your GitHub org/user name.
  // projectName: '巨大娘的玩耍-Website', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '巨大娘的玩耍',
        logo: {
          alt: 'My Site Logo',
          src: 'img/favicon.ico',
        },
        items: [
          {
            href: 'https://gts-play-public-3w5f.4everland.app',
            label: '进入游戏',
          },
          // {
          //   type: 'doc',
          //   docId: '简介',
          //   position: 'left',
          //   label: '文档',
          // },
          // {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://tieba.baidu.com/f?kw=%E5%B7%A8%E5%A4%A7%E5%A8%98%E7%9A%84%E7%8E%A9%E8%80%8D&ie=utf-8&tab=main',
            label: '论坛',
          },
              {
                label: '交流加QQ群',
                href: 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=QpNrLbhk5TZD8bg_sNalLrAKHVS3qCD2&authKey=ePPMKFJ1H3OXMdRLXJlYKNdyMPoO%2Fh2FWzcxgx5LjtdqZGmKU5i5QbYbAZeZRoz%2F&noverify=0&group_code=892578345'
              },
          // {
          //   href: 'https://www.zhihu.com/column/c_1521448592849649664',
          //   label: '博客',
          // },

          // {
          //   href: 'https://github.com/巨大娘的玩耍-Technology/巨大娘的玩耍',
          //   label: 'GitHub',
          //   position: 'right',
          //   className: 'header-github-link',
          //   'aria-label': 'GitHub repository',
          //   // position: 'right',
          // },
        ],
      },
      // footer: {
      //   style: 'dark',
      //   links: [
      //     {
      //       title: '社区',
      //       items: [
      //         {
      //           label: '论坛',
      //           href: '',
      //         },
      //         {
      //           label: '交流加QQ群',
      //           href: 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=QpNrLbhk5TZD8bg_sNalLrAKHVS3qCD2&authKey=ePPMKFJ1H3OXMdRLXJlYKNdyMPoO%2Fh2FWzcxgx5LjtdqZGmKU5i5QbYbAZeZRoz%2F&noverify=0&group_code=892578345'
      //         },
      //       ],
      //     }
      //     // {
      //     //   title: '更多',
      //     //   items: [
      //     //     {
      //     //       label: '开发者的知乎',
      //     //       href: 'https://www.zhihu.com/people/dreamforest-yyc',
      //     //     },
      //     //     {
      //     //       label: '开发者的博客',
      //     //       href: 'https://www.cnblogs.com/chaogex/',
      //     //     },
      //     //   ],
      //     // },
      //   ],
      //   // copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      // },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
