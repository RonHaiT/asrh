import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from './types/config'
import { LinkPreset } from './types/config'

export const siteConfig: SiteConfig = {
  title: '隆海博客',
  subtitle: '风景在路上，生活在心里。',
  lang: 'zh_CN',         // 'en', 'zh_CN', 'zh_TW', 'ja', 'ko', 'es', 'th'
  themeColor: {
    hue: 165,         // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345 //170绿色
    fixed: false,     // Hide the theme color picker for visitors
  },
  banner: {
    enable: true,
    src: 'assets/images/banner.jpg',   // Relative to the /src directory. Relative to the /public directory if it starts with '/'
    position: 'center',      // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
    credit: {
      enable: false,         // Display the credit text of the banner image
      text: 'banner标题',              // Credit text to be displayed
      url: 'banner链接'                // (Optional) URL link to the original artwork or artist's page
    }
  },
  toc: {
    enable: true,           // Display the table of contents on the right side of the post
    depth: 3                // Maximum heading depth to show in the table, from 1 to 3
  },
  favicon: [    // Leave this array empty to use the default favicon
    {
      src: '/rh.png',    // Path of the favicon, relative to the /public directory
      theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
      sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
    }
  ]
}

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    LinkPreset.Food,
    LinkPreset.About,
    // {
    //   name: 'GitHub',
    //   url: 'https://github.com/ronhait',     // Internal links should not include the base path, as it is automatically added
    //   external: true,                               // Show an external link icon and will open in a new tab
    // },
  ],
}

export const profileConfig: ProfileConfig = {
  avatar: 'assets/images/rh.png',  // Relative to the /src directory. Relative to the /public directory if it starts with '/'
  name: '隆海',
  bio: '风景在路上，生活在心里。',
  links: [
    {
      name: 'BiliBili',
      icon: 'tabler:brand-bilibili',       // Visit https://icones.js.org/ for icon codes
                                        // You will need to install the corresponding icon set if it's not already included
                                        // `pnpm add @iconify-json/<icon-set-name>`
      url: 'https://space.bilibili.com/30043682',
    },
    {
      name: '抖音',
      icon: 'tabler:brand-tiktok',
      url: 'https://www.douyin.com/user/MS4wLjABAAAAsG4UBZywbSVbcX48mi3HkknAkUdw6wjruGdgToYvMoRGF0Hft4wCRjFWnADBQROi',
    },
    {
      name: '邮箱',
      icon: 'tabler:mail',
      url: 'mailto:pythl@foxmail.com',
    },
    {
      name: 'GitHub',
      icon: 'fa6-brands:github',
      url: 'https://github.com/ronhait',
    },
    {
      name: 'RSS',
      icon: 'tabler:rss',
      url: 'https://dazhuzi.com/rss.xml',
    },
  ],
}

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: 'CC BY-NC-SA 4.0',
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
}
