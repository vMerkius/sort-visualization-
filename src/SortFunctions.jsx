const timer = (ms) => new Promise((res) => setTimeout(res, ms));

export const bubbleSort = (
  arr,
  updateArr,
  setHighlightNext,
  setHighlightPrevious,
  delay = 1000,
  setTime
) => {
  const sorting = async () => {
    let startTime = Date.now();
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          let tmp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = tmp;
          updateArr([...arr]);
          setHighlightNext(j + 1);
          setHighlightPrevious(j);
        } else {
          setHighlightNext(j + 1);
          setHighlightPrevious(j);
        }
        await timer(delay);
      }
    }

    let endTime = Date.now();
    let timeElapsed = endTime - startTime;
    setTime(timeElapsed);
    setHighlightPrevious(-1);
    setHighlightNext(-1);
  };
  sorting();
};

export const selectionSort = (
  arr,
  updateArr,
  setHighlightNext,
  setHighlightPrevious,
  delay = 1000,
  setTime
) => {
  const sorting = async () => {
    let startTime = Date.now();
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
          updateArr([...arr]);
        }
        await timer(delay);
      }
    }

    let endTime = Date.now();
    let timeElapsed = endTime - startTime;
    setTime(timeElapsed);
    setHighlightPrevious(-1);
    setHighlightNext(-1);
  };
  sorting();
};

export const insertionSort = (
  arr,
  updateArr,
  setHighlightNext,
  setHighlightPrevious,
  delay = 1000,
  setTime
) => {
  const sorting = async () => {
    let startTime = Date.now();

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
        updateArr([...arr]);
        await timer(delay);
        j--;
      }

      arr[j + 1] = key;
      updateArr([...arr]);
      await timer(delay);
    }

    let endTime = Date.now();
    let timeElapsed = endTime - startTime;
    setTime(timeElapsed);
    setHighlightPrevious(-1);
    setHighlightNext(-1);
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
export const bogoSort = async (arr, updateArr, delay = 1000, setTime) => {
  const sorting = async () => {
    let startTime = Date.now();
    while (!isSorted(arr)) {
      arr = shuffle(arr);
      updateArr([...arr]);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    let endTime = Date.now();
    let timeElapsed = endTime - startTime;
    setTime(timeElapsed);
  };
  sorting();
};

export const quickSort = async (
  arr,
  updateArr,
  setHighlightNext,
  setHighlightPrevious,
  setPivot,
  start = 0,
  end = inputArr.length - 1,
  delay = 1000,
  setTime,
  isFirst = true
) => {
  let startTime;
  const sorting = async () => {
    if (isFirst) startTime = Date.now();
    if (start < end) {
      let pivotIndex = await partition(
        arr,
        start,
        end,
        updateArr,
        setHighlightNext,
        setHighlightPrevious,
        setPivot,
        delay
      );

      await quickSort(
        arr,
        updateArr,
        setHighlightNext,
        setHighlightPrevious,
        setPivot,
        start,
        pivotIndex - 1,
        delay,
        setTime,
        false
      );

      await quickSort(
        arr,
        updateArr,
        setHighlightNext,
        setHighlightPrevious,
        setPivot,
        pivotIndex + 1,
        end,
        delay,
        setTime,
        false
      );
    }
    let endTime = Date.now();
    let timeElapsed = endTime - startTime;
    setTime(timeElapsed);
    setHighlightPrevious(-1);
    setHighlightNext(-1);
  };
  await sorting();
};

const partition = async (
  arr,
  start,
  end,
  updateArr,
  setHighlightNext,
  setHighlightPrevious,
  setPivot,
  delay
) => {
  let middle = Math.floor((start + end) / 2);
  [arr[end], arr[middle]] = [arr[middle], arr[end]];
  let pivotValue = arr[end];
  let pivotIndex = start;
  setPivot(end);

  for (let i = start; i < end; i++) {
    setHighlightNext(i);

    await timer(delay);

    if (arr[i] < pivotValue) {
      setHighlightPrevious(pivotIndex);
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
      updateArr([...arr]);
      pivotIndex++;
      await timer(delay);
    }
  }

  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
  updateArr([...arr]);
  setHighlightNext(end);

  return pivotIndex;
};

export const mergeSort = async (
  arr,
  updateArr,
  setHighlightNext,
  setHighlightPrevious,
  start = 0,
  end = arr.length - 1,
  delay = 1000,
  setTime,
  isFirst = true
) => {
  let startTime;
  const sorting = async () => {
    if (isFirst) startTime = Date.now();
    if (start < end) {
      let middle = Math.floor((start + end) / 2);

      await mergeSort(
        arr,
        updateArr,
        setHighlightNext,
        setHighlightPrevious,
        start,
        middle,
        delay,
        setTime,
        false
      );

      await mergeSort(
        arr,
        updateArr,
        setHighlightNext,
        setHighlightPrevious,
        middle + 1,
        end,
        delay,
        setTime,
        false
      );

      await merge(
        arr,
        start,
        middle,
        end,
        updateArr,
        setHighlightNext,
        setHighlightPrevious,
        delay
      );
    }
    let endTime = Date.now();
    let timeElapsed = endTime - startTime;
    setTime(timeElapsed);
    setHighlightPrevious(-1);
    setHighlightNext(-1);
  };
  await sorting();
};

const merge = async (
  arr,
  start,
  middle,
  end,
  updateArr,
  setHighlightNext,
  setHighlightPrevious,
  delay
) => {
  let left = arr.slice(start, middle + 1);
  let right = arr.slice(middle + 1, end + 1);
  let i = 0,
    j = 0,
    k = start;

  while (i < left.length && j < right.length) {
    setHighlightNext(start + i);
    setHighlightPrevious(middle + 1 + j);
    await timer(delay);
    if (left[i] <= right[j]) {
      arr[k++] = left[i++];
    } else {
      arr[k++] = right[j++];
    }
    updateArr([...arr]);
    await timer(delay);
  }

  while (i < left.length) {
    setHighlightNext(start + i);
    setHighlightPrevious(-1);
    await timer(delay);
    arr[k++] = left[i++];
    updateArr([...arr]);
    await timer(delay);
  }

  while (j < right.length) {
    setHighlightPrevious(middle + 1 + j);
    setHighlightNext(-1);
    await timer(delay);
    arr[k++] = right[j++];
    updateArr([...arr]);
    await timer(delay);
  }
};
