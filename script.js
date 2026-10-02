const algorithms = {
  bubbleSort: {
    name: "Bubble Sort",
    category: "Sorting",
    complexity: "O(n²) time, O(1) space",
    useCase: "Simple sorting for small inputs and teaching purposes.",
    steps: [
      {
        description: "Start with an unsorted array.",
        state: [5, 1, 4, 2, 8],
      },
      {
        description: "Compare 5 and 1, then swap.",
        state: [1, 5, 4, 2, 8],
        active: [1],
      },
      {
        description: "Compare 5 and 4, then swap.",
        state: [1, 4, 5, 2, 8],
        active: [2],
      },
      {
        description: "Compare 5 and 2, then swap.",
        state: [1, 4, 2, 5, 8],
        active: [3],
      },
      {
        description: "Second pass continues and 2 moves left.",
        state: [1, 2, 4, 5, 8],
        done: [4],
      },
      {
        description: "Array is sorted.",
        state: [1, 2, 4, 5, 8],
        done: [0, 1, 2, 3, 4],
      },
    ],
  },
  binarySearch: {
    name: "Binary Search",
    category: "Search",
    complexity: "O(log n) time, O(1) space",
    useCase: "Fast lookups in sorted data.",
    steps: [
      {
        description: "Sorted array and target = 13.",
        state: [3, 7, 9, 13, 21, 34, 55],
      },
      {
        description: "Check middle index 3. Found target 13.",
        state: [3, 7, 9, 13, 21, 34, 55],
        active: [3],
        done: [3],
      },
    ],
  },
  dijkstra: {
    name: "Dijkstra's Algorithm",
    category: "Graph",
    complexity: "O((V + E) log V) with priority queue",
    useCase: "Shortest path for non-negative weighted graphs.",
    steps: [
      {
        description: "Initialize distances from source A.",
        state: ["A:0", "B:∞", "C:∞", "D:∞"],
        active: [0],
      },
      {
        description: "Visit A and relax neighbors B (4), C (1).",
        state: ["A:0", "B:4", "C:1", "D:∞"],
        done: [0],
      },
      {
        description: "Visit C (smallest), relax D through C (1+3).",
        state: ["A:0", "B:4", "C:1", "D:4"],
        active: [2],
        done: [0, 2],
      },
      {
        description: "Visit B then D; shortest distances finalized.",
        state: ["A:0", "B:4", "C:1", "D:4"],
        done: [0, 1, 2, 3],
      },
    ],
  },
};

const algorithmSelect = document.getElementById("algorithm");
const details = document.getElementById("details");
const stepCounter = document.getElementById("stepCounter");
const stepDescription = document.getElementById("stepDescription");
const stateView = document.getElementById("stateView");
const resetButton = document.getElementById("reset");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const playButton = document.getElementById("play");

let currentAlgorithmKey = "bubbleSort";
let currentStep = 0;
let playTimer;

function renderOptions() {
  Object.entries(algorithms).forEach(([key, algorithm]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = algorithm.name;
    algorithmSelect.append(option);
  });
  algorithmSelect.value = currentAlgorithmKey;
}

function renderDetails() {
  const algorithm = algorithms[currentAlgorithmKey];
  details.innerHTML = `
    <div class="meta"><div><strong>Name:</strong> ${algorithm.name}</div>
    <div><strong>Category:</strong> ${algorithm.category}</div>
    <div><strong>Complexity:</strong> ${algorithm.complexity}</div>
    <div><strong>Use-case:</strong> ${algorithm.useCase}</div></div>
  `;
}

function renderStep() {
  const algorithm = algorithms[currentAlgorithmKey];
  const step = algorithm.steps[currentStep];

  stepCounter.textContent = `${currentStep + 1} / ${algorithm.steps.length}`;
  stepDescription.textContent = step.description;

  stateView.innerHTML = "";

  step.state.forEach((value, index) => {
    const item = document.createElement("div");
    item.className = "item";

    if (step.active?.includes(index)) {
      item.classList.add("active");
    }

    if (step.done?.includes(index)) {
      item.classList.add("done");
    }

    item.textContent = value;
    stateView.append(item);
  });
}

function stopPlaying() {
  clearInterval(playTimer);
  playTimer = undefined;
  playButton.textContent = "Play";
}

function resetSteps() {
  stopPlaying();
  currentStep = 0;
  renderStep();
}

function nextStep() {
  const algorithm = algorithms[currentAlgorithmKey];
  if (currentStep < algorithm.steps.length - 1) {
    currentStep += 1;
    renderStep();
  } else {
    stopPlaying();
  }
}

function previousStep() {
  if (currentStep > 0) {
    currentStep -= 1;
    renderStep();
  }
}

function togglePlay() {
  if (playTimer) {
    stopPlaying();
    return;
  }

  playButton.textContent = "Pause";
  playTimer = setInterval(nextStep, 1400);
}

algorithmSelect.addEventListener("change", (event) => {
  currentAlgorithmKey = event.target.value;
  resetSteps();
  renderDetails();
});
resetButton.addEventListener("click", resetSteps);
nextButton.addEventListener("click", nextStep);
prevButton.addEventListener("click", previousStep);
playButton.addEventListener("click", togglePlay);

renderOptions();
renderDetails();
renderStep();
