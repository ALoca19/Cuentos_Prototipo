import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; // Importar OrbitControls

// Configuración de la escena, la cámara y el renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color(0xffffff); // Fondo blanco

// Configuración de los controles orbitales
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Suaviza los movimientos
controls.dampingFactor = 0.25; // Factor de amortiguación
controls.screenSpacePanning = false;
controls.minDistance = 1; // Distancia mínima de zoom
controls.maxDistance = 100; // Distancia máxima de zoom

// Cargar el modelo GLB/GLTF
const loader = new GLTFLoader();
loader.load(
    '/models/Figuras00.glb',
    function (gltf) {
        const model = gltf.scene;
        scene.add(model);

        // Ajustar la posición y la escala del modelo
        model.position.set(0, 0, 0);
        model.scale.set(1, 1, 1);

        // Ajustar la cámara para que se enfoque en el modelo
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3()).length();
        const center = box.getCenter(new THREE.Vector3());

        camera.position.set(center.x, center.y, size * 1.5);
        camera.lookAt(center);
        controls.target.copy(center); // Hacer que los controles orbiten alrededor del centro del modelo
    },
    undefined,
    function (error) {
        console.error('Error al cargar el modelo:', error);
    }
);

// Luz direccional
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);


const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Color blanco, intensidad 0.5
scene.add(ambientLight);

// Función de animación
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Actualizar los controles en cada frame
    renderer.render(scene, camera);
}

// Iniciar la animación
animate();

// Ajustar el tamaño del renderizador cuando cambia el tamaño de la ventana
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
