export const buttonClasses = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  danger: 'danger',
  warning: 'warning',
  info: 'info',
  light: 'light',
  dark: 'dark',
  link: 'link',
};
export const links = {
  home: 'home',
  orders: 'orders',
  auth: 'auth',
  order: 'order',
  userProfile: 'user-profile',
  editProfile: 'edit-profile',
  orderConfirmation: 'order-confirmation',
};
export const preprocessString = str => {
  str = str.toLowerCase();
  str = str.replaceAll(' ', '');
  return str;
};
export const largestCommonCharacters = (s1, s2) => {
  // string to array
  const arr1 = [...s1];
  const arr2 = [...s2];

  // define n x m sized array filled with 0's
  let matrix = [...Array(arr1.length + 1)].map(e =>
    Array(arr2.length + 1).fill(0)
  );

  // fill the matrix
  for (let i = 1; i <= arr1.length; i++) {
    for (let j = 1; j <= arr2.length; j++) {
      if (arr1[i - 1] == arr2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j] + 1;
      } else matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);
    }
  }

  // return the max which is at the right bottom corner of the matrix
  return matrix[matrix.length - 1][matrix[0].length - 1];
};
export const randomStatus = () => {
  if (Math.random() > 0.5) {
    return 'Dispatched';
  }
  return 'Shipped';
};
