// ==================== DIVIDE & CONQUER ALGORITHMS ====================

// Heap Sort
function buildMaxHeap(arr, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        buildMaxHeap(arr, n, largest);
    }
}

function heapSort(arr) {
    let n = arr.length;
    let steps = [];

    steps.push(`Initial array: [${arr.join(', ')}]`);

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        buildMaxHeap(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        steps.push(`Swap root with last element: [${arr.join(', ')}]`);
        buildMaxHeap(arr, i, 0);
    }

    return { result: arr, steps };
}

// Merge Sort
function mergeArrays(left, right) {
    let result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
}

function mergeSortHelper(arr, steps) {
    if (arr.length <= 1) return arr;

    let mid = Math.floor(arr.length / 2);
    let left = mergeSortHelper(arr.slice(0, mid), steps);
    let right = mergeSortHelper(arr.slice(mid), steps);
    let merged = mergeArrays(left, right);

    steps.push(`Merged [${left.join(', ')}] and [${right.join(', ')}] → [${merged.join(', ')}]`);

    return merged;
}

function mergeSort(arr) {
    let steps = [];
    steps.push(`Initial array: [${arr.join(', ')}]`);
    let result = mergeSortHelper([...arr], steps);
    return { result, steps };
}

// Quick Sort
function partition(arr, low, high, steps) {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push(`After partition (pivot=${pivot}): [${arr.join(', ')}]`);
    return i + 1;
}

function quickSortHelper(arr, low, high, steps) {
    if (low < high) {
        let pi = partition(arr, low, high, steps);
        quickSortHelper(arr, low, pi - 1, steps);
        quickSortHelper(arr, pi + 1, high, steps);
    }
}

function quickSort(arr) {
    let steps = [];
    steps.push(`Initial array: [${arr.join(', ')}]`);
    let result = [...arr];
    quickSortHelper(result, 0, result.length - 1, steps);
    return { result, steps };
}

// Binary Search
function binarySearch(arr, target) {
    let steps = [];
    let left = 0, right = arr.length - 1;
    let found = false;
    let foundIndex = -1;

    steps.push(`Search for ${target} in [${arr.join(', ')}]`);

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        steps.push(`Checking: left=${left}, mid=${mid} (value=${arr[mid]}), right=${right}`);

        if (arr[mid] === target) {
            found = true;
            foundIndex = mid;
            steps.push(`Element found at index ${mid}`);
            break;
        } else if (arr[mid] < target) {
            steps.push(`${arr[mid]} < ${target}, search right half`);
            left = mid + 1;
        } else {
            steps.push(`${arr[mid]} > ${target}, search left half`);
            right = mid - 1;
        }
    }

    if (!found) {
        steps.push(`Element ${target} not found in array`);
    }

    return { found, index: foundIndex, steps };
}

// Strassen Matrix Multiplication (2x2)
function strassen2x2(A, B) {
    const a = A[0][0], b = A[0][1], c = A[1][0], d = A[1][1];
    const e = B[0][0], f = B[0][1], g = B[1][0], h = B[1][1];

    let steps = [];

    const m1 = (a + d) * (e + h);
    const m2 = (c + d) * e;
    const m3 = a * (f - h);
    const m4 = d * (g - e);
    const m5 = (a + b) * h;
    const m6 = (c - a) * (e + f);
    const m7 = (b - d) * (g + h);

    steps.push(`Matrix A: [[${a}, ${b}], [${c}, ${d}]]`);
    steps.push(`Matrix B: [[${e}, ${f}], [${g}, ${h}]]`);
    steps.push(`Strassen's 7 multiplications computed`);

    const p11 = m1 + m4 - m5 + m7;
    const p12 = m3 + m5;
    const p21 = m2 + m4;
    const p22 = m1 - m2 + m3 + m6;

    const result = [[p11, p12], [p21, p22]];

    steps.push(`Result: [[${p11}, ${p12}], [${p21}, ${p22}]]`);

    return { result, steps };
}

// ==================== STRING MATCHING ALGORITHMS ====================

// Naive Pattern Matching Algorithm
function naivePatternMatching(text, pattern) {
    let n = text.length;
    let m = pattern.length;
    let steps = [];
    let matches = [];
    let comparisons = 0;

    steps.push(`Text: "${text}"`);
    steps.push(`Pattern: "${pattern}"`);
    steps.push(`Text length: ${n}, Pattern length: ${m}`);
    steps.push(`Starting character-by-character comparison from each position...`);

    for (let i = 0; i <= n - m; i++) {
        let j = 0;
        steps.push(`\n--- Position ${i} ---`);

        while (j < m && pattern[j] === text[i + j]) {
            comparisons++;
            steps.push(`Compare pattern[${j}]='${pattern[j]}' with text[${i + j}]='${text[i + j]}' ✓`);
            j++;
        }

        if (j === m) {
            matches.push(i);
            steps.push(`✓ Match found at index ${i}`);
        } else if (j > 0) {
            comparisons++;
            steps.push(`Mismatch at pattern[${j}]='${pattern[j]}' with text[${i + j}]='${text[i + j]}' ✗`);
        }
    }

    steps.push(`\nTotal comparisons: ${comparisons}`);
    if (matches.length === 0) {
        steps.push(`✗ No matches found`);
    } else {
        steps.push(`Total matches: ${matches.length}`);
    }

    return { matches, steps, comparisons };
}

// Rabin-Karp Algorithm
function rabinKarpAlgorithm(text, pattern) {
    const BASE = 256;
    const MOD = 101; // Prime number for hashing

    let n = text.length;
    let m = pattern.length;
    let steps = [];
    let matches = [];
    let hashComparisons = 0;
    let charComparisons = 0;

    steps.push(`Text: "${text}"`);
    steps.push(`Pattern: "${pattern}"`);
    steps.push(`Using Rabin-Karp with BASE=${BASE}, MOD=${MOD}`);

    // Calculate hash for pattern and first window of text
    let patternHash = 0;
    let textHash = 0;
    let h = 1;

    for (let i = 0; i < m - 1; i++) {
        h = (h * BASE) % MOD;
    }

    steps.push(`Calculated h (BASE^(m-1) mod MOD) = ${h}`);

    // Calculate pattern hash
    for (let i = 0; i < m; i++) {
        patternHash = (BASE * patternHash + pattern.charCodeAt(i)) % MOD;
        textHash = (BASE * textHash + text.charCodeAt(i)) % MOD;
    }

    steps.push(`Pattern hash: ${patternHash}`);
    steps.push(`Starting sliding window search...`);

    // Slide the pattern over text
    for (let i = 0; i <= n - m; i++) {
        steps.push(`\n--- Window at position ${i}: "${text.substring(i, i + m)}" ---`);
        hashComparisons++;

        if (patternHash === textHash) {
            steps.push(`Hash match! (${patternHash} === ${textHash})`);

            // Check character by character
            let j = 0;
            while (j < m && pattern[j] === text[i + j]) {
                charComparisons++;
                j++;
            }

            if (j === m) {
                matches.push(i);
                steps.push(`✓ Character match confirmed at index ${i}`);
            } else {
                steps.push(`Hash collision! Characters don't match at position ${j}`);
            }
        } else {
            steps.push(`Hash mismatch (${patternHash} !== ${textHash})`);
        }

        // Calculate hash for next window
        if (i < n - m) {
            textHash = (BASE * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % MOD;
            if (textHash < 0) {
                textHash = textHash + MOD;
            }
        }
    }

    steps.push(`\nTotal hash comparisons: ${hashComparisons}`);
    steps.push(`Total character comparisons: ${charComparisons}`);
    if (matches.length === 0) {
        steps.push(`✗ No matches found`);
    } else {
        steps.push(`Total matches: ${matches.length}`);
    }

    return { matches, steps };
}

// KMP (Knuth-Morris-Pratt) Algorithm
function computeLPS(pattern) {
    let m = pattern.length;
    let lps = Array(m).fill(0);
    let len = 0;
    let i = 1;

    while (i < m) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
}

function kmpAlgorithm(text, pattern) {
    let n = text.length;
    let m = pattern.length;
    let steps = [];
    let matches = [];

    steps.push(`Text: "${text}"`);
    steps.push(`Pattern: "${pattern}"`);
    steps.push(`Building LPS array for pattern...`);

    let lps = computeLPS(pattern);
    steps.push(`LPS Array: [${lps.join(', ')}]`);
    steps.push(`Searching for pattern in text...`);

    let i = 0;
    let j = 0;

    while (i < n) {
        if (pattern[j] === text[i]) {
            i++;
            j++;
        }

        if (j === m) {
            matches.push(i - j);
            steps.push(`✓ Match found at index ${i - j}`);
            j = lps[j - 1];
        } else if (i < n && pattern[j] !== text[i]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }

    if (matches.length === 0) {
        steps.push(`✗ No matches found`);
    } else {
        steps.push(`Total matches: ${matches.length}`);
    }

    return { matches, steps };
}

// Boyer-Moore Algorithm
function computeBadCharTable(pattern) {
    let table = {};
    for (let i = 0; i < pattern.length; i++) {
        table[pattern[i]] = pattern.length - i - 1;
    }
    return table;
}

function boyerMooreAlgorithm(text, pattern) {
    let n = text.length;
    let m = pattern.length;
    let steps = [];
    let matches = [];

    steps.push(`Text: "${text}"`);
    steps.push(`Pattern: "${pattern}"`);
    steps.push(`Building bad character table...`);

    let badCharTable = computeBadCharTable(pattern);
    steps.push(`Bad Character Table: ${JSON.stringify(badCharTable)}`);
    steps.push(`Searching for pattern in text...`);

    let i = m - 1;

    while (i < n) {
        let j = m - 1;

        while (j >= 0 && text[i] === pattern[j]) {
            i--;
            j--;
        }

        if (j < 0) {
            matches.push(i + 1);
            steps.push(`✓ Match found at index ${i + 1}`);
            i += m + 1;
        } else {
            let badCharShift = badCharTable[text[i]] || m;
            i += Math.max(badCharShift, 1);
        }
    }

    if (matches.length === 0) {
        steps.push(`✗ No matches found`);
    } else {
        steps.push(`Total matches: ${matches.length}`);
    }

    return { matches, steps };
}
