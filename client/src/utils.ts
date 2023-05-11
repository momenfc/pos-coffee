import dayjs from 'dayjs';

export const crtArr = (num: number = 1) => {
  return Array<Number>(num).fill(0);
};

export const priceFormat = (price: number, prefix?: string) => {
  const text = price?.toFixed(2);
  return prefix ? prefix + ' ' + text : text;
};

export const getDateFormat = (date: string) => {
  return dayjs(date).format('YYYY/MM/DD');
};
export const getTimeFormat = (date: string) => {
  return dayjs(date).format('hh:mm a');
};
