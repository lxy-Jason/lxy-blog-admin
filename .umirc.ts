import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'lxy-blog-admin',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '数据概览',
      path: '/home',
      component: './Home',
    },
    {
      name: '文章管理',
      path: '/article',
      component: './Article',
    },
    {
      name: '站点管理',
      path: '/SystemConfig',
      component: './SystemConfig',
    },
    {
      name: '日志管理',
      path: '/log',
      component: './Log',
    },
    {
      path: '/user',
      layout: false,
      routes: [
        { name: '登录', path: '/user/login', component: './user/Login' },
        // { name: '忘记密码', path: '/user/restore', component: './user/Restore' },
        // { component: './404' },
      ],
    },
  ],
  npmClient: 'npm',
});
