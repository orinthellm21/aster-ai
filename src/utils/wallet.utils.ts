export function formatNumber(num: number) {
  const str = num.toString();
  const [intPart, decPart] = str.split('.');

  if (str == '0') return '0';

  if (!decPart) return `${intPart}.0₀00`;

  const match = decPart.match(/(0*)(\d{4})/);

  if (match) {
    const zeroCount = match[1].length;

    const subscriptDigits = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];

    const subscriptZero = zeroCount
      .toString()
      .split(' ')
      .map((digit: any) => subscriptDigits[digit])
      .join('');

    const decPartResult = `${decPart[0]}${subscriptZero}${match[2]}`;

    return `${intPart}.${decPartResult}`;
  }

  return num.toString();
}
