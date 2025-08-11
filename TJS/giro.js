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

let cylinder133 = null; // Variable para almacenar el objeto principal Cylinder133

// Cargar el modelo GLB/GLTF
const loader = new GLTFLoader();
loader.load(
    '/models/Figuras01.glb',
    function (gltf) {
        const model = gltf.scene;
        scene.add(model);

        // Buscar el objeto principal llamado "Cylinder133" en la jerarquía del modelo
        model.traverse((child) => {
            if (child.name === 'Cylinder133_1') {
                cylinder133 = child; // Almacenar la referencia al objeto principal
            }
        });

        if (cylinder133) {
            // Posicionar la cámara para ver el modelo completo
            const box = new THREE.Box3().setFromObject(cylinder133);
            const size = box.getSize(new THREE.Vector3()).length();
            const center = box.getCenter(new THREE.Vector3());

            camera.position.set(center.x, center.y, size * 1.5);
            camera.lookAt(center);
            controls.target.copy(center);
        } else {
            console.error('No se encontró el objeto Cylinder133 en el modelo.');
        }
    },
    undefined,
    function (error) {
        console.error('Error al cargar el modelo:', error);
    }
);

// Función de animación principal
function animate() {
    requestAnimationFrame(animate);

    // Si el objeto Cylinder133 existe, hazlo girar
    if (cylinder133) {
        cylinder133.rotation.z += 0.01; // Ajusta la velocidad de rotación según sea necesario
    }

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
