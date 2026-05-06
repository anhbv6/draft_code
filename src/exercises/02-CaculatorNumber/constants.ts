export const binaryOperators = ["+", "-", "*", "/"] as const;
export type BinaryOperator = typeof binaryOperators[number];

export const getCurrentNumber = (str: string) => {
  const parts = str.split(/[\+\-\*\/]/);
  return parts[parts.length - 1];
};

export const findLastParenthesesRange = (expression: string) => {
  if (!expression.endsWith(")")) return null;

  let count = 0;
  for (let i = expression.length - 1; i >= 0; i--) {
    const char = expression[i];

    if (char === ")") {
      count++;
    }

    if (char === "(") {
      count--;
    }

    if (count === 0) {
      return {
        start: i,
        end: expression.length,
        value: expression.slice(i),
      };
    }
  }

  return null;
}

export const findLastNumberRange = (expression: string) => {
  if (!expression) return null;

  let end = expression.length;
  let index = end - 1;

  if (!/[0-9.]/.test(expression[index])) {
    return null;
  }

  while (index >= 0 && /[0-9.]/.test(expression[index])) {
    index--;
  }

  let start = index + 1;

  const signIndex = start - 1;
  const signChar = expression[signIndex];

  const isUnarySign =
    (signChar === "+" || signChar === "-") &&
    (signIndex === 0 ||
      binaryOperators.includes(expression[signIndex - 1] as BinaryOperator) ||
      expression[signIndex - 1] === "(");

  if (isUnarySign) {
    start = signIndex;
  }

  return {
    start,
    end,
    value: expression.slice(start, end),
  };
};

export const convertPercentForCalculate = (expression: string) => {
  let result = expression;

  while (result.includes("%")) {
    const percentIndex = result.indexOf("%");

    if (percentIndex === 0) return result;

    const beforePercentIndex = percentIndex - 1;

    // Case: số%
    // VD: 100% => (100/100)
    if (/[0-9.]/.test(result[beforePercentIndex])) {
      let start = beforePercentIndex;

      while (start >= 0 && /[0-9.]/.test(result[start])) {
        start--;
      }

      start++;

      const number = result.slice(start, percentIndex);

      result =
        result.slice(0, start) +
        `(${number}/100)` +
        result.slice(percentIndex + 1);

      continue;
    }

    // Case: ngoặc%
    // VD: (50+50)% => ((50+50)/100)
    if (result[beforePercentIndex] === ")") {
      let count = 0;
      let start = beforePercentIndex;

      for (; start >= 0; start--) {
        if (result[start] === ")") count++;
        if (result[start] === "(") count--;

        if (count === 0) break;
      }

      if (start < 0) return result;

      const group = result.slice(start, percentIndex);

      result =
        result.slice(0, start) +
        `(${group}/100)` +
        result.slice(percentIndex + 1);

      continue;
    }

    return result;
  }

  return result;
};