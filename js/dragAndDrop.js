let selectedGate = null;
const connections = []; // Store connections
const gateOutputs = {}; // Store outputs for each gate

// Event listeners for dragging gates
document.querySelectorAll('.gate').forEach(gate => {
    gate.addEventListener('dragstart', dragStart);
    gate.addEventListener('dragend', dragEnd);
});

const workspace = document.getElementById('workspace');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

workspace.addEventListener('dragover', dragOver);
workspace.addEventListener('drop', drop);
document.getElementById('calculate').addEventListener('click', calculateFinalOutput);

function dragStart(e) {
    selectedGate = this; // Store the currently dragged gate
    e.dataTransfer.setData('text/plain', this.id); // Set the ID of the gate being dragged
}

function dragEnd() {
    selectedGate = null; // Clear the selected gate
}

function dragOver(e) {
    e.preventDefault(); // Prevent default behavior to allow dropping
}

function drop(e) {
    e.preventDefault();
    const gateId = e.dataTransfer.getData('text/plain');
    const gateElement = document.getElementById(gateId);

    // Set the position of the gate
    const posX = e.clientX - workspace.offsetLeft;
    const posY = e.clientY - workspace.offsetTop;

    const newGate = gateElement.cloneNode(true);
    newGate.style.position = 'absolute';
    newGate.style.left = `${posX}px`;
    newGate.style.top = `${posY}px`;

    workspace.appendChild(newGate);
    connections.push({ id: newGate.id, x: posX, y: posY });

    // Draw connections (optional: visual representation)
    drawConnections();
}

function drawConnections() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    connections.forEach(connection => {
        ctx.beginPath();
        ctx.arc(connection.x, connection.y, 20, 0, Math.PI * 2); // Draw gate representation
        ctx.strokeStyle = 'black';
        ctx.stroke();
    });
}

// Function to calculate the final output of the circuit
function calculateFinalOutput() {
    const inputs = prompt("Enter the inputs (comma-separated, e.g., 1,0):").split(',').map(Number);

    connections.forEach((connection, index) => {
        const gateId = connection.id;
        const inputA = inputs[index % inputs.length]; // Cycle through inputs
        const inputB = inputs[(index + 1) % inputs.length]; // Simple logic for two inputs

        const output = calculateGateOutput(gateId, inputA, inputB);
        gateOutputs[gateId] = output; // Store output for each gate
    });

    // For final output, you can decide based on the last gate output or your logic
    const finalOutput = Object.values(gateOutputs).reduce((prev, curr) => curr);
    document.getElementById('final-result').innerText = finalOutput !== undefined ? finalOutput : 'N/A';
}

// Function to calculate output of individual gates
function calculateGateOutput(gateId, inputA, inputB) {
    switch (gateId) {
        case 'and-gate':
            return inputA & inputB;
        case 'or-gate':
            return inputA | inputB;
        case 'not-gate':
            return inputA ? 0 : 1; // Not gate only requires one input
        case 'nand-gate':
            return !(inputA & inputB);
        case 'nor-gate':
            return !(inputA | inputB);
        case 'xor-gate':
            return inputA ^ inputB;
        case 'xnor-gate':
            return !(inputA ^ inputB);
        default:
            return null;
    }
}