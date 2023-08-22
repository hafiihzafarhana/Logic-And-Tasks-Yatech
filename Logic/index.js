function handlingLogic(dataArr, getData, iWantToGet) {
  const newArr = [];

  for (let i = 0; i <= dataArr.length - getData; i++) {
    // Sparated array being sub array
    const sparateArr = dataArr.slice(i, i + getData);
    // push to array being array 2 dimension
    newArr.push(sparateArr);
  }

  // Sum of sub array if sub_arr[i] + sub_arr[i+...] = iWantToGet
  let timeOfSum = 0;

  for (const subArray of newArr) {
    let isSum = false;
    // array[i]
    for (let j = 0; j < subArray.length; j++) {
      // array[i][j]
      for (let k = j + 1; k < subArray.length; k++) {
        // If there is an addition of sub arrays, give isSum = true. at least 1 pair, if there are 2 pairs in one sub array still count 1
        if (subArray[j] + subArray[k] == iWantToGet) {
          isSum = true;
          break; // i can break because if there are 2 pairs, still count 1
        }
      }

      if (isSum) {
        timeOfSum++;
        break;
      }
    }
  }

  return timeOfSum > 0
    ? `There is ${timeOfSum} times the number of additions to the sub array`
    : "No addition of sub arrays";
}

// The array
const dataArr = [15, 8, 8, 2, 6, 4, 1, 7];

// count of sub arrya
let getData = 2;
// sum array
let iWantToGet = 8;

const handler = handlingLogic(dataArr, getData, iWantToGet);

console.log(handler);
