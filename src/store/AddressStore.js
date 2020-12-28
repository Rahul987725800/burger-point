import { writable } from 'svelte/store';
import { largestCommonCharacters, preprocessString } from '../utils';
const initialState = {
  fetchedAddresses: [],
  matchedAddress: [],
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
  let userAddressString = addressEntered.address1 + addressEntered.address2;
  AddressStore.update(state => {
    let selectedAddress = state.matchedAddress[index];
    // console.log(state.fetchedAddresses[index].indexOf(selectedAddress));
    if (!selectedAddress || !selectedAddress.isManuallySelected) {
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
      selectedAddress.userAddress = addressEntered;
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

const searchMatchedAddress = (addresses = [], userAddressString) => {
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

export default AddressStore;
export { setFetchedAddresses, addressLineModifiedChangeMatchedAddress };
