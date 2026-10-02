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
    'dijkstra': {
        best: 'O(E log V)',
        average: 'O(E log V)',
        worst: 'O(E log V)',
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
    'tsp': {
        best: 'O(n!)',
        average: 'O(n!)',
        worst: 'O(n!)',
        space: 'O(n)'
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
    'n-queens': {
        best: 'O(n)',
        average: 'O(n!)',
        worst: 'O(n!)',
        space: 'O(n)'
    },
    'ford-fulkerson': {
        best: 'O(E * max_flow)',
        average: 'O(E * max_flow)',
        worst: 'O(E * max_flow)',
        space: 'O(V²)'
    }
};
