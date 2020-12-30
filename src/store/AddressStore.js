import { writable } from 'svelte/store';
import { largestCommonCharacters, preprocessString } from '../utils';
const initialState = {
  fetchedAddresses: [],
  matchedAddress: [],
  value: '',
};
const AddressStore = writable(initialState);
const setFetchedAddresses = (addresses, addressEntered, index) => {
  // console.log(addresses);

  AddressStore.update(state => {
    const modifiedAddresses = [];

    for (let address of addresses) {
      address.isDefault = index === 0;
      address.isValid = false;
      address.isManuallySelected = false;
      modifiedAddresses.push(address);
    }
    state.fetchedAddresses[index] = modifiedAddresses;
    if (addresses.length > 0) {
      addressLineModifiedChangeMatchedAddress(addressEntered, index);
    } else {
      state.fetchedAddresses[index] = null;
      state.matchedAddress[index] = null;
    }
    // console.log(modifiedAddresses);
    // console.log(state);
    return state;
  });
  // addressLineModifiedChangeMatchedAddress(addressEntered, index);
  // can be called before returning state also;
};
const addressLineModifiedChangeMatchedAddress = (addressEntered, index) => {
  if (!addressEntered) return;
  let userAddressString = addressEntered.address1 + addressEntered.address2;
  AddressStore.update(state => {
    let selectedAddress = state.matchedAddress[index];
    // console.log(state.fetchedAddresses[index].indexOf(selectedAddress));
    if (
      state.fetchedAddresses[index] &&
      (!selectedAddress || !selectedAddress.isManuallySelected)
    ) {
      selectedAddress = searchMatchedAddress(
        state.fetchedAddresses[index],
        userAddressString
      );
      // console.log('updating selected address', selectedAddress);
    }

    if (selectedAddress) {
      if (userAddressString.trim().length > 0) {
        selectedAddress.isValid = true;
      } else {
        selectedAddress.isValid = false;
      }
      selectedAddress.inputAddress = addressEntered;
      state.matchedAddress[index] = selectedAddress;
    }

    // console.log(state);
    return state;
  });
};
// fields
//   Name,
//   District,
//   Division,
//   Region,
//   Circle,
//   State,
//   Country,

const searchMatchedAddress = (addresses, userAddressString) => {
  // console.log(addresses);
  userAddressString = preprocessString(userAddressString);
  let mostCommonNum = -1;
  let mostCommonAddr;
  for (let address of addresses) {
    const { Name, District, Division, Region } = address;

    const addressString = preprocessString(Name + District + Division + Region);

    const res = largestCommonCharacters(userAddressString, addressString);
    // console.log(res, userAddressString, addressString);
    if (res > mostCommonNum) {
      mostCommonNum = res;
      mostCommonAddr = address;
    }
  }
  // console.log(mostCommonAddr);
  return mostCommonAddr;
};
const getFetchedAddressesForMatchedAddress = (pincode, index) => {
  fetch('https://api.postalpincode.in/pincode/' + pincode)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      setFetchedAddresses(data[0].PostOffice, null, index);
    })
    .catch(err => {
      console.log(err);
    });
};
const makeAddressDefault = index => {
  let defaultIndex = -1;
  AddressStore.update(state => {
    for (let i = 0; i < state.matchedAddress.length; i++) {
      if (state.matchedAddress[i].isDefault === true) {
        state.matchedAddress[i].isDefault = false;
        defaultIndex = i;
      }
    }
    state.matchedAddress[index].isDefault = true;
    return state;
  });
  return defaultIndex;
};
const resetAddressState = () => {
  // console.log('resetting state');
  AddressStore.update(state => {
    state.fetchedAddresses = [];
    state.matchedAddress = [];
    return state;
  });
};

export default AddressStore;
export {
  setFetchedAddresses,
  addressLineModifiedChangeMatchedAddress,
  getFetchedAddressesForMatchedAddress,
  makeAddressDefault,
  resetAddressState,
};
