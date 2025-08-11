import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Configuración de la escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
scene.background = new THREE.Color(0xffffff); // Fondo blanco

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.minDistance = 1;
controls.maxDistance = 100;

// Agregar luz ambiental
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Configurar el Raycaster para detección de clics
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let trianguloMesh = null; // Variable para almacenar el objeto Triangulo

// Cargar el modelo GLB/GLTF
const loader = new GLTFLoader();
loader.load(
    '/models/Figuras02.glb',
    function (gltf) {
        const model = gltf.scene;
        scene.add(model);

        // Buscar el objeto llamado "Triangulo" en la jerarquía del modelo
        model.traverse((child) => {
            if (child.isMesh && child.name === 'Triangulo') { //02-Triangulo 03-Cuadrado 04-Hexagono 05-Pentagono 
                trianguloMesh = child; // Almacenar la referencia al objeto Triangulo
            }
        });

        // Posicionar la cámara para ver el modelo completo
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3()).length();
        const center = box.getCenter(new THREE.Vector3());

        camera.position.set(center.x, center.y, size * 1.5);
        camera.lookAt(center);
        controls.target.copy(center);
    },
    undefined,
    function (error) {
        console.error('Error al cargar el modelo:', error);
    }
);

// Función para manejar los clics del mouse
function onMouseClick(event) {
    if (!trianguloMesh) return; // Verificar que el objeto Triangulo exista

    // Actualizar las coordenadas del mouse para el raycaster
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Usar el raycaster para detectar intersecciones con el objeto Triangulo
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(trianguloMesh);

    if (intersects.length > 0) {
        // Si se hace clic en el Triangulo, aplicarle una animación de giro y desaparecer
        const rotationSpeed = 0.1;
        const fadeOutSpeed = 0.05;

        function animateTriangulo() {
            if (trianguloMesh.rotation.y < Math.PI) {
                trianguloMesh.rotation.y += rotationSpeed;
                trianguloMesh.material.opacity -= fadeOutSpeed;
                trianguloMesh.material.transparent = true;
                requestAnimationFrame(animateTriangulo);
            } else {
                // Eliminar el Triangulo de la escena
                scene.remove(trianguloMesh);
            }
        }

        animateTriangulo();
    }
}

// Escuchar el evento de clic
window.addEventListener('click', onMouseClick);

// Función de animación principal
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

// Ajustar el tamaño del renderizador cuando cambia el tamaño de la ventana
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
