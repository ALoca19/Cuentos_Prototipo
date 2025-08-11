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
            imageTargetSrc: '../target/Figuras.mind',
            maxTrack: 1,
        });
        const { renderer, scene, camera } = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);

        const Figu01 = await loadGLTF('../models/Figuras/Figuras00.glb');
        Figu01.scene.scale.set(0.25, 0.25, 0.25);
        Figu01.scene.position.set(0, 0, 0);

        const Figu02 = await loadGLTF('../models/Figuras/Figuras01.glb');
        Figu02.scene.scale.set(0.25, 0.25, 0.25);
        Figu02.scene.position.set(0, 0, 0);

        const Figu03 = await loadGLTF('../models/Figuras/Figuras02.glb');
        Figu03.scene.scale.set(0.25, 0.25, 0.25);
        Figu03.scene.position.set(0, 0, 0);

        const Figu04 = await loadGLTF('../models/Figuras/Figuras03.glb');
        Figu04.scene.scale.set(0.25, 0.25, 0.25);
        Figu04.scene.position.set(0, 0, 0);

        const Figu05 = await loadGLTF('../models/Figuras/Figuras04.glb');
        Figu05.scene.scale.set(0.25, 0.25, 0.25);
        Figu05.scene.position.set(0, 0, 0);

        const Figu06 = await loadGLTF('../models/Figuras/Figuras05.glb');
        Figu06.scene.scale.set(0.25, 0.25, 0.25);
        Figu06.scene.position.set(0, 0, 0);

        const Figu07 = await loadGLTF('../models/Figuras/Figuras06.glb');
        Figu07.scene.scale.set(0.25, 0.25, 0.25);
        Figu07.scene.position.set(0, 0, 0);

        const Figu08 = await loadGLTF('../models/Figuras/Figuras07.glb');
        Figu08.scene.scale.set(0.25, 0.25, 0.25);
        Figu08.scene.position.set(0, 0, 0);

        const Fig1Anchor = mindarThree.addAnchor(0);
        Fig1Anchor.group.add(Figu01.scene);

        const Fig2Anchor = mindarThree.addAnchor(1);
        Fig2Anchor.group.add(Figu02.scene);

        const Fig3Anchor = mindarThree.addAnchor(2);
        Fig3Anchor.group.add(Figu03.scene);

        const Fig4Anchor = mindarThree.addAnchor(3);
        Fig4Anchor.group.add(Figu04.scene);

        const Fig5Anchor = mindarThree.addAnchor(4);
        Fig5Anchor.group.add(Figu05.scene);

        const Fig6Anchor = mindarThree.addAnchor(5);
        Fig6Anchor.group.add(Figu06.scene);

        const Fig7Anchor = mindarThree.addAnchor(6);
        Fig7Anchor.group.add(Figu07.scene);

        const Fig8Anchor = mindarThree.addAnchor(7);
        Fig8Anchor.group.add(Figu08.scene);


        // Cargar el archivo de sonido
        const audio = new Audio('../sound/Figuras/introMagia.mp3');
        const audioTornado = new Audio('../sound/Figuras/Tornado.mp3');
        const audioMagia = new Audio('../sound/Figuras/magia.mp3');
        const audioAbeja = new Audio('../sound/Figuras/abeja.mp3');

        // Reproducir el sonido cuando se detecte el ancla de Figu01
        Fig1Anchor.onTargetFound = () => {
            console.log("Figu01 detectado");
            audio.play(); // Reproducir el sonido
        };

        Fig2Anchor.onTargetFound = () => {
            console.log("Figu02 detectado");
            audioTornado.play(); // Reproducir el sonido
        };

        Fig3Anchor.onTargetFound = () => {
            console.log("Figu03 detectado");
            audioMagia.play(); // Reproducir el sonido
        };

        Fig4Anchor.onTargetFound = () => {
            console.log("Figu04 detectado");
            audioMagia.play(); // Reproducir el sonido
        };

        Fig5Anchor.onTargetFound = () => {
            console.log("Figu05 detectado");
            audioMagia.play(); // Reproducir el sonido
        };

        Fig6Anchor.onTargetFound = () => {
            console.log("Figu06 detectado");
            audioMagia.play(); // Reproducir el sonido
        };

        Fig7Anchor.onTargetFound = () => {
            console.log("Figu07 detectado");
            audioAbeja.play(); // Reproducir el sonido
        }

        Fig8Anchor.onTargetFound = () => {
            console.log("Figu08 detectado");
            audio.play(); // Reproducir el sonido
        }

        // Detener el sonido cuando se pierda el target
        Fig1Anchor.onTargetLost = () => {
            console.log("Figu01 perdido");
            audio.pause(); // Pausar el sonido
            audio.currentTime = 0; // Reiniciar el sonido
        };

        Fig2Anchor.onTargetLost = () => {
            console.log("Figu02 perdido");
            audioTornado.pause(); // Pausar el sonido
            audioTornado.currentTime = 0; // Reiniciar el sonido
        };

        Fig3Anchor.onTargetLost = () => {
            console.log("Figu03 perdido");
            audioMagia.pause(); // Pausar el sonido
            audioMagia.currentTime = 0; // Reiniciar el sonido
        };

        Fig4Anchor.onTargetLost = () => {
            console.log("Figu04 perdido");
            audioMagia.pause(); // Pausar el sonido
            audioMagia.currentTime = 0; // Reiniciar el sonido
        };

        Fig5Anchor.onTargetLost = () => {
            console.log("Figu05 perdido");
            audioMagia.pause(); // Pausar el sonido
            audioMagia.currentTime = 0; // Reiniciar el sonido
        };

        Fig6Anchor.onTargetLost = () => {
            console.log("Figu06 perdido");
            audioMagia.pause(); // Pausar el sonido
            audioMagia.currentTime = 0; // Reiniciar el sonido
        };

        Fig7Anchor.onTargetLost = () => {
            console.log("Figu07 perdido");
            audioAbeja.pause(); // Pausar el sonido
            audioAbeja.currentTime = 0; // Reiniciar el sonido
        };

        Fig8Anchor.onTargetLost = () => {
            console.log("Figu08 perdido");
            audio.pause(); // Pausar el sonido
            audio.currentTime = 0; // Reiniciar el sonido
        };

        //identificacion del tornado en la Figu02
        const cylinder = Figu02.scene.getObjectByName("Cylinder133_1");


        // Configuración del Raycaster para Figu03
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        //02-Triangulo 03-Cuadrado 04-Hexagono 05-Pentagono 
        let trianguloMesh = Figu03.scene.getObjectByName("Triangulo"); // Nombre del objeto "Triangulo"
        let cuadraroMesh = Figu04.scene.getObjectByName("Cuadrado"); // Nombre del objeto "Triangulo"
        let HexaMesh = Figu05.scene.getObjectByName("Hexagono"); // Nombre del objeto "Triangulo"
        let PentaMesh = Figu06.scene.getObjectByName("Pentagono"); // Nombre del objeto "Triangulo"

        if (trianguloMesh || cuadraroMesh || HexaMesh || PentaMesh) {
            trianguloMesh.userData.clicked = false; // Para controlar si ya ha sido clickeado
            cuadraroMesh.userData.clicked = false; // Para controlar si ya ha sido clickeado
            HexaMesh.userData.clicked = false; // Para controlar si ya ha sido clickeado
            PentaMesh.userData.clicked = false; // Para controlar si ya ha sido clickeado
        }

        // Evento de clic
        window.addEventListener('click', (event) => {
            // Actualizar la posición del mouse para el raycaster
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            // Lanzar un rayo desde la cámara hacia la posición del mouse
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(trianguloMesh);
            const intersects2 = raycaster.intersectObject(cuadraroMesh);
            const intersects3 = raycaster.intersectObject(HexaMesh);
            const intersects4 = raycaster.intersectObject(PentaMesh);

            if (intersects.length > 0 && !trianguloMesh.userData.clicked) {
                trianguloMesh.userData.clicked = true;

                // Animación de rotación y desaparición
                trianguloMesh.rotation.z += Math.PI; // Gira 180 grados
                setTimeout(() => {
                    trianguloMesh.visible = false; // Desaparece después de girar
                }, 500); // Ajusta el tiempo según prefieras
            }
            else if (intersects2.length > 0 && !cuadraroMesh.userData.clicked) {
                cuadraroMesh.userData.clicked = true;

                // Animación de rotación y desaparición
                cuadraroMesh.rotation.z += Math.PI; // Gira 180 grados
                setTimeout(() => {
                    cuadraroMesh.visible = false; // Desaparece después de girar
                }, 500); // Ajusta el tiempo según prefieras
            }
            else if (intersects3.length > 0 && !HexaMesh.userData.clicked) {
                HexaMesh.userData.clicked = true;

                // Animación de rotación y desaparición
                HexaMesh.rotation.z += Math.PI; // Gira 180 grados
                setTimeout(() => {
                    HexaMesh.visible = false; // Desaparece después de girar
                }, 500); // Ajusta el tiempo según prefieras
            }
            else if (intersects4.length > 0 && !PentaMesh.userData.clicked) {
                PentaMesh.userData.clicked = true;

                // Animación de rotación y desaparición
                PentaMesh.rotation.z += Math.PI; // Gira 180 grados
                setTimeout(() => {
                    PentaMesh.visible = false; // Desaparece después de girar
                }, 500); // Ajusta el tiempo según prefieras
            }
            
        });

////////////////////////////////
//Para meter rotacion a las figuras con el mouse
// Crear un array con todas las figuras
const figuras = [Figu01, Figu02, Figu03, Figu04, Figu05, Figu06, Figu07, Figu08];

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
            
            if (cylinder) // Si el objeto Cylinder133 existe, hazlo girar
            {
                cylinder.rotation.z += 0.01; // Ajusta la velocidad de rotación según lo necesario
            }

            renderer.render(scene, camera);
        });
    };


    start();
});
