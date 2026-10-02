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

// Huffman Coding (Greedy Algorithm)
class HuffmanNode {
    constructor(char, freq, left = null, right = null) {
        this.char = char;
        this.freq = freq;
        this.left = left;
        this.right = right;
    }
}

function huffmanCoding(inputData, isFrequencyMap = false) {
    let freqMap = {};
    let rawText = '';
    let steps = [];

    if (isFrequencyMap) {
        for (let item of inputData) {
            if (item.char !== undefined && item.freq !== undefined) {
                freqMap[item.char] = (freqMap[item.char] || 0) + item.freq;
            }
        }
    } else {
        rawText = String(inputData);
        for (let char of rawText) {
            freqMap[char] = (freqMap[char] || 0) + 1;
        }
    }

    let uniqueChars = Object.keys(freqMap);
    if (uniqueChars.length === 0) {
        return { error: 'Input cannot be empty. Please provide valid text or character frequencies.' };
    }

    let totalFreq = Object.values(freqMap).reduce((sum, f) => sum + f, 0);

    steps.push(`📊 Frequency Analysis:`);
    uniqueChars.forEach(c => {
        const displayChar = c === ' ' ? '␣ (space)' : c;
        steps.push(`  • '${displayChar}': Frequency = ${freqMap[c]} (${((freqMap[c] / totalFreq) * 100).toFixed(1)}%)`);
    });

    // Special case: Only 1 unique character
    if (uniqueChars.length === 1) {
        let char = uniqueChars[0];
        let codes = {};
        codes[char] = '0';
        let encodedStr = rawText ? '0'.repeat(rawText.length) : '0'.repeat(totalFreq);
        steps.push(`Single unique character detected. Assigned code '0'.`);
        return {
            codes,
            freqMap,
            totalChars: totalFreq,
            originalBits: totalFreq * 8,
            encodedBits: totalFreq * 1,
            compressionRatio: ((1 - (totalFreq * 1) / (totalFreq * 8)) * 100).toFixed(2),
            avgCodeLength: '1.00',
            encodedString: encodedStr,
            decodedString: rawText || char.repeat(totalFreq),
            treeRepresentation: `(${char === ' ' ? '␣' : char}:${totalFreq})`,
            steps
        };
    }

    // Initialize Priority Queue with leaf nodes
    let pq = uniqueChars.map(c => new HuffmanNode(c, freqMap[c]));
    pq.sort((a, b) => a.freq - b.freq);

    steps.push(`\n🌲 Priority Queue Initialization:`);
    steps.push(`Initial queue: [ ${pq.map(n => `'${n.char === ' ' ? '␣' : n.char}':${n.freq}`).join(', ')} ]`);

    let stepCount = 1;
    while (pq.length > 1) {
        // Extract 2 lowest frequency nodes
        let left = pq.shift();
        let right = pq.shift();

        let mergedFreq = left.freq + right.freq;
        let leftLabel = left.char !== null ? `'${left.char === ' ' ? '␣' : left.char}'` : `(sub ${left.freq})`;
        let rightLabel = right.char !== null ? `'${right.char === ' ' ? '␣' : right.char}'` : `(sub ${right.freq})`;

        let parentNode = new HuffmanNode(null, mergedFreq, left, right);

        // Insert back maintaining sorted order
        let inserted = false;
        for (let i = 0; i < pq.length; i++) {
            if (pq[i].freq > parentNode.freq) {
                pq.splice(i, 0, parentNode);
                inserted = true;
                break;
            }
        }
        if (!inserted) {
            pq.push(parentNode);
        }

        steps.push(`Step ${stepCount}: Merged ${leftLabel} (${left.freq}) + ${rightLabel} (${right.freq}) ➔ Internal Node (${mergedFreq})`);
        steps.push(`   Current Queue: [ ${pq.map(n => (n.char !== null ? `'${n.char === ' ' ? '␣' : n.char}':${n.freq}` : `Node(${n.freq})`)).join(', ')} ]`);
        stepCount++;
    }

    let root = pq[0];
    let codes = {};

    function generateCodes(node, currentCode) {
        if (!node) return;
        if (node.char !== null) {
            codes[node.char] = currentCode || '0';
            return;
        }
        generateCodes(node.left, currentCode + '0');
        generateCodes(node.right, currentCode + '1');
    }

    generateCodes(root, '');

    steps.push(`\n🔑 Generated Huffman Codes (Prefix-free):`);
    for (let char of uniqueChars) {
        const displayChar = char === ' ' ? '␣ (space)' : char;
        steps.push(`  • '${displayChar}' ➔ ${codes[char]} (length: ${codes[char].length} bits)`);
    }

    // Calculations
    let encodedBits = 0;
    for (let char of uniqueChars) {
        encodedBits += freqMap[char] * codes[char].length;
    }
    let originalBits = totalFreq * 8; // standard ASCII 8 bits/char
    let compressionRatio = ((1 - (encodedBits / originalBits)) * 100).toFixed(2);
    let avgCodeLength = (encodedBits / totalFreq).toFixed(2);

    let encodedString = '';
    let decodedString = '';
    if (rawText) {
        for (let c of rawText) {
            encodedString += codes[c];
        }
        // Decode to verify lossless reconstruction
        let curr = root;
        for (let bit of encodedString) {
            curr = bit === '0' ? curr.left : curr.right;
            if (curr && curr.char !== null) {
                decodedString += curr.char;
                curr = root;
            }
        }
    }

    // ASCII Tree representation
    function buildTreeAscii(node, prefix = '', isLeft = true) {
        if (!node) return '';
        let result = '';
        let nodeLabel = node.char !== null ? `'${node.char === ' ' ? '␣' : node.char}' (${node.freq})` : `[${node.freq}]`;
        result += prefix + (isLeft ? '├── (0) ' : '└── (1) ') + nodeLabel + '\n';
        if (node.left || node.right) {
            if (node.left) result += buildTreeAscii(node.left, prefix + (isLeft ? '│   ' : '    '), true);
            if (node.right) result += buildTreeAscii(node.right, prefix + (isLeft ? '│   ' : '    '), false);
        }
        return result;
    }

    let treeRepresentation = root.char !== null 
        ? `'${root.char}': ${root.freq}` 
        : `Root [${root.freq}]\n` + (root.left ? buildTreeAscii(root.left, '', true) : '') + (root.right ? buildTreeAscii(root.right, '', false) : '');

    return {
        codes,
        freqMap,
        totalChars: totalFreq,
        originalBits,
        encodedBits,
        compressionRatio,
        avgCodeLength,
        encodedString,
        decodedString,
        treeRepresentation,
        steps
    };
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

// Dijkstra's Algorithm
function dijkstra(graph, start) {
    let n = graph.length;
    let dist = Array(n).fill(Infinity);
    let visited = Array(n).fill(false);
    dist[start] = 0;
    let steps = [];

    steps.push(`Start from vertex ${start}`);

    for (let i = 0; i < n - 1; i++) {
        let u = -1;
        for (let j = 0; j < n; j++) {
            if (!visited[j] && (u === -1 || dist[j] < dist[u])) {
                u = j;
            }
        }

        if (dist[u] === Infinity) break;

        visited[u] = true;
        steps.push(`Visiting vertex ${u}, current distance: ${dist[u]}`);

        for (let v = 0; v < n; v++) {
            if (graph[u][v] > 0 && !visited[v] && dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
                steps.push(`  Updating distance to vertex ${v}: ${dist[v]}`);
            }
        }
    }

    steps.push(`Final shortest distances: ${dist.join(', ')}`);
    return { distances: dist, steps };
}
