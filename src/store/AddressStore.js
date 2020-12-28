import { writable } from 'svelte/store';
import { largestCommonCharacters, preprocessString } from '../utils';
const initialState = {
  fetchedAddresses: [],
  matchedAddress: null,
};
const AddressStore = writable(initialState);
const setFetchedAddresses = (addresses, addressEntered) => {
  // console.log(addresses);
  AddressStore.update(state => {
    const modifiedAddresses = [];

    for (let address of addresses) {
      modifiedAddresses.push(address);
    }
    state.fetchedAddresses = modifiedAddresses;
    // console.log(modifiedAddresses);
    state.matchedAddress = searchMatchedAddress(
      modifiedAddresses,
      addressEntered
    );
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

const searchMatchedAddress = (addresses, addressEntered) => {
  // console.log(addresses);
  addressEntered = preprocessString(addressEntered);
  let mostCommonNum = -1;
  let mostCommonAddr;
  for (let address of addresses) {
    const { Name, District, Division, Region } = address;

    const addressString = preprocessString(Name + District + Division + Region);

    const res = largestCommonCharacters(addressEntered, addressString);
    // console.log(res, addressEntered, addressString);
    if (res > mostCommonNum) {
      mostCommonNum = res;
      mostCommonAddr = address;
    }
  }
  // console.log(mostCommonAddr);
  return mostCommonAddr;
};

export default AddressStore;
export { setFetchedAddresses };
