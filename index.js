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

            box.style.left = scaledX + "vw";
            box.style.top = scaledY + "vw";
            box.style.width = BOX_SIZE + "vw";
            box.style.height = BOX_SIZE + "vw";

            box.style.background = getHslColourString(((x + y) / (GRID_SIZE * 2)) * 360);
            document.body.appendChild(box);
        }
    }
}

let lastX = null;
let lastY = null;
let mouseDown = false;
const FADE_DELAY_MS = 500;
const ROTATE_DELAY_MS = 1;

// cause im the fanciest guy around we using |=
window.addEventListener('pointerdown', (e) => mouseDown |= e.button === 0 && handleHover(e.clientX, e.clientY));
window.addEventListener('pointerup', (e) => mouseDown &= e.button !== 0);

window.addEventListener('pointermove', (e) => {
    if (lastX != null && lastY != null) {
        const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
        const steps = Math.ceil(dist / 5);

        for (let i = 0; i <= steps; i++) {
            handleHover(
                lastX + (e.clientX - lastX) * (i / steps),
                lastY + (e.clientY - lastY) * (i / steps)
            );
        }
    }

    lastX = e.clientX;
    lastY = e.clientY;
});

function handleHover(x, y) {
    const hoveredElement = document.elementFromPoint(x, y);

    if (hoveredElement == null || !hoveredElement.classList.contains('box')) return false;

    addClassToBox(hoveredElement, mouseDown ? 'dragged' : 'hovered', mouseDown ? FADE_DELAY_MS : ROTATE_DELAY_MS)

    return true;
}

function addClassToBox(box, className, time) {
    // the "active" (class? tag? idk the word) makes the box immediately darken
    box.classList.add(className);

    // how fancy is this! wait a lil while before making the box fade back to normal
    setTimeout(() => box.classList.remove(className), time);
}