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

    const listModelElements = (object) => {
        object.traverse((child) => {
            console.log(child.name); // Imprime el nombre de cada elemento
        });
    };

    const start = async () => {
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: '../target/Luna.mind',
            maxTrack: 1,
        });
        const { renderer, scene, camera } = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);

        //cargar modelos

        const Figu00 = await loadGLTF('../models/Eclipse/Eclipse00.glb');
        Figu00.scene.scale.set(0.25, 0.25, 0.25);
        Figu00.scene.position.set(0, 0, 0);

        const Figu01 = await loadGLTF('../models/Eclipse/Eclipse01.glb');
        Figu01.scene.scale.set(0.25, 0.25, 0.25);
        Figu01.scene.position.set(0, 0, 0);

        const Figu02 = await loadGLTF('../models/Eclipse/Eclipse02.glb');
        Figu02.scene.scale.set(0.25, 0.25, 0.25);
        Figu02.scene.position.set(0, 0, 0);

        const Figu03 = await loadGLTF('../models/Eclipse/Eclipse03.glb');
        Figu03.scene.scale.set(0.25, 0.25, 0.25);
        Figu03.scene.position.set(0, 0, 0);

        const Figu04 = await loadGLTF('../models/Eclipse/Eclipse04.glb');
        Figu04.scene.scale.set(0.25, 0.25, 0.25);
        Figu04.scene.position.set(0, 0, 0);

        const Figu05 = await loadGLTF('../models/Eclipse/Eclipse05.glb');
        Figu05.scene.scale.set(0.25, 0.25, 0.25);
        Figu05.scene.position.set(0, 0, 0);

        const Figu06 = await loadGLTF('../models/Eclipse/Eclipse06.glb');
        Figu06.scene.scale.set(0.25, 0.25, 0.25);
        Figu06.scene.position.set(0, 0, 0);



        //agregar modelos a la escena

        const Fig0Anchor = mindarThree.addAnchor(0);
        Fig0Anchor.group.add(Figu00.scene);

        const Fig1Anchor = mindarThree.addAnchor(1);
        Fig1Anchor.group.add(Figu01.scene);

        const Fig2Anchor = mindarThree.addAnchor(2);
        Fig2Anchor.group.add(Figu02.scene);

        const Fig3Anchor = mindarThree.addAnchor(3);
        Fig3Anchor.group.add(Figu03.scene);

        const Fig4Anchor = mindarThree.addAnchor(4);
        Fig4Anchor.group.add(Figu04.scene);

        const Fig5Anchor = mindarThree.addAnchor(5);
        Fig5Anchor.group.add(Figu05.scene);

        const Fig6Anchor = mindarThree.addAnchor(6);
        Fig6Anchor.group.add(Figu06.scene);

        //configuracion de materiales
        Figu01.scene.traverse((child) => {
            if (child.isMesh && child.material) {
                const material = child.material;
        
                // Ajustar valores por defecto
                material.metalness = 0.0; // Sin efecto metálico
                material.roughness = 0.5; // Reflejos difusos
                material.transparent = false; // Sin transparencia
        
                // Si hay problemas con el mapa de entorno
                if (!scene.environment) {
                    material.envMap = null; // Si no hay entorno, desactiva el uso de mapas
                }
            }
        });

        // Habilitar transparencia para el modelo Figu04
        Figu04.scene.traverse((child) => {
            if (child.isMesh && child.material) {
                const material = child.material;

                material.transparent = true; // Habilitar transparencia
                material.opacity = 0.6; // Ajustar opacidad

                // Opcional
                material.alphaTest = 0.1; // Descarta píxeles transparentes
                material.blending = THREE.NormalBlending;
            }
        });

        Figu05.scene.traverse((child) => {
            if (child.isMesh && child.material) {
                const material = child.material;

                material.transparent = true; // Habilitar transparencia
                material.opacity = 0.6; // Ajustar opacidad

                // Opcional
                material.alphaTest = 0.1; // Descarta píxeles transparentes
                material.blending = THREE.NormalBlending;
            }
        });

        

        
        //programar interacciones o movimientos de los modelos

        //programar Sonido
        // Cargar el archivo de sonido
        const audioEspacio = new Audio('../sound/Eclipse/SonidoEspacio.mp3');
        
        // Reproducir el sonido cuando se detecte el ancla 
        Fig0Anchor.onTargetFound = () => {
            console.log("Figu00 detectado");
            audioEspacio.play(); // Reproducir el sonido
        };

        Fig4Anchor.onTargetFound = () => {
            console.log("Figu04 detectado");
            audioEspacio.play(); // Reproducir el sonido
        };

        Fig5Anchor.onTargetFound = () => {
            console.log("Figu05 detectado");
            audioEspacio.play(); // Reproducir el sonido
        };

        Fig6Anchor.onTargetFound = () => {
            console.log("Figu06 detectado");
            audioEspacio.play(); // Reproducir el sonido
        };

        // Detener el sonido cuando se pierda el target
        Fig0Anchor.onTargetLost = () => {
            console.log("Figu00 perdido");
            audioEspacio.pause(); // Pausar el sonido
            audioEspacio.currentTime = 0; // Reiniciar el sonido
        };

        Fig4Anchor.onTargetLost = () => {
            console.log("Figu04 perdido");
            audioEspacio.pause(); // Pausar el sonido
            audioEspacio.currentTime = 0; // Reiniciar el sonido
        };

        Fig5Anchor.onTargetLost = () => {
            console.log("Figu05 perdido");
            audioEspacio.pause(); // Pausar el sonido
            audioEspacio.currentTime = 0; // Reiniciar el sonido
        };

        Fig6Anchor.onTargetLost = () => {
            console.log("Figu06 perdido");
            audioEspacio.pause(); // Pausar el sonido
            audioEspacio.currentTime = 0; // Reiniciar el sonido
        };

        listModelElements(Figu03.scene);


        // Buscar elementos "tierra" y "luna"
        const tierra = Figu00.scene.getObjectByName("tierra001");
        const luna = Figu00.scene.getObjectByName("luna001");

        const luna2 = Figu03.scene.getObjectByName("luna002");

        const tierra3 = Figu04.scene.getObjectByName("tierra");
        const luna3 = Figu04.scene.getObjectByName("luna");
        const sol3 = Figu04.scene.getObjectByName("sol");

        const tierra4 = Figu05.scene.getObjectByName("tierra");
        const luna4 = Figu05.scene.getObjectByName("luna");
        const sol4 = Figu05.scene.getObjectByName("sol");

        const tierra5 = Figu06.scene.getObjectByName("tierra");
        const luna5 = Figu06.scene.getObjectByName("luna");
        const sol5 = Figu06.scene.getObjectByName("sol");



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

            if (tierra || luna) // Si el objeto existe, hazlo girar
            {
                if (tierra) tierra.rotation.y += 0.01; // Rotar sobre el eje Y
                if (luna) luna.rotation.y += 0.02;     
            }

            if (luna2) // Si el objeto existe, hazlo girar
            {
                luna2.rotation.z += 0.01; // Rotar sobre el eje Y
            }

            if (tierra3 || luna3 || sol3) // Si el objeto existe, hazlo girar
            {
                if (tierra3) tierra3.rotation.y += 0.01; // Rotar sobre el eje Y
                if (luna3) luna3.rotation.y += 0.02;     
                if (sol3) sol3.rotation.y += 0.01;
            }

            if (tierra4 || luna4 || sol4) // Si el objeto existe, hazlo girar
            {
                if (tierra4) tierra4.rotation.y += 0.01; // Rotar sobre el eje Y
                if (luna4) luna4.rotation.y += 0.02;     
                if (sol4) sol4.rotation.y += 0.01;
            }

            if (tierra5 || luna5 || sol5) // Si el objeto existe, hazlo girar
            {
                if (tierra5) tierra5.rotation.y += 0.01; // Rotar sobre el eje Y
                if (luna5) luna5.rotation.y += 0.02;     
                if (sol5) sol5.rotation.y += 0.01;
            }

            

            renderer.render(scene, camera);
        });
    };
    start();
});
