import { loadGLTF } from "../libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.querySelector('.btn-primary');
    if (backButton) {
        backButton.onclick = function () {
            console.log("Regresando a la página anterior...");
            window.history.back(); // Regresa a la página anterior en el historial
        };
    }

    const start = async () => {
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: '../target/Bosque.mind',
            maxTrack: 1,
        });
        const { renderer, scene, camera } = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);

        // Cargar modelos

        const Figu00 = await loadGLTF('../models/Bosque/Bosque00.glb');
        Figu00.scene.scale.set(0.25, 0.25, 0.25);
        Figu00.scene.position.set(0, 0, 0);

        const Figu01 = await loadGLTF('../models/Bosque/Bosque01.glb');
        Figu01.scene.scale.set(0.25, 0.25, 0.25);
        Figu01.scene.position.set(0, 0, 0);

        const Figu02 = await loadGLTF('../models/Bosque/Bosque02.glb');
        Figu02.scene.scale.set(0.25, 0.25, 0.25);
        Figu02.scene.position.set(0, 0, 0);

        const Figu03 = await loadGLTF('../models/Bosque/Bosque03.glb');
        Figu03.scene.scale.set(0.25, 0.25, 0.25);
        Figu03.scene.position.set(0, 0, 0);

        const Figu04 = await loadGLTF('../models/Bosque/Bosque04.glb');
        Figu04.scene.scale.set(0.25, 0.25, 0.25);
        Figu04.scene.position.set(0, 0, 0);

        const Figu05 = await loadGLTF('../models/Bosque/Bosque05.glb');
        Figu05.scene.scale.set(0.25, 0.25, 0.25);
        Figu05.scene.position.set(0, 0, 0);

        const Figu06 = await loadGLTF('../models/Bosque/Bosque06.glb');
        Figu06.scene.scale.set(0.25, 0.25, 0.25);
        Figu06.scene.position.set(0, 0, 0);

       // Anclar modelos a la escena

        const Fig00Anchor = mindarThree.addAnchor(0);
        Fig00Anchor.group.add(Figu00.scene);

        const Fig01Anchor = mindarThree.addAnchor(1);
        Fig01Anchor.group.add(Figu01.scene);

        const Fig02Anchor = mindarThree.addAnchor(2);
        Fig02Anchor.group.add(Figu02.scene);

        const Fig03Anchor = mindarThree.addAnchor(3);
        Fig03Anchor.group.add(Figu03.scene);

        const Fig04Anchor = mindarThree.addAnchor(4);
        Fig04Anchor.group.add(Figu04.scene);

        const Fig05Anchor = mindarThree.addAnchor(5);
        Fig05Anchor.group.add(Figu05.scene);

        const Fig06Anchor = mindarThree.addAnchor(6);
        Fig06Anchor.group.add(Figu06.scene);

        //programar interacciones o movimientos de los modelos

        //programar Sonido
        // Cargar el archivo de sonido
        const audioBosque = new Audio('../sound/Bosque/bosque.mp3');
        const audioOso = new Audio('../sound/Bosque/oso.mp3');
        const audioArdilla = new Audio('../sound/Bosque/ardilla.mp3');
        const audioPajaro = new Audio('../sound/Bosque/pajaro.mp3');
        const audioBatman = new Audio('../sound/Bosque/murcielago.mp3');
        
        // Reproducir el sonido cuando se detecte el ancla 
        Fig00Anchor.onTargetFound = () => {
            console.log("Figu00 detectado");
            audioBosque.play(); // Reproducir el sonido
        };

        Fig01Anchor.onTargetFound = () => {
            console.log("Figu01 detectado");
            audioBosque.play(); // Reproducir el sonido
        };

        Fig02Anchor.onTargetFound = () => {
            console.log("Figu02 detectado");
            audioOso.play(); // Reproducir el sonido
        };

        Fig03Anchor.onTargetFound = () => {
            console.log("Figu03 detectado");
            audioArdilla.play(); // Reproducir el sonido
        };

        Fig04Anchor.onTargetFound = () => {
            console.log("Figu04 detectado");
            audioPajaro.play(); // Reproducir el sonido
        };

        Fig05Anchor.onTargetFound = () => {
            console.log("Figu05 detectado");
            audioBatman.play(); // Reproducir el sonido
        };

        Fig06Anchor.onTargetFound = () => {
            console.log("Figu06 detectado");
            audioBosque.play(); // Reproducir el sonido
        };

        // Detener el sonido cuando se pierda el target
        Fig00Anchor.onTargetLost = () => {
            console.log("Figu00 perdido");
            audioBosque.pause(); // Pausar el sonido
            audioBosque.currentTime = 0; // Reiniciar el sonido
        };

        Fig01Anchor.onTargetLost = () => {
            console.log("Figu01 perdido");
            audioBosque.pause(); // Pausar el sonido
            audioBosque.currentTime = 0; // Reiniciar el sonido
        };

        Fig02Anchor.onTargetLost = () => {
            console.log("Figu02 perdido");
            audioOso.pause(); // Pausar el sonido
            audioOso.currentTime = 0; // Reiniciar el sonido
        };

        Fig03Anchor.onTargetLost = () => {
            console.log("Figu03 perdido");
            audioArdilla.pause(); // Pausar el sonido
            audioArdilla.currentTime = 0; // Reiniciar el sonido
        };

        Fig04Anchor.onTargetLost = () => {
            console.log("Figu04 perdido");
            audioPajaro.pause(); // Pausar el sonido
            audioPajaro.currentTime = 0; // Reiniciar el sonido
        };

        Fig05Anchor.onTargetLost = () => {
            console.log("Figu05 perdido");
            audioBatman.pause(); // Pausar el sonido
            audioBatman.currentTime = 0; // Reiniciar el sonido
        };

        Fig06Anchor.onTargetLost = () => {
            console.log("Figu06 perdido");
            audioBosque.pause(); // Pausar el sonido
            audioBosque.currentTime = 0; // Reiniciar el sonido
        };

////////////////////////////////
//Para meter rotacion a las figuras con el mouse
// Crear un array con todas las figuras
const figuras = [Figu00, Figu01, Figu02, Figu03, Figu04, Figu05, Figu06];

// Variables para rastrear el movimiento
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

// Añadir eventos para interacción con el mouse
const container = document.body; // Cambia esto si tu contenedor no es el cuerpo
container.addEventListener('mousedown', (e) => {
    isDragging = true;
});
container.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const deltaMove = {
            x: e.movementX,
            y: e.movementY,
        };

        // Rotar todas las figuras
        figuras.forEach((figura) => {
            figura.scene.rotation.y += deltaMove.x * 0.01; // Rotar sobre el eje Y
            figura.scene.rotation.x += deltaMove.y * 0.01; // Rotar sobre el eje X
        });
    }

    previousMousePosition = {
        x: e.clientX,
        y: e.clientY,
    };
});
container.addEventListener('mouseup', () => {
    isDragging = false;
});
container.addEventListener('mouseleave', () => {
    isDragging = false;
});

// Opcional: Soporte para dispositivos táctiles
container.addEventListener('touchstart', (e) => {
    isDragging = true;
    previousMousePosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
    };
});
container.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches.length === 1) {
        const deltaMove = {
            x: e.touches[0].clientX - previousMousePosition.x,
            y: e.touches[0].clientY - previousMousePosition.y,
        };

        // Rotar todas las figuras
        figuras.forEach((figura) => {
            figura.scene.rotation.y += deltaMove.x * 0.01; // Rotar sobre el eje Y
            figura.scene.rotation.x += deltaMove.y * 0.01; // Rotar sobre el eje X
        });

        previousMousePosition = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        };
    }
});
container.addEventListener('touchend', () => {
    isDragging = false;
});

////////////////////////////////
       

        await mindarThree.start();
        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
        });
    };
    start();
});
