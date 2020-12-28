import { setFetchedAddresses } from '../../store/AddressStore';
export const isNonEmpty = value => {
  // console.log(value);
  if (value.length < 1) {
    return false;
  }
  return true;
};
export const validEmail = value => {
  // console.log(value);
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
};
export const validPassword = value => {
  if (value.length < 5) {
    return false;
  }
  return true;
};
export const validConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};
export const validPinCode = (pincode, addressEntered) => {
  return fetch('https://api.postalpincode.in/pincode/' + pincode)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      // console.log(data[0].Status !== 'Success');
      if (data[0].Status !== 'Success') {
        return false;
      }
      setFetchedAddresses(data[0].PostOffice, addressEntered);
      return true;
    })
    .catch(err => {
      console.log(err);
      return false;
    });
};

export const validPhoneNumber = value => {
  if (value.trim().length === 10) return true;
  return false;
};
