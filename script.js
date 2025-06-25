import * as THREE from 'three';

let camera, scene, renderer;
let world;
let stack = [];
let overhangs = [];
const boxHeight = 1;
let gameStarted = false;

const scoreElement = document.getElementById('score');
const instructionsElement = document.getElementById('instructions');
const resultsElement = document.getElementById('results');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');

init();

function init() {
    scene = new THREE.Scene();

    addLayer(0, 0, 10, 10);
    addLayer(-10, 0, 10, 10, 'x');

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(10, 20, 0);
    scene.add(dirLight);

    const aspect = window.innerWidth / window.innerHeight;
    const width = 10;
    const height = width / aspect;

    camera = new THREE.OrthographicCamera(
        width / -2,
        width / 2,
        height / 2,
        height / -2,
        1,
        100
    );
    camera.position.set(4, 4, 4);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animation);
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', () => {
        const aspect = window.innerWidth / window.innerHeight;
        const width = 10;
        const height = width / aspect;
        camera.top = height / 2;
        camera.bottom = height / -2;
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    });
}

function startGame() {
    gameStarted = true;
    scoreElement.innerText = 0;
    instructionsElement.style.display = 'none';
    resultsElement.classList.add('hide');

    stack = [];
    overhangs = [];

    if (scene) {
        while (scene.children.length > 0) {
            scene.remove(scene.children[0]);
        }
    }

    addLayer(0, 0, 10, 10);
    addLayer(-10, 0, 10, 10, 'x');

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(10, 20, 0);
    scene.add(dirLight);

    if(renderer) {
        renderer.setAnimationLoop(animation);
    }
}

function addLayer(x, z, width, depth, direction) {
    const y = boxHeight * stack.length;
    const layer = generateBox(x, y, z, width, depth, false);
    layer.direction = direction;
    stack.push(layer);
}

function addOverhang(x, z, width, depth) {
    const y = boxHeight * (stack.length - 1);
    const overhang = generateBox(x, y, z, width, depth, true);
    overhangs.push(overhang);
}

function generateBox(x, y, z, width, depth, falls) {
    const geometry = new THREE.BoxGeometry(width, boxHeight, depth);
    const color = new THREE.Color(`hsl(${30 + stack.length * 4}, 100%, 50%)`);
    const material = new THREE.MeshLambertMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    scene.add(mesh);
    return {
        threejs: mesh,
        width,
        depth
    };
}

let eventListenerAdded = false;

function addEventListenerOnce() {
    if (!eventListenerAdded) {
        window.addEventListener('mousedown', () => eventHandler());
        window.addEventListener('touchstart', () => eventHandler());
        restartButton.addEventListener('click', startGame);
        eventListenerAdded = true;
    }
}
addEventListenerOnce();

function eventHandler() {
    if (!gameStarted) {
        startGame();
    } else {
        const topLayer = stack[stack.length - 1];
        const previousLayer = stack[stack.length - 2];
        const direction = topLayer.direction;

        const delta = topLayer.threejs.position[direction] - previousLayer.threejs.position[direction];
        const overhangSize = Math.abs(delta);
        const size = direction === 'x' ? topLayer.width : topLayer.depth;
        const overlap = size - overhangSize;

        if (overlap > 0) {
            const newWidth = direction === 'x' ? overlap : topLayer.width;
            const newDepth = direction === 'z' ? overlap : topLayer.depth;
            topLayer.width = newWidth;
            topLayer.depth = newDepth;
            topLayer.threejs.scale[direction] = overlap / size;
            topLayer.threejs.position[direction] -= delta / 2;

            const overhangShift = (overlap / 2 + overhangSize / 2) * Math.sign(delta);
            const overhangX = direction === 'x' ? topLayer.threejs.position.x + overhangShift : topLayer.threejs.position.x;
            const overhangZ = direction === 'z' ? topLayer.threejs.position.z + overhangShift : topLayer.threejs.position.z;
            const overhangWidth = direction === 'x' ? overhangSize : newWidth;
            const overhangDepth = direction === 'z' ? overhangSize : newDepth;
            addOverhang(overhangX, overhangZ, overhangWidth, overhangDepth);

            const nextX = direction === 'x' ? topLayer.threejs.position.x : -10;
            const nextZ = direction === 'z' ? topLayer.threejs.position.z : -10;
            const newDirection = direction === 'x' ? 'z' : 'x';
            
            scoreElement.innerText = stack.length - 1;

            addLayer(nextX, nextZ, newWidth, newDepth, newDirection);
        } else {
            gameOver();
        }
    }
}

function gameOver() {
    if (renderer) renderer.setAnimationLoop(null);
    gameStarted = false;
    finalScoreElement.innerText = stack.length - 1;
    resultsElement.classList.remove('hide');
}

function animation() {
    const speed = 0.15;
    if (gameStarted) {
        const topLayer = stack[stack.length - 1];
        topLayer.threejs.position[topLayer.direction] += speed;
        if (topLayer.threejs.position[topLayer.direction] > 10) {
            gameOver();
        }
    }

    if (camera.position.y < boxHeight * (stack.length - 2) + 4) {
        camera.position.y += speed / 2;
    }
    
    overhangs.forEach(overhang => {
        overhang.threejs.position.y -= 0.1;
    });

    renderer.render(scene, camera);
}