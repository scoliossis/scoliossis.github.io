const GRID_SIZE = 50;
const BOX_SIZE = (1 / GRID_SIZE) * 101;

spawnInRainbowSquares();

function getHslColourString(hue) {
    return `hsl(${hue}, 100%, 80%)`;
}

function spawnInRainbowSquares() {
    for (let x = 0; x < GRID_SIZE; x++) {
        for (let y = 0; y < GRID_SIZE; y++) {
            const box = document.createElement("div");
            box.classList.add("box");

            const scaledX = (x / GRID_SIZE) * 100;
            const scaledY = (y / GRID_SIZE) * 100;

            box.style.left = "max("+scaledX + "vw, " +scaledX + "vh)";
            box.style.top = "max("+scaledY + "vw, " +scaledY + "vh)";
            box.style.width = box.style.height = "max("+BOX_SIZE + "vw, " +BOX_SIZE + "vh)";

            box.style.background = getHslColourString(((x + y) / (GRID_SIZE * 2)) * 360);
            document.body.appendChild(box);
        }
    }
}

let lastX = null; let lastY = null;

window.addEventListener('pointermove', (e) => {
    const boxRelativeSize = Math.max(window.innerWidth, window.innerHeight);
    const mouseX = Math.floor(e.clientX / boxRelativeSize * 100 / BOX_SIZE);
    const mouseY = Math.floor(e.clientY / boxRelativeSize * 100 / BOX_SIZE);

    if (mouseX === lastX && mouseY === lastY) return;

    console.log(mouseX, mouseY, lastX, lastY);

    if (lastX != null && lastY != null) {
        const steps = Math.hypot(mouseX - lastX, mouseY - lastY);
        if (steps === 0) return;

        for (let i = 1; i <= steps; i++) {
            const xAtStep = Math.floor((lastX + (mouseX - lastX) * (i / steps)));
            const yAtStep = Math.floor((lastY + (mouseY - lastY) * (i / steps)));
            handleHover(xAtStep, yAtStep, (mouseX - lastX) + (mouseY - lastY) <= 0 ? '' : '-');
        }
    }

    lastX = mouseX;
    lastY = mouseY;
});

function handleHover(x, y, axis) {
    const boxElements = document.getElementsByClassName('box');
    const index = (x*GRID_SIZE) + y;
    if (index >= boxElements.length) return;

    const hoveredElement = boxElements.item(index);
    if (hoveredElement == null) return;

    // makes the box immediately do a 360, then we slowly undo it later!
    hoveredElement.style.transform = 'rotate(' + axis + '90deg)';
    hoveredElement.style.transition = 'transform 0s';

    // remove the new transform
    setTimeout(() => hoveredElement.style.transform = hoveredElement.style.transition = '', 1);
}