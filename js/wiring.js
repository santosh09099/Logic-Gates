function addGateFunctionality(gate) {
    const inputs = createInputs();
    gate.appendChild(inputs);

    gate.addEventListener('click', () => {
        const inputValues = getInputs(gate);
        const output = computeGateOutput(gate.id, inputValues);
        showResults(gate, output);
    });
}

function createInputs() {
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('inputs');

    const inputA = document.createElement('input');
    inputA.type = 'checkbox';
    inputA.id = `inputA-${Math.random()}`;

    const labelA = document.createElement('label');
    labelA.htmlFor = inputA.id;
    labelA.innerText = 'A';

    const inputB = document.createElement('input');
    inputB.type = 'checkbox';
    inputB.id = `inputB-${Math.random()}`;

    const labelB = document.createElement('label');
    labelB.htmlFor = inputB.id;
    labelB.innerText = 'B';

    inputContainer.appendChild(labelA);
    inputContainer.appendChild(inputA);
    inputContainer.appendChild(labelB);
    inputContainer.appendChild(inputB);

    return inputContainer;
}

function getInputs(gate) {
    const inputs = gate.querySelectorAll('input[type="checkbox"]');
    return Array.from(inputs).map(input => input.checked ? 1 : 0);
}

function computeGateOutput(gateId, inputs) {
    switch (gateId) {
        case 'and':
            return inputs[0] && inputs[1];
        case 'or':
            return inputs[0] || inputs[1];
        case 'not':
            return !inputs[0];
        case 'nand':
            return !(inputs[0] && inputs[1]);
        case 'nor':
            return !(inputs[0] || inputs[1]);
        case 'xor':
            return inputs[0] ^ inputs[1];
        case 'xnor':
            return !(inputs[0] ^ inputs[1]);
        default:
            return 0;
    }
}

function showResults(gate, output) {
    const resultDiv = document.getElementById('truthTable');
    resultDiv.innerHTML += `<p>${gate.id}: ${output}</p>`;
}