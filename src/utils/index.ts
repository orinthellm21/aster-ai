import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomText(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const formatNumberWithCommas = (
  num: number | string,
  digits?: number,
) => {
  const fixedNum = digits
    ? parseFloat((+num).toFixed(digits))
    : +num < 1e-6 && +num !== 0
      ? num
      : parseFloat(`${num}`);

  const parts = fixedNum.toString().split('.');

  const formattedInteger = new Intl.NumberFormat('en-US').format(+parts[0]);

  return parts[1] ? `${formattedInteger}.${parts[1]}` : formattedInteger;
};

export const abbrNum = ({
  number,
  decPlaces,
  minPlaces,
  formatType = 'currency',
}: {
  number: number;
  decPlaces: number;
  minPlaces?: number;
  formatType?: 'number' | 'currency';
}) => {
  if (typeof number !== 'number' || Number.isNaN(number)) return '';

  if (minPlaces && number < minPlaces)
    return formatNumberWithCommas(number.toFixed(decPlaces));

  const newDecPlaces = Math.pow(10, decPlaces);

  const abbrev =
    formatType === 'number'
      ? ['K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'R', 'Q']
      : ['K', 'M', 'B', 'T', 'Q'];

  let abbrNum: number;
  let unit: string;

  for (let i = abbrev.length - 1; i >= 0; i--) {
    const size = Math.pow(10, (i + 1) * 3);

    if (size <= number) {
      abbrNum = Math.round((number * newDecPlaces) / size) / newDecPlaces;

      unit = abbrev[i];

      return formatNumberWithCommas(abbrNum) + unit;
    }
  }

  return formatNumberWithCommas(parseFloat(number.toFixed(decPlaces)));
};

export function truncateAddress(
  address: string,
  beforeLength?: number,
  afterLength?: number,
  maxLength?: number,
) {
  return !address?.length || address?.length <= (maxLength || 10)
    ? address
    : `${address.slice(0, beforeLength || 4)}...${address.slice(
        -(afterLength || 4),
      )}`;
}

export function timeDifference2(previousDate: any) {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const currentDate: any = new Date();
  const elapsed = currentDate - previousDate;

  if (elapsed < msPerMinute) {
    const result = Math.round(elapsed / 1000);
    return `${result} ${result === 1 ? 'second ago' : 'seconds ago'}`;
  } else if (elapsed < msPerHour) {
    const result = Math.round(elapsed / msPerMinute);
    return `${result} ${result === 1 ? 'minute ago' : 'minutes ago'}`;
  } else if (elapsed < msPerDay) {
    const result = Math.round(elapsed / msPerHour);
    return `${result} ${result === 1 ? 'hour ago' : 'hours ago'}`;
  } else if (elapsed < msPerMonth) {
    const result = Math.round(elapsed / msPerDay);
    return `${result} ${result === 1 ? 'day ago' : 'days ago'}`;
  } else if (elapsed < msPerYear) {
    const result = Math.round(elapsed / msPerMonth);
    return `${result} ${result === 1 ? 'month ago' : 'months ago'}`;
  } else {
    const result = Math.round(elapsed / msPerYear);
    return `${result} ${result === 1 ? 'year ago' : 'years ago'}`;
  }
}
