export const formatNumber = (
  number: number,
  useDot: boolean = false
): string => {
  return number.toLocaleString(useDot ? "vi-VN" : "en-US");
};