// ==================== ALGORITHM COMPLEXITY INFO ====================
const ALGORITHM_COMPLEXITY = {
    'heap-sort': {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n log n)',
        space: 'O(1)'
    },
    'merge-sort': {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n log n)',
        space: 'O(n)'
    },
    'quick-sort': {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n²)',
        space: 'O(log n)'
    },
    'binary-search': {
        best: 'O(1)',
        average: 'O(log n)',
        worst: 'O(log n)',
        space: 'O(1)'
    },
    'strassen': {
        best: 'O(n^2.807)',
        average: 'O(n^2.807)',
        worst: 'O(n^2.807)',
        space: 'O(n^2.807)'
    },
    'fractional-knapsack': {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n log n)',
        space: 'O(1)'
    },
    'huffman-coding': {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n log n)',
        space: 'O(k)'
    },
    'prims': {
        best: 'O(E log V)',
        average: 'O(E log V)',
        worst: 'O(E log V)',
        space: 'O(V)'
    },
    'kruskal': {
        best: 'O(E log E)',
        average: 'O(E log E)',
        worst: 'O(E log E)',
        space: 'O(V)'
    },
    'lcs': {
        best: 'O(m·n)',
        average: 'O(m·n)',
        worst: 'O(m·n)',
        space: 'O(m·n)'
    },
    'knapsack-01': {
        best: 'O(n·W)',
        average: 'O(n·W)',
        worst: 'O(n·W)',
        space: 'O(n·W)'
    },
    'chain-mult': {
        best: 'O(n³)',
        average: 'O(n³)',
        worst: 'O(n³)',
        space: 'O(n²)'
    },
    'tsp': {
        best: 'O(n!)',
        average: 'O(n!)',
        worst: 'O(n!)',
        space: 'O(n)'
    },
    'n-queens': {
        best: 'O(n)',
        average: 'O(n!)',
        worst: 'O(n!)',
        space: 'O(n)'
    },
    'naive': {
        best: 'O(n)',
        average: 'O((n-m+1)·m)',
        worst: 'O((n-m+1)·m)',
        space: 'O(1)'
    },
    'rabin-karp': {
        best: 'O(n+m)',
        average: 'O(n+m)',
        worst: 'O((n-m+1)·m)',
        space: 'O(1)'
    },
    'kmp': {
        best: 'O(n+m)',
        average: 'O(n+m)',
        worst: 'O(n+m)',
        space: 'O(m)'
    },
    'boyer-moore': {
        best: 'O(n/m)',
        average: 'O(n)',
        worst: 'O((n-m+1)·m)',
        space: 'O(m)'
    },
    'dijkstra': {
        best: 'O(E log V)',
        average: 'O(E log V)',
        worst: 'O(E log V)',
        space: 'O(V)'
    },
    'bellman-ford': {
        best: 'O(E·V)',
        average: 'O(E·V)',
        worst: 'O(E·V)',
        space: 'O(V)'
    },
    'floyd-warshall': {
        best: 'O(V³)',
        average: 'O(V³)',
        worst: 'O(V³)',
        space: 'O(V²)'
    },
    'tsp-backtracking': {
        best: 'O(n!)',
        average: 'O(n!)',
        worst: 'O(n!)',
        space: 'O(n)'
    },
    'tsp-branch-bound': {
        best: 'O(n² * 2^n)',
        average: 'O(n² * 2^n)',
        worst: 'O(n² * 2^n)',
        space: 'O(n²)'
    },
    'ford-fulkerson': {
        best: 'O(E * max_flow)',
        average: 'O(E * max_flow)',
        worst: 'O(E * max_flow)',
        space: 'O(V²)'
    }
};

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
    // For 2x2 matrices: [[a, b], [c, d]] and [[e, f], [g, h]]
    const a = A[0][0], b = A[0][1], c = A[1][0], d = A[1][1];
    const e = B[0][0], f = B[0][1], g = B[1][0], h = B[1][1];

    let steps = [];

    // Strassen's 7 multiplications
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

// ==================== GREEDY ALGORITHMS ====================

// Fractional Knapsack
function fractionalKnapsack(weights, values, capacity) {
    let n = weights.length;
    let items = [];

    for (let i = 0; i < n; i++) {
        items.push({
            index: i,
            weight: weights[i],
            value: values[i],
            ratio: values[i] / weights[i]
        });
    }

    items.sort((a, b) => b.ratio - a.ratio);

    let steps = [];
    steps.push(`Capacity: ${capacity}`);
    steps.push(`Items sorted by value/weight ratio:`);

    let totalValue = 0;
    let totalWeight = 0;
    let result = [];

    for (let item of items) {
        steps.push(`Item ${item.index}: weight=${item.weight}, value=${item.value}, ratio=${item.ratio.toFixed(2)}`);

        if (totalWeight + item.weight <= capacity) {
            result.push({ ...item, fraction: 1 });
            totalWeight += item.weight;
            totalValue += item.value;
            steps.push(`  ✓ Add full item (${item.weight}kg, value ${item.value})`);
        } else if (totalWeight < capacity) {
            const remainingCapacity = capacity - totalWeight;
            const fraction = remainingCapacity / item.weight;
            result.push({ ...item, fraction });
            totalValue += item.value * fraction;
            totalWeight = capacity;
            steps.push(`  ✓ Add ${(fraction * 100).toFixed(2)}% of item (${remainingCapacity}kg, value ${(item.value * fraction).toFixed(2)})`);
            break;
        } else {
            steps.push(`  ✗ Cannot add item (capacity full)`);
        }
    }

    steps.push(`Total weight: ${totalWeight.toFixed(2)}, Total value: ${totalValue.toFixed(2)}`);

    return { result, totalValue, totalWeight, steps };
}

// Prim's Algorithm
function primsAlgorithm(adjMatrix) {
    let n = adjMatrix.length;
    let inMST = new Array(n).fill(false);
    let key = new Array(n).fill(Infinity);
    let parent = new Array(n).fill(-1);
    let mstEdges = [];
    let steps = [];

    key[0] = 0;
    steps.push(`Start from vertex 0`);

    for (let count = 0; count < n - 1; count++) {
        let u = -1;
        let minKey = Infinity;

        for (let v = 0; v < n; v++) {
            if (!inMST[v] && key[v] < minKey) {
                u = v;
                minKey = key[v];
            }
        }

        inMST[u] = true;
        steps.push(`Include vertex ${u} in MST, key=${key[u]}`);

        for (let v = 0; v < n; v++) {
            if (adjMatrix[u][v] !== 0 && !inMST[v] && adjMatrix[u][v] < key[v]) {
                parent[v] = u;
                key[v] = adjMatrix[u][v];
            }
        }
    }

    for (let i = 1; i < n; i++) {
        if (parent[i] !== -1) {
            mstEdges.push({
                u: parent[i],
                v: i,
                weight: adjMatrix[parent[i]][i]
            });
        }
    }

    let totalCost = mstEdges.reduce((sum, edge) => sum + edge.weight, 0);

    steps.push(`\nMST Edges:`);
    for (let edge of mstEdges) {
        steps.push(`(${edge.u}, ${edge.v}) - weight: ${edge.weight}`);
    }
    steps.push(`Total MST Cost: ${totalCost}`);

    return { mstEdges, totalCost, steps };
}

// Kruskal's Algorithm (Union-Find)
class UnionFind {
    constructor(n) {
        this.parent = Array(n).fill(0).map((_, i) => i);
        this.rank = Array(n).fill(0);
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x, y) {
        let px = this.find(x);
        let py = this.find(y);

        if (px === py) return false;

        if (this.rank[px] < this.rank[py]) {
            this.parent[px] = py;
        } else if (this.rank[px] > this.rank[py]) {
            this.parent[py] = px;
        } else {
            this.parent[py] = px;
            this.rank[px]++;
        }
        return true;
    }
}

function kruskalsAlgorithm(edges, numVertices) {
    let sortedEdges = edges.sort((a, b) => a.weight - b.weight);
    let uf = new UnionFind(numVertices);
    let mstEdges = [];
    let steps = [];

    steps.push(`Edges sorted by weight: ${sortedEdges.map(e => `(${e.u},${e.v},${e.weight})`).join(', ')}`);

    for (let edge of sortedEdges) {
        if (uf.union(edge.u, edge.v)) {
            mstEdges.push(edge);
            steps.push(`✓ Include edge (${edge.u}, ${edge.v}) - weight: ${edge.weight}`);
        } else {
            steps.push(`✗ Skip edge (${edge.u}, ${edge.v}) - would create cycle`);
        }

        if (mstEdges.length === numVertices - 1) break;
    }

    let totalCost = mstEdges.reduce((sum, edge) => sum + edge.weight, 0);
    steps.push(`Total MST Cost: ${totalCost}`);

    return { mstEdges, totalCost, steps };
}

// ==================== DYNAMIC PROGRAMMING ALGORITHMS ====================

// Longest Common Subsequence
function longestCommonSubsequence(str1, str2) {
    let m = str1.length;
    let n = str2.length;
    let dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    let steps = [];

    steps.push(`String 1: "${str1}", String 2: "${str2}"`);

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    let lcsLength = dp[m][n];
    let lcs = '';
    let i = m, j = n;

    while (i > 0 && j > 0) {
        if (str1[i - 1] === str2[j - 1]) {
            lcs = str1[i - 1] + lcs;
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }

    steps.push(`LCS Length: ${lcsLength}`);
    steps.push(`LCS: "${lcs}"`);

    return { lcs, length: lcsLength, steps };
}

// 0/1 Knapsack
function knapsack01(weights, values, capacity) {
    let n = weights.length;
    let dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));
    let steps = [];

    steps.push(`Capacity: ${capacity}`);
    steps.push(`Building DP table...`);

    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(
                    values[i - 1] + dp[i - 1][w - weights[i - 1]],
                    dp[i - 1][w]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    let maxValue = dp[n][capacity];
    steps.push(`Maximum value: ${maxValue}`);

    let selectedItems = [];
    let w = capacity;
    for (let i = n; i > 0 && w > 0; i--) {
        if (dp[i][w] !== dp[i - 1][w]) {
            selectedItems.push({
                item: i - 1,
                weight: weights[i - 1],
                value: values[i - 1]
            });
            w -= weights[i - 1];
        }
    }

    steps.push(`Selected items: ${selectedItems.map(item => `Item ${item.item}`).join(', ')}`);
    let totalWeight = selectedItems.reduce((sum, item) => sum + item.weight, 0);
    steps.push(`Total weight: ${totalWeight}`);

    return { maxValue, selectedItems, steps };
}

// Matrix Chain Multiplication
function matrixChainMultiplication(p) {
    let n = p.length - 1;
    let dp = Array(n).fill(null).map(() => Array(n).fill(0));
    let split = Array(n).fill(null).map(() => Array(n).fill(0));
    let steps = [];

    steps.push(`Matrices: ${p.slice(0, -1).map((val, i) => `M${i + 1}(${val}×${p[i + 1]})`).join(', ')}`);

    for (let len = 2; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            let j = i + len - 1;
            dp[i][j] = Infinity;

            for (let k = i; k < j; k++) {
                let cost = dp[i][k] + dp[k + 1][j] + p[i] * p[k + 1] * p[j + 1];

                if (cost < dp[i][j]) {
                    dp[i][j] = cost;
                    split[i][j] = k;
                }
            }
        }
    }

    steps.push(`Minimum scalar multiplications: ${dp[0][n - 1]}`);

    return {
        minMultiplications: dp[0][n - 1],
        steps,
        dpTable: dp
    };
}

// ==================== BACKTRACKING ALGORITHMS ====================

// Traveling Salesman Problem
function tsp(distMatrix) {
    let n = distMatrix.length;
    let visited = new Array(n).fill(false);
    let allPaths = [];
    let minCost = Infinity;
    let bestPath = [];

    function tspHelper(pos, cost, path, steps) {
        if (path.length === n) {
            let totalCost = cost + distMatrix[path[n - 1]][path[0]];
            steps.push(`Path ${path.join('→')}→0: cost = ${totalCost}`);

            if (totalCost < minCost) {
                minCost = totalCost;
                bestPath = [...path, 0];
            }
            return;
        }

        for (let i = 0; i < n; i++) {
            if (!visited[i]) {
                visited[i] = true;
                path.push(i);
                tspHelper(i, cost + distMatrix[pos][i], path, steps);
                path.pop();
                visited[i] = false;
            }
        }
    }

    let steps = [];
    visited[0] = true;
    tspHelper(0, 0, [0], steps);

    steps.push(`\nBest path: ${bestPath.join('→')} with total distance: ${minCost}`);

    return { bestPath, minCost, steps };
}

// N Queens Problem
function nQueens(n) {
    let solutions = [];
    let board = Array(n).fill(-1);
    let steps = [];

    function isSafe(row, col) {
        for (let i = 0; i < row; i++) {
            if (board[i] === col || Math.abs(board[i] - col) === Math.abs(i - row)) {
                return false;
            }
        }
        return true;
    }

    function solveNQueens(row) {
        if (row === n) {
            let solution = [];
            for (let i = 0; i < n; i++) {
                solution.push({ row: i, col: board[i] });
            }
            solutions.push(solution);
            steps.push(`Solution ${solutions.length}: ${board.join(',')}`);
            return;
        }

        for (let col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                board[row] = col;
                solveNQueens(row + 1);
                board[row] = -1;
            }
        }
    }

    steps.push(`Finding all ${n}-Queens solutions...`);
    solveNQueens(0);
    steps.push(`Total solutions found: ${solutions.length}`);

    return { solutions, numSolutions: solutions.length, steps };
}
