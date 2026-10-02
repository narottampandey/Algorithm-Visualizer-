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

// Bellman-Ford Algorithm
function bellmanFord(vertices, edges, start) {
    let dist = Array(vertices).fill(Infinity);
    dist[start] = 0;
    let steps = [];

    steps.push(`Initializing distances: ${dist.join(', ')}`);

    for (let i = 0; i < vertices - 1; i++) {
        edges.forEach(([u, v, weight]) => {
            if (dist[u] !== Infinity && dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                steps.push(`Relaxing edge ${u}-${v}: dist[${v}] = ${dist[v]}`);
            }
        });
    }

    // Check for negative cycles
    for (let [u, v, weight] of edges) {
        if (dist[u] !== Infinity && dist[u] + weight < dist[v]) {
            steps.push("Graph contains a negative weight cycle");
            return { distances: dist, steps, error: "Graph contains a negative weight cycle" };
        }
    }

    steps.push(`Final distances: ${dist.join(', ')}`);
    return { distances: dist, steps };
}

// Floyd-Warshall Algorithm
function floydWarshall(graph) {
    let dist = graph.map(row => [...row]);
    let n = graph.length;
    let steps = [];

    steps.push("Initializing distance matrix.");

    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                    steps.push(`Found shorter path from ${i} to ${j} via ${k}: ${dist[i][j]}`);
                }
            }
        }
    }

    steps.push("Final distance matrix computed.");
    return { distances: dist, steps };
}
