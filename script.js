let gates = [];
let connections = [];
const truthTable = {
    AND: (a, b) => a && b,
    OR: (a, b) => a || b,
    NOT: (a) => !a,
    NAND: (a, b) => !(a && b),
    NOR: (a, b) => !(a || b),
    XOR: (a, b) => a !== b,
    XNOR: (a, b) => a === b
};

document.querySelectorAll('.gate').forEach(gate => {
    gate.addEventListener('dragstart', dragStart);
});

const circuitBoard = document.getElementById('circuitBoard');
circuitBoard.addEventListener('dragover', dragOver);
circuitBoard.addEventListener('drop', drop);

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const gateId = event.dataTransfer.getData('text/plain');
    const gateElement = document.getElementById(gateId);
    const gateClone = gateElement.cloneNode(true);
    const { clientX: x, clientY: y } = event;

    gateClone.classList.add('circuit-gate');
    gateClone.style.left = `${x - 50}px`; // Center the gate
    gateClone.style.top = `${y - 30}px`; // Center the gate

    circuitBoard.appendChild(gateClone);
    gates.push({ id: gateId, x: x - 50, y: y - 30 });
    setupGate(gateClone);
}

function setupGate(gate) {
    gate.addEventListener('dblclick', (event) => {
        const inputA = prompt("Enter value for A (0 or 1):");
        const inputB = prompt("Enter value for B (0 or 1):");
        const gateId = gate.id;

        let result;
        if (gateId === 'not') {
            result = truthTable[gateId](Number(inputA));
        } else {
            result = truthTable[gateId](Number(inputA), Number(inputB));
        }

        alert(`Output of ${gateId} gate: ${result}`);
        // You can also add more complex wiring and output logic here
    });

    gate.addEventListener('dragend', () => {
        // Logic for handling drag end if needed
    });
}

document.getElementById('showTruthTable').addEventListener('click', () => {
    const truthTableBody = document.getElementById('truthTableBody');
    truthTableBody.innerHTML = '';

    // Example truth table for AND gate
    for (let a = 0; a <= 1; a++) {
        for (let b = 0; b <= 1; b++) {
            const y = truthTable.AND(a, b);
            truthTableBody.innerHTML += `<tr><td>${a}</td><td>${b}</td><td>${y}</td></tr>`;
        }
    }

    document.getElementById('truthTable').hidden = false;
});