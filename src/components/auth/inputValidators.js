import {
  setFetchedAddresses,
  addressLineModifiedChangeMatchedAddress,
} from '../../store/AddressStore';
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
    // we want it to be 6 later since this is minimum length of password
    // for firebase
    return false;
  }
  return true;
};
export const validConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};
export const validPinCode = (pincode, addressEntered, index) => {
  return fetch('https://api.postalpincode.in/pincode/' + pincode)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      // console.log(data[0].Status !== 'Success');
      if (data[0].Status !== 'Success') {
        setFetchedAddresses([], addressEntered, index);
        return false;
      }
      setFetchedAddresses(data[0].PostOffice, addressEntered, index);
      return true;
    })
    .catch(err => {
      console.log(err);
      return false;
    });
};
export const validAddress = (addressEntered, index) => {
  // console.log(addressEntered);
  addressLineModifiedChangeMatchedAddress(addressEntered, index);
  if ((addressEntered.address1 + addressEntered.address2).trim().length > 0) {
    return true;
  }
  return false;
};
export const validPhoneNumber = value => {
  if (value.startsWith('0') || value.startsWith('+')) return false;
  if (!+value) return false;
  if (value.trim().length === 10) return true;
  return false;
};
