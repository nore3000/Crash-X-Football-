// Initialize Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.PointLight(0xffffff, 2, 100);
light.position.set(0, 10, 0);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
scene.add(ambientLight);

// Rocket model (cylinder shape for simplicity)
const rocketGeometry = new THREE.CylinderGeometry(0.5, 0.8, 3, 32);
const rocketMaterial = new THREE.MeshStandardMaterial({
    color: 'red',
    emissive: new THREE.Color(0.5, 0.5, 0),
    emissiveIntensity: 0.5,
    roughness: 0.5,
    metalness: 0.5
});
const rocket = new THREE.Mesh(rocketGeometry, rocketMaterial);
rocket.position.set(0, -5, 0);
scene.add(rocket);

// Rocket fins
const finGeometry = new THREE.CylinderGeometry(0.1, 0.2, 1, 6);
const finMaterial = new THREE.MeshStandardMaterial({ color: 'black' });

const fin1 = new THREE.Mesh(finGeometry, finMaterial);
fin1.rotation.z = Math.PI / 2;
fin1.position.set(-0.7, -2.5, 0);
rocket.add(fin1);

const fin2 = new THREE.Mesh(finGeometry, finMaterial);
fin2.rotation.z = Math.PI / 2;
fin2.position.set(0.7, -2.5, 0);
rocket.add(fin2);

// Stadium background
const loader = new THREE.TextureLoader();
loader.load('https://www.wallpaperflare.com/static/778/962/82/soccer-field-football-soccer-ball-sports-field-wallpaper.jpg', function (texture) {
    const background = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide })
    );
    background.position.z = -50;
    scene.add(background);
});

// Bet settings
let minBet = 0.1;
let maxBet = 200;
let currentMultiplier = 1.0;
let rocketSpeed = 0.1;
let arrowSpeed = 0.1;
let rocketSize = 1;
let userBetAmount = 0.1;

function updateMultiplier() {
    currentMultiplier = rocketSize;
    document.querySelector('#multiplier-info').textContent = `x${currentMultiplier.toFixed(2)}`;
}

document.querySelector('#bet-amount').addEventListener('input', (event) => {
    userBetAmount = parseFloat(event.target.value);
    if (userBetAmount < minBet) {
        userBetAmount = minBet;
        event.target.value = minBet;
    }
    if (userBetAmount > maxBet) {
        userBetAmount = maxBet;
        event.target.value = maxBet;
    }
});

document.querySelector('#place-bet').addEventListener('click', () => {
    alert(`You placed a bet of $${userBetAmount.toFixed(2)}`);
});

function animate() {
    requestAnimationFrame(animate);

    if (rocket.position.y < 10) {
        rocket.position.y += rocketSpeed;
        rocketSize += 0.01;
        rocket.scale.set(rocketSize, rocketSize, rocketSize);
        updateMultiplier();
    }

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
