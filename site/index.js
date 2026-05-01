/* people disable javascript apparently, blehhhh
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
 */