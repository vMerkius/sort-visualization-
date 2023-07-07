const swap = (arr, xp, yp) => {
  let temp = arr[xp];
  arr[xp] = arr[yp];
  arr[yp] = temp;
};

export const bubbleSort = (
  arr,
  updateFunc,
  updateIndexFunc,
  updateIndexPrevious,
  delay = 1000,
  stop
) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      setTimeout(() => {
        if (!stop) {
          if (arr[j] > arr[j + 1]) {
            let tmp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = tmp;
            updateFunc([...arr]);
            updateIndexFunc(j + 1);
            updateIndexPrevious(j);
          } else {
            updateIndexFunc(j + 1);
            updateIndexPrevious(j);
          }
        } else {
          return;
        }
      }, (i * arr.length + j) * delay);
    }
  }
};
export const selectionSort = (
  arr,
  updateFunc,
  updateIndexFunc,
  updateIndexPrevious,
  delay = 500
) => {
  const length = arr.length;

  for (let i = 0; i < length - 1; i++) {
    for (let j = i + 1; j < length; j++) {
      setTimeout(() => {
        let min_idx = i;
        if (arr[j] < arr[min_idx]) min_idx = j;
        updateIndexFunc(j);
        updateIndexPrevious(min_idx);
        if (min_idx !== i) {
          let tmp = arr[i];
          arr[i] = arr[min_idx];
          arr[min_idx] = tmp;
          updateFunc([...arr]);
        }
      }, delay * (j + i * length));
    }
  }
};

// export const insertionSort = (
//   arr,
//   updateFunc,
//   updateIndexFunc,
//   updateIndexPrevious,
//   delay = 500
// ) => {
//   let totalComparisons = 0;
//   for (let i = 1; i < arr.length; i++) {
//     setTimeout(() => {
//       let key = arr[i];
//       let j = i - 1;
//       updateIndexFunc(i); // Highlight the "key" element
//       updateIndexPrevious(j); // Highlight the element that is being compared to the "key"
//       while (j >= 0 && arr[j] > key) {
//         arr[j + 1] = arr[j];
//         j--;
//         updateIndexPrevious(j);
//       }
//       arr[j + 1] = key;
//       updateFunc([...arr]);
//     }, delay * totalComparisons++);
//   }
//   setTimeout(() => {
//     updateIndexFunc(-1); // Reset the highlighted index after sorting
//     updateIndexPrevious(-1); // Reset the previously highlighted index
//   }, delay * totalComparisons);
// };
export const insertionSort = (
  arr,
  updateFunc,
  updateIndexFunc,
  updateIndexPrevious,
  delay = 500
) => {
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  const sorting = async () => {
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      updateIndexFunc(i); // Highlight the "key" element
      updateIndexPrevious(j); // Highlight the element that is being compared to the "key"
      // updateIndexFunc(i); // Highlight the "key" element
      await timer(delay); // Wait for delay

      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        updateIndexFunc(j + 1); // Highlight the "key" element
        updateIndexPrevious(j); // Highlight the element that is being compared to the "key"
        updateFunc([...arr]);
        await timer(delay); // Wait for delay
        j--;
      }

      arr[j + 1] = key;
      updateFunc([...arr]);
      await timer(delay); // Wait for delay
    }

    updateIndexFunc(-1); // Reset the highlighted index after sorting
    updateIndexPrevious(-1); // Reset the previously highlighted index
  };

  sorting();
};

const isSorted = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) {
      return false;
    }
  }
  return true;
};

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const bogoSort = async (
  arr,
  updateFunc,
  updateIndexFunc,
  delay = 1000
) => {
  updateIndexFunc(-1);
  while (!isSorted(arr)) {
    arr = shuffle(arr);
    updateFunc([...arr]);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
};

export const quickSort = async (
  inputArr,
  updateFunc,
  updateIndexFunc,
  updateIndexPrevious,
  start = 0,
  end = inputArr.length - 1,
  delay = 50
) => {
  console.log(inputArr);
  let arr = [...inputArr];
  if (start >= end) {
    return;
  }

  let index = await partition(
    arr,
    start,
    end,
    updateFunc,
    updateIndexFunc,
    updateIndexPrevious,
    delay
  );

  // sort left half
  await quickSort(
    arr,
    updateFunc,
    updateIndexFunc,
    updateIndexPrevious,
    start,
    index - 1,
    delay
  );
  // sort right half
  await quickSort(
    arr,
    updateFunc,
    updateIndexFunc,
    updateIndexPrevious,
    index + 1,
    end,
    delay
  );

  // updateFunc([...arr]);
  updateIndexFunc(-1);
  updateIndexPrevious(-1);
};

// async function partition(
//   arr,
//   start,
//   end,
//   updateFunc,
//   updateIndexFunc,
//   updateIndexPrevious,
//   delay
// ) {
//   let pivotValue = arr[end];
//   let pivotIndex = start;
//   for (let i = start; i < end; i++) {
//     if (arr[i] < pivotValue) {
//       // swapping elements
//       [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
//       // moving to next element
//       pivotIndex++;

//       updateFunc([...arr]);
//       updateIndexFunc(i);
//       updateIndexPrevious(pivotIndex);
//       await new Promise((resolve) => setTimeout(resolve, delay));
//     }
//   }

//   // putting the pivot value in the middle
//   [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
//   updateFunc([...arr]);
//   updateIndexFunc(end);
//   updateIndexPrevious(pivotIndex);
//   await new Promise((resolve) => setTimeout(resolve, delay));

//   return pivotIndex;
// }
async function partition(
  arr,
  start,
  end,
  updateFunc,
  updateIndexFunc,
  updateIndexPrevious,
  delay
) {
  let pivotValue = arr[end];
  let pivotIndex = start;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      // swapping elements synchronously
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
      // moving to next element
      pivotIndex++;
    }
  }

  // putting the pivot value in the middle synchronously
  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];

  for (let i = start; i <= end; i++) {
    // updating UI asynchronously
    updateFunc([...arr]);
    updateIndexFunc(i);
    updateIndexPrevious(pivotIndex);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  return pivotIndex;
}
// async function partition(
//   arr,
//   start,
//   end,
//   updateFunc,
//   updateIndexFunc,
//   updateIndexPrevious,
//   delay
// ) {
//   let pivotValue = arr[end];
//   let pivotIndex = start;

//   for (let i = start; i < end; i++) {
//     if (arr[i] < pivotValue) {
//       // moving elements
//       let temp = arr[i];
//       for (let j = i; j > pivotIndex; j--) {
//         arr[j] = arr[j - 1];
//       }
//       arr[pivotIndex] = temp;

//       pivotIndex++;

//       updateFunc([...arr]);
//       updateIndexFunc(i);
//       updateIndexPrevious(pivotIndex);
//       await new Promise((resolve) => setTimeout(resolve, delay));
//     }
//   }

//   // moving the pivot value to its right place
//   let temp = arr[end];
//   for (let i = end; i > pivotIndex; i--) {
//     arr[i] = arr[i - 1];
//   }
//   arr[pivotIndex] = temp;

//   updateFunc([...arr]);
//   updateIndexFunc(end);
//   updateIndexPrevious(pivotIndex);
//   await new Promise((resolve) => setTimeout(resolve, delay));
// }
