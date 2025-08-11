import { loadGLTF } from "../libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOM completamente cargado y analizado");

    // Configuración básica de MINDAR.IMAGE y Three.js
    const container = document.getElementById('container');
    if (!container) {
        console.error("No se encontró el contenedor.");
        return;
    }

    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.body,
        imageTargetSrc: '../target/Figuras.mind',
        maxTrack: 1,
    });

    const { renderer, scene, camera } = mindarThree;

    // Fondo de la escena
    const loader = new THREE.TextureLoader();
    loader.load('./images/Fondo.png', (texture) => {
        scene.background = texture;
    }, undefined, (error) => {
        console.error("Error al cargar la imagen de fondo:", error);
    });

    camera.position.z = 5;

    // Asignación de eventos de los botones del menú
    const cuentosButton = document.querySelector('.menu button:nth-child(3)');
    const creditosButton = document.querySelector('.menu button:nth-child(4)');
    const salirButton = document.querySelector('.menu button:nth-child(5)');

    const openCuentos = () => window.location.replace("../pages/cuentos.html");
    const openCreditos = () => {
        console.log("Abrir créditos");
        alert("Abrir créditos");
    };
    const salir = () => {
        console.log("Salir del juego");
        alert("Salir del juego");
    };

    if (cuentosButton && creditosButton && salirButton) {
        cuentosButton.onclick = openCuentos;
        creditosButton.onclick = openCreditos;
        salirButton.onclick = salir;
    } else {
        console.error("No se encontraron los botones del menú.");
    }

    // Función de animación y renderizado
    const animate = () => {
        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
        });
    };

    // Iniciar MINDAR y animación
    await mindarThree.start();
    animate();

    // Manejar el cambio de tamaño de la ventana
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
});
