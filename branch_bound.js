// Branch and Bound Algorithms will be implemented here.

// Travelling Salesman Problem (Branch and Bound)
function tspBranchAndBound(graph) {
    const n = graph.length;
    const visited = new Array(n).fill(false);
    let finalPath = new Array(n + 1);
    let finalRes = Infinity;
    let steps = [];

    function copyToFinal(currPath) {
        for (let i = 0; i < n; i++) {
            finalPath[i] = currPath[i];
        }
        finalPath[n] = currPath[0];
    }

    function firstMin(i) {
        let min = Infinity;
        for (let k = 0; k < n; k++) {
            if (graph[i][k] < min && i !== k) {
                min = graph[i][k];
            }
        }
        return min;
    }

    function secondMin(i) {
        let first = Infinity, second = Infinity;
        for (let j = 0; j < n; j++) {
            if (i === j) continue;
            if (graph[i][j] <= first) {
                second = first;
                first = graph[i][j];
            } else if (graph[i][j] <= second && graph[i][j] !== first) {
                second = graph[i][j];
            }
        }
        return second;
    }

    function TSPRec(currBound, currWeight, level, currPath) {
        if (level === n) {
            if (graph[currPath[level - 1]][currPath[0]] !== 0) {
                let currRes = currWeight + graph[currPath[level - 1]][currPath[0]];
                if (currRes < finalRes) {
                    copyToFinal(currPath);
                    finalRes = currRes;
                }
            }
            return;
        }

        for (let i = 0; i < n; i++) {
            if (graph[currPath[level - 1]][i] !== 0 && visited[i] === false) {
                let temp = currBound;
                currWeight += graph[currPath[level - 1]][i];

                if (level === 1) {
                    currBound -= ((firstMin(currPath[level - 1]) + firstMin(i)) / 2);
                } else {
                    currBound -= ((secondMin(currPath[level - 1]) + firstMin(i)) / 2);
                }

                if (currBound + currWeight < finalRes) {
                    currPath[level] = i;
                    visited[i] = true;
                    TSPRec(currBound, currWeight, level + 1, currPath);
                }

                currWeight -= graph[currPath[level - 1]][i];
                currBound = temp;
                visited.fill(false);
                for (let j = 0; j <= level - 1; j++) {
                    visited[currPath[j]] = true;
                }
            }
        }
    }

    let currPath = new Array(n + 1).fill(-1);
    let currBound = 0;
    let path = [];

    for (let i = 0; i < n; i++) {
        currBound += (firstMin(i) + secondMin(i));
    }

    currBound = (currBound & 1) ? currBound / 2 + 1 : currBound / 2;
    visited[0] = true;
    currPath[0] = 0;
    TSPRec(currBound, 0, 1, currPath);

    steps.push(`Minimum cost: ${finalRes}`);
    steps.push(`Path Taken: ${finalPath.join(" -> ")}`);
    return { minCost: finalRes, path: finalPath, steps };
}

// Ford-Fulkerson Algorithm
function fordFulkerson(graph, source, sink) {
    let rGraph = graph.map(row => [...row]);
    let parent = new Array(graph.length);
    let maxFlow = 0;
    let steps = [];

    function bfs() {
        let visited = new Array(graph.length).fill(false);
        let queue = [];
        queue.push(source);
        visited[source] = true;
        parent[source] = -1;

        while (queue.length > 0) {
            let u = queue.shift();
            for (let v = 0; v < graph.length; v++) {
                if (visited[v] === false && rGraph[u][v] > 0) {
                    queue.push(v);
                    parent[v] = u;
                    visited[v] = true;
                }
            }
        }
        return (visited[sink] === true);
    }

    while (bfs()) {
        let pathFlow = Infinity;
        for (let v = sink; v !== source; v = parent[v]) {
            let u = parent[v];
            pathFlow = Math.min(pathFlow, rGraph[u][v]);
        }

        for (let v = sink; v !== source; v = parent[v]) {
            let u = parent[v];
            rGraph[u][v] -= pathFlow;
            rGraph[v][u] += pathFlow;
        }
        steps.push(`Found augmenting path with flow: ${pathFlow}`);
        maxFlow += pathFlow;
    }

    steps.push(`Max Flow: ${maxFlow}`);
    return { maxFlow, steps };
}
