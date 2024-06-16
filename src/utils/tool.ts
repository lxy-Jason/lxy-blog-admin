import moment from 'moment';

export const randomKey = () => {
  return (Math.random() * 1000000).toFixed(0);
};

export const getRecentTimeDes = (timestr: string) => {
  if (!timestr || timestr === '') {
    return '-';
  }
  const c = moment().diff(moment(timestr), 'seconds');
  if (c <= 60) {
    return c + '秒前';
  } else if (c <= 60 * 60) {
    return Math.floor(c / 60) + '分钟前';
  } else if (c <= 60 * 60 * 60) {
    return Math.floor(c / 60 / 60) + '小时前';
  } else if (c <= 60 * 60 * 60 * 24) {
    return Math.floor(c / 60 / 60 / 24) + '天前';
  }
};
