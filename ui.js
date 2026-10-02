// ==================== UI HANDLERS ====================

// Tab Navigation
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const category = this.getAttribute('data-category');

        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });

        // Remove active from all tab buttons
        document.querySelectorAll('.tab-btn').forEach(b => {
            b.classList.remove('active');
        });

        // Show selected tab
        document.getElementById(category).classList.add('active');
        this.classList.add('active');

        // Reset algorithm selector to first button
        const firstAlgoBtn = document.querySelector(`#${category} .algo-btn`);
        if (firstAlgoBtn) {
            selectAlgorithm(firstAlgoBtn);
        }
    });
});

// Algorithm Selection
function selectAlgorithm(btn) {
    const container = btn.closest('[class*="algo-selector"]');
    const algo = btn.getAttribute('data-algo');

    // Remove active from all buttons in this container
    container.querySelectorAll('.algo-btn').forEach(b => {
        b.classList.remove('active');
    });

    // Add active to clicked button
    btn.classList.add('active');

    // Hide all algorithm inputs in the current section
    const section = btn.closest('.tab-content');
    section.querySelectorAll('.algo-input').forEach(input => {
        input.classList.remove('active');
    });

    // Show selected algorithm input
    document.getElementById(algo).classList.add('active');

    // Clear previous output
    const outputBox = section.querySelector('.output-box');
    if (outputBox) {
        outputBox.innerHTML = '';
    }
}

// Attach click handlers to algo buttons
document.querySelectorAll('.algo-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        selectAlgorithm(this);
    });
});

// ==================== DIVIDE & CONQUER SOLVERS ====================

function solveHeapSort() {
    const input = document.getElementById('heapInput').value;
    const arr = parseArray(input);

    if (!arr) {
        showError('dc-output', 'Invalid input. Please enter numbers separated by commas.');
        return;
    }

    const { result, steps } = heapSort([...arr]);
    displaySortResult('dc-output', 'Heap Sort', 'heap-sort', arr, result, steps);
}

function solveMergeSort() {
    const input = document.getElementById('mergeInput').value;
    const arr = parseArray(input);

    if (!arr) {
        showError('dc-output', 'Invalid input. Please enter numbers separated by commas.');
        return;
    }

    const { result, steps } = mergeSort([...arr]);
    displaySortResult('dc-output', 'Merge Sort', 'merge-sort', arr, result, steps);
}

function solveQuickSort() {
    const input = document.getElementById('quickInput').value;
    const arr = parseArray(input);

    if (!arr) {
        showError('dc-output', 'Invalid input. Please enter numbers separated by commas.');
        return;
    }

    const { result, steps } = quickSort([...arr]);
    displaySortResult('dc-output', 'Quick Sort', 'quick-sort', arr, result, steps);
}

function solveBinarySearch() {
    const arrayInput = document.getElementById('binaryArray').value;
    const target = parseInt(document.getElementById('binaryTarget').value);

    const arr = parseArray(arrayInput);

    if (!arr || isNaN(target)) {
        showError('dc-output', 'Invalid input. Please enter a valid array and target number.');
        return;
    }

    const { found, index, steps } = binarySearch(arr, target);

    let html = `<h4>✅ Binary Search Result</h4>`;
    html += `<div class="output-item">`;
    if (found) {
        html += `<strong style="color: #86efac;">✓ Element found at index ${index}</strong>`;
    } else {
        html += `<strong style="color: #fca5a5;">✗ Element not found</strong>`;
    }
    html += `</div>`;
    html += displayComplexityBox('binary-search');
    html += `<h4>📝 Steps:</h4>`;
    steps.forEach(step => {
        html += `<div class="output-item"><code>${step}</code></div>`;
    });

    document.getElementById('dc-output').innerHTML = html;
}

function solveStrassen() {
    const matrixAInput = document.getElementById('matrixA').value;
    const matrixBInput = document.getElementById('matrixB').value;

    const arrA = parseArray(matrixAInput);
    const arrB = parseArray(matrixBInput);

    if (!arrA || !arrB || arrA.length !== 4 || arrB.length !== 4) {
        showError('dc-output', 'Invalid input. Please enter exactly 4 numbers for each 2x2 matrix.');
        return;
    }

    const matrixA = [[arrA[0], arrA[1]], [arrA[2], arrA[3]]];
    const matrixB = [[arrB[0], arrB[1]], [arrB[2], arrB[3]]];

    const { result, steps } = strassen2x2(matrixA, matrixB);

    let html = `<h4>✅ Strassen Matrix Multiplication</h4>`;
    html += `<div class="output-item"><strong>Input Matrix A:</strong><br>`;
    html += displayMatrix(matrixA);
    html += `</div>`;
    html += `<div class="output-item"><strong>Input Matrix B:</strong><br>`;
    html += displayMatrix(matrixB);
    html += `</div>`;
    html += displayComplexityBox('strassen');
    html += `<h4>📝 Steps:</h4>`;
    steps.forEach(step => {
        html += `<div class="output-item"><code>${step}</code></div>`;
    });
    html += `<div class="output-item"><strong>Result Matrix:</strong><br>`;
    html += displayMatrix(result);
    html += `</div>`;

    document.getElementById('dc-output').innerHTML = html;
}

// ==================== STRING MATCHING SOLVERS ====================

function solveNaive() {
    const text = document.getElementById('naiveText').value.trim();
    const pattern = document.getElementById('naivePattern').value.trim();

    if (!text || !pattern) {
        showError('sm-output', 'Invalid input. Please enter both text and pattern.');
        return;
    }

    if (pattern.length > text.length) {
        showError('sm-output', 'Pattern length cannot be greater than text length.');
        return;
    }

    const { matches, steps, comparisons } = naivePatternMatching(text, pattern);

    let html = `<h4>✅ Naive Pattern Matching Result</h4>`;
    html += `<div class="success">🔍 Matches Found: <strong>${matches.length}</strong></div>`;
    html += `<div class="output-item"><strong>Total Comparisons:</strong> ${comparisons}</div>`;

    if (matches.length > 0) {
        html += `<div class="output-item"><strong>Match Indices:</strong> `;
        matches.forEach((idx, i) => {
            html += `<code>${idx}</code>`;
            if (i < matches.length - 1) html += `, `;
        });
        html += `</div>`;
    }

    html += displayComplexityBox('naive');
    html += `<h4>📝 Steps:</h4>`;
    steps.forEach(step => {
        if (step.startsWith('---')) {
            html += `<div class="output-item" style="color: #9fa8da; font-weight: bold;"><code>${step}</code></div>`;
        } else {
            html += `<div class="output-item"><code>${step}</code></div>`;
        }
    });

    document.getElementById('sm-output').innerHTML = html;
}

function solveRabinKarp() {
    const text = document.getElementById('rbText').value.trim();
    const pattern = document.getElementById('rbPattern').value.trim();

    if (!text || !pattern) {
        showError('sm-output', 'Invalid input. Please enter both text and pattern.');
        return;
    }

    if (pattern.length > text.length) {
        showError('sm-output', 'Pattern length cannot be greater than text length.');
        return;
    }

    const { matches, steps } = rabinKarpAlgorithm(text, pattern);

    let html = `<h4>✅ Rabin-Karp Algorithm Result</h4>`;
    html += `<div class="success">🔍 Matches Found: <strong>${matches.length}</strong></div>`;

    if (matches.length > 0) {
        html += `<div class="output-item"><strong>Match Indices:</strong> `;
        matches.forEach((idx, i) => {
            html += `<code>${idx}</code>`;
            if (i < matches.length - 1) html += `, `;
        });
        html += `</div>`;
    }

    html += displayComplexityBox('rabin-karp');
    html += `<h4>📝 Steps:</h4>`;
    steps.forEach(step => {
        if (step.startsWith('---')) {
            html += `<div class="output-item" style="color: #9fa8da; font-weight: bold;"><code>${step}</code></div>`;
        } else {
            html += `<div class="output-item"><code>${step}</code></div>`;
        }
    });

    document.getElementById('sm-output').innerHTML = html;
}

function solveKMP() {
    const text = document.getElementById('kmpText').value.trim();
    const pattern = document.getElementById('kmpPattern').value.trim();

    if (!text || !pattern) {
        showError('sm-output', 'Invalid input. Please enter both text and pattern.');
        return;
    }

    const { matches, steps } = kmpAlgorithm(text, pattern);

    let html = `<h4>✅ KMP (Knuth-Morris-Pratt) Algorithm Result</h4>`;
    html += `<div class="success">🔍 Matches Found: <strong>${matches.length}</strong></div>`;

    if (matches.length > 0) {
        html += `<div class="output-item"><strong>Match Indices:</strong> `;
        matches.forEach((idx, i) => {
            html += `<code>${idx}</code>`;
            if (i < matches.length - 1) html += `, `;
        });
        html += `</div>`;
    }

    html += displayComplexityBox('kmp');
    html += `<h4>📝 Steps:</h4>`;
    steps.forEach(step => {
        html += `<div class="output-item"><code>${step}</code></div>`;
    });

    document.getElementById('sm-output').innerHTML = html;
}

function solveBoyerMoore() {
    const text = document.getElementById('bmText').value.trim();
    const pattern = document.getElementById('bmPattern').value.trim();

    if (!text || !pattern) {
        showError('sm-output', 'Invalid input. Please enter both text and pattern.');
        return;
    }

    const { matches, steps } = boyerMooreAlgorithm(text, pattern);

    let html = `<h4>✅ Boyer-Moore Algorithm Result</h4>`;
    html += `<div class="success">🔍 Matches Found: <strong>${matches.length}</strong></div>`;

    if (matches.length > 0) {
        html += `<div class="output-item"><strong>Match Indices:</strong> `;
        matches.forEach((idx, i) => {
            html += `<code>${idx}</code>`;
            if (i < matches.length - 1) html += `, `;
        });
        html += `</div>`;
    }

    html += displayComplexityBox('boyer-moore');
    html += `<h4>📝 Steps:</h4>`;
    steps.forEach(step => {
        html += `<div class="output-item"><code>${step}</code></div>`;
    });

    document.getElementById('sm-output').innerHTML = html;
}

// ==================== GREEDY SOLVERS ====================

function solveFractionalKnapsack() {
    const capacityStr = document.getElementById('knapsackCapacity').value;
    const weightsStr = document.getElementById('knapsackWeights').value;
    const valuesStr = document.getElementById('knapsackValues').value;

    const capacity = parseInt(capacityStr);
    const weights = parseArray(weightsStr);
    const values = parseArray(valuesStr);

    if (!weights || !values || weights.length !== values.length || isNaN(capacity)) {
        showError('greedy-output', 'Invalid input. Ensure weights and values have same count.');
        return;
    }

    const { result, totalValue, totalWeight, steps } = fractionalKnapsack(weights, values, capacity);

    let html = `<h4>✅ Fractional Knapsack Problem</h4>`;
    html += `<div class="success">💰 Maximum Value: <strong>${totalValue.toFixed(2)}</strong></div>`;
    html += displayComplexityBox('fractional-knapsack');
    html += `<h4>📝 Steps:</h4>`;
    steps.forEach(step => {
        html += `<div class="output-item"><code>${step}</code></div>`;
    });

    document.getElementById('greedy-output').innerHTML = html;
}

function setHuffmanMode(mode) {
    document.getElementById('huffmanInputMode').value = mode;
    const textGroup = document.getElementById('huffmanTextGroup');
    const freqGroup = document.getElementById('huffmanFreqGroup');
    const btnText = document.getElementById('btnModeText');
    const btnFreq = document.getElementById('btnModeFreq');

    if (mode === 'text') {
        textGroup.style.display = 'block';
        freqGroup.style.display = 'none';
        btnText.classList.add('active');
        btnFreq.classList.remove('active');
    } else {
        textGroup.style.display = 'none';
        freqGroup.style.display = 'block';
        btnFreq.classList.add('active');
        btnText.classList.remove('active');
    }
}

function solveHuffmanCoding() {
    const mode = document.getElementById('huffmanInputMode').value;
    let result;

    if (mode === 'text') {
        const text = document.getElementById('huffmanTextInput').value;
        if (!text || text.trim().length === 0) {
            showError('greedy-output', 'Please enter a valid text string to encode.');
            return;
        }
        result = huffmanCoding(text, false);
    } else {
        const freqInput = document.getElementById('huffmanFreqInput').value.trim();
        if (!freqInput) {
            showError('greedy-output', 'Please enter characters and frequencies (e.g., A:5, B:9, C:12).');
            return;
        }

        const pairs = freqInput.split(',').map(s => s.trim()).filter(s => s.length > 0);
        let items = [];
        for (let pair of pairs) {
            const parts = pair.split(':');
            if (parts.length !== 2) {
                showError('greedy-output', `Invalid format in item "${pair}". Use "Character:Frequency" format (e.g. A:5).`);
                return;
            }
            const char = parts[0].trim();
            const freq = parseFloat(parts[1].trim());
            if (!char || isNaN(freq) || freq <= 0) {
                showError('greedy-output', `Invalid frequency for character "${char}". Must be a positive number.`);
                return;
            }
            items.push({ char, freq });
        }
        if (items.length === 0) {
            showError('greedy-output', 'No valid character-frequency pairs found.');
            return;
        }
        result = huffmanCoding(items, true);
    }

    if (result.error) {
        showError('greedy-output', result.error);
        return;
    }

    const { codes, freqMap, totalChars, originalBits, encodedBits, compressionRatio, avgCodeLength, encodedString, decodedString, treeRepresentation, steps } = result;

    let html = `<h4>✅ Huffman Coding Result (Greedy)</h4>`;

    // Summary Metrics
    html += `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 12px; margin-bottom: 20px;">
            <div class="output-item" style="margin-bottom: 0;">
                <span style="color: #bbb; font-size: 0.85em; display: block;">Total Chars / Freq</span>
                <strong style="font-size: 1.3em;">${totalChars}</strong>
            </div>
            <div class="output-item" style="margin-bottom: 0;">
                <span style="color: #bbb; font-size: 0.85em; display: block;">Original Size (8-bit)</span>
                <strong style="font-size: 1.3em;">${originalBits} bits</strong>
            </div>
            <div class="output-item" style="margin-bottom: 0;">
                <span style="color: #bbb; font-size: 0.85em; display: block;">Huffman Size</span>
                <strong style="font-size: 1.3em; color: #86efac;">${encodedBits} bits</strong>
            </div>
            <div class="output-item" style="margin-bottom: 0;">
                <span style="color: #bbb; font-size: 0.85em; display: block;">Space Saved</span>
                <strong style="font-size: 1.3em; color: #00FF88;">${compressionRatio}%</strong>
            </div>
            <div class="output-item" style="margin-bottom: 0;">
                <span style="color: #bbb; font-size: 0.85em; display: block;">Avg Code Length</span>
                <strong style="font-size: 1.3em; color: #BB86FC;">${avgCodeLength} bits/char</strong>
            </div>
        </div>
    `;

    // Huffman Codes Table
    html += `<div class="output-item" style="overflow-x: auto;">`;
    html += `<strong>📋 Huffman Code Table:</strong>`;
    html += `
        <table class="result-table" style="margin-top: 10px;">
            <thead>
                <tr>
                    <th>Character</th>
                    <th>Frequency</th>
                    <th>Probability</th>
                    <th>Huffman Code</th>
                    <th>Length</th>
                    <th>Total Bits</th>
                </tr>
            </thead>
            <tbody>
    `;

    Object.keys(codes).forEach(char => {
        const freq = freqMap[char] || 0;
        const prob = ((freq / totalChars) * 100).toFixed(1) + '%';
        const code = codes[char];
        const len = code.length;
        const total = freq * len;
        const displayChar = char === ' ' ? '␣ (space)' : char;

        html += `
            <tr>
                <td><code>'${displayChar}'</code></td>
                <td>${freq}</td>
                <td>${prob}</td>
                <td><code style="color: #86efac; font-size: 1.05em;">${code}</code></td>
                <td>${len} bit${len > 1 ? 's' : ''}</td>
                <td>${total} bits</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;
    html += `</div>`;

    // Encoded Bitstream & Decoded check (if text mode)
    if (encodedString) {
        html += `<div class="output-item">`;
        html += `<strong>🔒 Encoded Bitstream:</strong><br>`;
        html += `<div style="word-break: break-all; margin-top: 6px; font-family: monospace; background: rgba(0,0,0,0.4); padding: 10px; border-radius: 8px; color: #00FF88;">${encodedString}</div>`;
        html += `</div>`;

        html += `<div class="output-item">`;
        html += `<strong>🔓 Decoded Verification (Lossless Check):</strong><br>`;
        html += `<div style="margin-top: 6px; font-family: monospace; background: rgba(0,0,0,0.4); padding: 10px; border-radius: 8px; color: #00FFFF;">${decodedString}</div>`;
        html += `</div>`;
    }

    // ASCII Tree
    if (treeRepresentation) {
        html += `<div class="output-item">`;
        html += `<strong>🌲 Huffman Tree Structure (0: Left, 1: Right):</strong>`;
        html += `<pre style="font-family: 'Courier New', monospace; font-size: 0.95em; color: #e9d5ff; background: rgba(0,0,0,0.45); padding: 12px; border-radius: 8px; margin-top: 8px; overflow-x: auto; line-height: 1.4;">${treeRepresentation}</pre>`;
        html += `</div>`;
    }

    // Complexity Box
    html += displayComplexityBox('huffman-coding');

    // Steps
    html += `<h4>📝 Step-by-Step Priority Queue & Tree Construction:</h4>`;
    steps.forEach(step => {
        if (step.startsWith('📊') || step.startsWith('🌲') || step.startsWith('🔑')) {
            html += `<div class="output-item" style="color: #BB86FC; font-weight: bold; margin-top: 10px;">${step}</div>`;
        } else {
            html += `<div class="output-item"><code>${step}</code></div>`;
        }
    });

    document.getElementById('greedy-output').innerHTML = html;
}

function solvePrims() {
    const verticesStr = document.getElementById('primsVertices').value;
    const matrixStr = document.getElementById('primsMatrix').value;

    const n = parseInt(verticesStr);
    const lines = matrixStr.trim().split('\n');

    if (lines.length !== n) {
        showError('greedy-output', `Invalid input. Matrix should have ${n} rows.`);
        return;
    }

    let adjMatrix = [];
    for (let line of lines) {
        const row = line.trim().split(/\s+/).map(Number);
        if (row.length !== n) {
            showError('greedy-output', `Invalid input. Each row should have ${n} numbers.`);
            return;
        }
        adjMatrix.push(row);
    }

    const { mstEdges, totalCost, steps } = primsAlgorithm(adjMatrix);

    let html = `<h4>✅ Prim's Algorithm - Minimum Spanning Tree</h4>`;
    html += `<div class="success">🌳 Total MST Cost: <strong>${totalCost}</strong></div>`;
    html += `<div class="output-item"><strong>MST Edges:</strong><br>`;
    mstEdges.forEach(edge => {
        html += `<code>V${edge.u} - V${edge.v} (weight: ${edge.weight})</code><br>`;
    });
    html += `</div>`;
    html += displayComplexityBox('prims');
    html += `<h4>📝 Steps:</h4>`;
    steps.forEach(step => {
        html += `<div class="output-item"><code>${step}</code></div>`;
    });

    document.getElementById('greedy-output').innerHTML = html;
}

function solveKruskal() {
    const edgesStr = document.getElementById('kruskalEdgeList').value;
    const lines = edgesStr.trim().split('\n');

    let edges = [];
    let numVertices = 0;

    for (let line of lines) {
        const parts = line.trim().split(',').map(Number);
        if (parts.length !== 3) {
            showError('greedy-output', 'Invalid format. Each edge should be: u,v,weight');
            return;
        }
        edges.push({ u: parts[0], v: parts[1], weight: parts[2] });
        numVertices = Math.max(numVertices, parts[0], parts[1]);
    }

    numVertices++;

    const { mstEdges, totalCost, steps } = kruskalsAlgorithm(edges, numVertices);

    let html = `<h4>✅ Kruskal's Algorithm - Minimum Spanning Tree</h4>`;
    html += `<div class="success">🌳 Total MST Cost: <strong>${totalCost}</strong></div>`;
    html += `<div class="output-item"><strong>MST Edges:</strong><br>`;
    mstEdges.forEach(edge => {
        html += `<code>V${edge.u} - V${edge.v} (weight: ${edge.weight})</code><br>`;
    });
    html += `</div>`;
    html += displayComplexityBox('kruskal');
    html += `<h4>📝 Steps:</h4>`;
    steps.forEach(step => {
        html += `<div class="output-item"><code>${step}</code></div>`;
    });

    document.getElementById('greedy-output').innerHTML = html;
}

function solveDijkstra() {
    const vertices = parseInt(document.getElementById('dijkstraVertices').value);
    const matrixStr = document.getElementById('dijkstraMatrix').value;
    const start = parseInt(document.getElementById('dijkstraStart').value);
    const graph = parseMatrix(matrixStr, vertices);

    if (!graph) {
        showError('greedy-output', 'Invalid matrix input.');
        return;
    }

    const { distances, steps } = dijkstra(graph, start);
    displayResult('greedy-output', 'Dijkstra\'s Algorithm', 'dijkstra', `Shortest paths from vertex ${start}: ${distances.join(', ')}`, steps);
}

// ==================== DYNAMIC PROGRAMMING SOLVERS ====================

function solveLCS() {
    const str1 = document.getElementById('lcsStr1').value.trim();
    const str2 = document.getElementById('lcsStr2').value.trim();

    if (!str1 || !str2) {
        showError('dynamic-output', 'Invalid input. Please enter both strings.');
        return;
    }

    const { lcs, length, steps } = longestCommonSubsequence(str1, str2);

    let html = `<h4>✅ Longest Common Subsequence</h4>`;
    html += `<div class="success">LCS Length: <strong>${length}</strong></div>`;
    html += `<div class="output-item"><strong>LCS:</strong> <code>${lcs}</code></div>`;
    html += displayComplexityBox('lcs');
    html += `<h4>📝 Steps:</h4>`;
    steps.forEach(step => {
        html += `<div class="output-item"><code>${step}</code></div>`;
    });

    document.getElementById('dynamic-output').innerHTML = html;
}

function solveKnapsack01() {
    const capacityStr = document.getElementById('knapsack01Capacity').value;
    const weightsStr = document.getElementById('knapsack01Weights').value;
    const valuesStr = document.getElementById('knapsack01Values').value;

    const capacity = parseInt(capacityStr);
    const weights = parseArray(weightsStr);
    const values = parseArray(valuesStr);

    if (!weights || !values || weights.length !== values.length) {
        showError('dynamic-output', 'Invalid input. Weights and values must have same count.');
        return;
    }

    const { maxValue, selectedItems, steps } = knapsack01(weights, values, capacity);

    let html = `<h4>✅ 0/1 Knapsack Problem</h4>`;
    html += `<div class="success">💰 Maximum Value: <strong>${maxValue}</strong></div>`;
    html += `<div class="output-item"><strong>Selected Items:</strong><br>`;
    selectedItems.forEach(item => {
        html += `<code>Item ${item.item}: weight=${item.weight}, value=${item.value}</code><br>`;
    });
    html += `</div>`;
    html += displayComplexityBox('knapsack-01');
    html += `<h4>📝 Steps:</h4>`;
    steps.forEach(step => {
        html += `<div class="output-item"><code>${step}</code></div>`;
    });

    document.getElementById('dynamic-output').innerHTML = html;
}

function solveChainMultiplication() {
    const dimensionsStr = document.getElementById('chainDimensions').value;
    const dimensions = parseArray(dimensionsStr);

    if (!dimensions || dimensions.length < 2) {
        showError('dynamic-output', 'Invalid input. Enter at least 2 matrix dimensions.');
        return;
    }

    const { minMultiplications, steps } = matrixChainMultiplication(dimensions);

    let html = `<h4>✅ Matrix Chain Multiplication</h4>`;
    html += `<div class="success">🔢 Minimum Scalar Multiplications: <strong>${minMultiplications}</strong></div>`;
    html += displayComplexityBox('chain-mult');
    html += `<h4>📝 Steps:</h4>`;
    steps.forEach(step => {
        html += `<div class="output-item"><code>${step}</code></div>`;
    });

    document.getElementById('dynamic-output').innerHTML = html;
}

function solveBellmanFord() {
    const vertices = parseInt(document.getElementById('bellmanFordVertices').value);
    const edgesStr = document.getElementById('bellmanFordEdges').value;
    const start = parseInt(document.getElementById('bellmanFordStart').value);
    const edges = parseEdges(edgesStr);

    if (!edges) {
        showError('dynamic-output', 'Invalid edges input.');
        return;
    }

    const { distances, steps, error } = bellmanFord(vertices, edges, start);
    if (error) {
        showError('dynamic-output', error);
    } else {
        displayResult('dynamic-output', 'Bellman-Ford Algorithm', 'bellman-ford', `Shortest paths from vertex ${start}: ${distances.join(', ')}`, steps);
    }
}

function solveFloydWarshall() {
    const vertices = parseInt(document.getElementById('floydWarshallVertices').value);
    const matrixStr = document.getElementById('floydWarshallMatrix').value;
    const graph = parseMatrix(matrixStr, vertices);

    if (!graph) {
        showError('dynamic-output', 'Invalid matrix input.');
        return;
    }

    const { distances, steps } = floydWarshall(graph);
    const resultText = distances.map(row => row.join('\t')).join('\n');
    displayResult('dynamic-output', 'Floyd-Warshall Algorithm', 'floyd-warshall', `All-pairs shortest paths:\n${resultText}`, steps);
}

// ==================== BACKTRACKING SOLVERS ====================

function solveNQueens() {
    const n = parseInt(document.getElementById('nQueensN').value);
    if (isNaN(n) || n < 1) {
        showError('backtracking-output', 'Invalid input. Please enter a valid N.');
        return;
    }

    const { solutions, numSolutions, steps } = nQueens(n);

    let html = `<h4>✅ N-Queens Problem</h4>`;
    html += `<div class="success">Total solutions: <strong>${numSolutions}</strong></div>`;
    html += displayComplexityBox('n-queens');
    html += `<h4>📝 Steps:</h4>`;
    steps.forEach(step => {
        html += `<div class="output-item"><code>${step}</code></div>`;
    });

    document.getElementById('backtracking-output').innerHTML = html;
}

function solveSumOfSubsets() {
    const setStr = document.getElementById('sumOfSubsets').value;
    const target = parseInt(document.getElementById('sumOfSubsetsTarget').value);
    const set = parseArray(setStr);

    if (!set || isNaN(target)) {
        showError('backtracking-output', 'Invalid input. Enter a valid set and target sum.');
        return;
    }

    const { results, steps } = sumOfSubsets(set, target);
    const summary = results.length
        ? `Found ${results.length} subset(s) for target ${target}.`
        : `No subset sums to ${target}.`;
    const resultText = results.length
        ? `${summary} Solutions: ${results.map(r => `[${r.join(', ')}]`).join('; ')}`
        : summary;

    displayResult('backtracking-output', 'Sum of Subsets', 'sum-of-subsets', resultText, steps);
}

function solveGraphColoring() {
    const vertices = parseInt(document.getElementById('graphColoringVertices').value);
    const colors = parseInt(document.getElementById('graphColoringColors').value);
    const matrixStr = document.getElementById('graphColoringMatrix').value;
    const graph = parseMatrix(matrixStr, vertices);

    if (!graph || isNaN(colors)) {
        showError('backtracking-output', 'Invalid input. Provide a valid matrix and number of colors.');
        return;
    }

    const { colors: assignment, possible, steps } = graphColoring(graph, colors);
    if (!possible) {
        showError('backtracking-output', `No solution with ${colors} colors.`);
        return;
    }

    const resultText = `Color assignment: ${assignment.map((c, i) => `V${i}=${c}`).join(', ')}`;
    displayResult('backtracking-output', 'Graph Coloring', 'graph-coloring', resultText, steps);
}

function solveHamiltonianCycle() {
    const vertices = parseInt(document.getElementById('hamiltonianCycleVertices').value);
    const matrixStr = document.getElementById('hamiltonianCycleMatrix').value;
    const graph = parseMatrix(matrixStr, vertices);

    if (!graph) {
        showError('backtracking-output', 'Invalid input. Provide a valid adjacency matrix.');
        return;
    }

    const { path, found, steps } = hamiltonianCycle(graph);
    if (!found) {
        showError('backtracking-output', 'No Hamiltonian cycle exists for this graph.');
        return;
    }

    const resultText = `Cycle: ${path.join(' -> ')}`;
    displayResult('backtracking-output', 'Hamiltonian Cycle', 'hamiltonian-cycle', resultText, steps);
}

function solveTspBacktracking() {
    const cities = parseInt(document.getElementById('tspBacktrackingCities').value);
    const matrixStr = document.getElementById('tspBacktrackingMatrix').value;
    const graph = parseMatrix(matrixStr, cities);

    if (!graph) {
        showError('backtracking-output', 'Invalid matrix input.');
        return;
    }

    const { minCost, steps } = tspBacktracking(graph);
    displayResult('backtracking-output', 'Travelling Salesman (Backtracking)', 'tsp-backtracking', `Minimum cost: ${minCost}`, steps);
}

// ==================== BRANCH & BOUND SOLVERS ====================

function solveTspBranchBound() {
    const cities = parseInt(document.getElementById('tspBranchBoundCities').value);
    const matrixStr = document.getElementById('tspBranchBoundMatrix').value;
    const graph = parseMatrix(matrixStr, cities);

    if (!graph) {
        showError('branch-bound-output', 'Invalid matrix input.');
        return;
    }

    const { minCost, path, steps } = tspBranchAndBound(graph);
    displayResult('branch-bound-output', 'Travelling Salesman (Branch & Bound)', 'tsp-branch-bound', `Minimum cost: ${minCost}, Path: ${path.join(' -> ')}`, steps);
}

function solveFordFulkerson() {
    const vertices = parseInt(document.getElementById('fordFulkersonVertices').value);
    const matrixStr = document.getElementById('fordFulkersonMatrix').value;
    const source = parseInt(document.getElementById('fordFulkersonSource').value);
    const sink = parseInt(document.getElementById('fordFulkersonSink').value);
    const graph = parseMatrix(matrixStr, vertices);

    if (!graph) {
        showError('branch-bound-output', 'Invalid matrix input.');
        return;
    }

    const { maxFlow, steps } = fordFulkerson(graph, source, sink);
    displayResult('branch-bound-output', 'Ford-Fulkerson Algorithm', 'ford-fulkerson', `Maximum Flow: ${maxFlow}`, steps);
}

// ==================== UTILITY FUNCTIONS ====================

function parseArray(input) {
    try {
        return input.split(',').map(Number);
    } catch (e) {
        return null;
    }
}

function parseEdges(edgeStr) {
    try {
        if (!edgeStr.trim()) return null;
        return edgeStr.trim().split('\n').map(line => line.split(/[,\s]+/).map(Number));
    } catch (e) {
        return null;
    }
}

function parseMatrix(matrixStr, n) {
    try {
        const lines = matrixStr.trim().split('\n');
        if (lines.length !== n) return null;
        let matrix = [];
        for (let line of lines) {
            const row = line.trim().split(/\s+/).map(val => {
                if (val.toLowerCase() === 'infinity') return Infinity;
                return Number(val);
            });
            if (row.length !== n) return null;
            matrix.push(row);
        }
        return matrix;
    } catch (e) {
        return null;
    }
}

function displayMatrix(matrix) {
    let html = '<table class="matrix">';
    matrix.forEach(row => {
        html += '<tr>';
        row.forEach(cell => {
            html += `<td>${cell}</td>`;
        });
        html += '</tr>';
    });
    html += '</table>';
    return html;
}

function showError(outputId, message) {
    const outputBox = document.getElementById(outputId);
    outputBox.innerHTML = `<div class="error"><strong>Error:</strong> ${message}</div>`;
}

function displayResult(outputId, title, algoKey, resultText, steps) {
    let html = `<h4>✅ ${title}</h4>`;
    html += `<div class="success">${resultText}</div>`;
    html += displayComplexityBox(algoKey);
    html += `<h4>📝 Steps:</h4>`;
    steps.forEach(step => {
        html += `<div class="output-item"><code>${step}</code></div>`;
    });
    document.getElementById(outputId).innerHTML = html;
}

function displaySortResult(outputId, title, algoKey, original, sorted, steps) {
    let html = `<h4>✅ ${title} Result</h4>`;
    html += `<div class="output-item"><strong>Original Array:</strong> <code>[${original.join(', ')}]</code></div>`;
    html += `<div class="success"><strong>Sorted Array:</strong> <code>[${sorted.join(', ')}]</code></div>`;
    html += displayComplexityBox(algoKey);
    html += `<h4>📝 Steps:</h4>`;
    steps.forEach(step => {
        html += `<div class="output-item"><code>${step}</code></div>`;
    });
    document.getElementById(outputId).innerHTML = html;
}

function displayComplexityBox(algoKey) {
    const complexity = ALGORITHM_COMPLEXITY[algoKey];
    if (!complexity) return '';

    return `
        <div class="complexity-box">
            <strong>Time Complexity (Worst Case):</strong> <code>${complexity.worst}</code>
        </div>
    `;
}
