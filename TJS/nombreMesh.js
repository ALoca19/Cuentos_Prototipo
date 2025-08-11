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
    '/models/Figuras01.glb',
    function (gltf) {
        const model = gltf.scene;
        scene.add(model);

        // Recorrer la jerarquía y mostrar los nombres en la consola
        model.traverse((child) => {
            if (child.isMesh) {
                console.log('Nombre del objeto:', child.name);
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
