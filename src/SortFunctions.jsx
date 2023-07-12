const timer = (ms) => new Promise((res) => setTimeout(res, ms));

export const bubbleSort = (
  arr,
  updateFunc,
  setHighlightNext,
  setHighlightPrevious,
  delay = 1000
) => {
  const sorting = async () => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          let tmp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = tmp;
          updateFunc([...arr]);
          setHighlightNext(j + 1);
          setHighlightPrevious(j);
        } else {
          setHighlightNext(j + 1);
          setHighlightPrevious(j);
        }
        await timer(delay);
      }
    }
  };
  sorting();
};
export const selectionSort = (
  arr,
  updateFunc,
  setHighlightNext,
  setHighlightPrevious,
  delay = 1000
) => {
  const sorting = async () => {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        let min_idx = i;
        if (arr[j] < arr[min_idx]) min_idx = j;
        setHighlightNext(j);
        setHighlightPrevious(min_idx);
        if (min_idx !== i) {
          let tmp = arr[i];
          arr[i] = arr[min_idx];
          arr[min_idx] = tmp;
          updateFunc([...arr]);
        }
        await timer(delay);
      }
    }
  };
  sorting();
};

export const insertionSort = (
  arr,
  updateFunc,
  setHighlightNext,
  setHighlightPrevious,
  delay = 1000
) => {
  const sorting = async () => {
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      setHighlightNext(i);
      setHighlightPrevious(j);
      await timer(delay);

      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        setHighlightNext(j + 1);
        setHighlightPrevious(j);
        updateFunc([...arr]);
        await timer(delay);
        j--;
      }

      arr[j + 1] = key;
      updateFunc([...arr]);
      await timer(delay);
    }

    setHighlightNext(-1);
    setHighlightPrevious(-1);
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

export const bogoSort = async (arr, updateFunc, delay = 1000) => {
  while (!isSorted(arr)) {
    arr = shuffle(arr);
    updateFunc([...arr]);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
};

export const quickSort = async (
  inputArr,
  updateFunc,
  setHighlightNext,
  setHighlightPrevious,
  start = 0,
  end = inputArr.length - 1,
  delay = 50
) => {
  let arr = [...inputArr];
  if (start < end) {
    let pivotIndex = await partition(
      arr,
      start,
      end,
      updateFunc,
      setHighlightNext,
      setHighlightPrevious,
      delay
    );

    await quickSort(
      arr,
      updateFunc,
      setHighlightNext,
      setHighlightPrevious,
      start,
      pivotIndex - 1,
      delay
    );

    await quickSort(
      arr,
      updateFunc,
      setHighlightNext,
      setHighlightPrevious,
      pivotIndex + 1,
      end,
      delay
    );
  }
};

const partition = async (
  arr,
  start,
  end,
  updateFunc,
  setHighlightNext,
  setHighlightPrevious,
  delay
) => {
  let pivotValue = arr[end];
  let pivotIndex = start;

  for (let i = start; i < end; i++) {
    setHighlightNext(i);
    setHighlightPrevious(pivotIndex);
    await timer(delay);

    if (arr[i] < pivotValue) {
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
      pivotIndex++;
      updateFunc([...arr]);
    }
  }

  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
  updateFunc([...arr]);
  setHighlightNext(end);
  setHighlightPrevious(pivotIndex);
  await timer(delay);

  return pivotIndex;
};
