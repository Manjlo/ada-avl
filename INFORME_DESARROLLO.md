# Informe Técnico del Proyecto
## Implementación de Colas de Prioridad con Montículos y Árboles AVL para Indexación

**Fecha:** 05 de diciembre de 2025
**Grupo:** (Nombres de los 3 estudiantes)
**Lenguaje:** JavaScript (con React y Vite)

---

## 1. Introducción y Objetivos de Aprendizaje

Este informe detalla el desarrollo de un sistema avanzado de gestión de tareas cuyo núcleo se basa en la implementación de dos estructuras de datos eficientes: **Montículos Binarios (Heaps)** para la gestión de una cola de prioridad y **Árboles AVL** para la indexación y búsqueda rápida de elementos.

El objetivo principal fue aplicar conocimientos teóricos de estructuras de datos en un proyecto práctico y funcional con una interfaz gráfica de usuario (GUI).

### Objetivos de Aprendizaje Alcanzados:
-   **Comprensión de Montículos:** Se logró un entendimiento práctico del funcionamiento de los montículos y su aplicación directa en la gestión de colas de prioridad para obtener siempre el elemento más urgente.
-   **Utilidad de los Árboles AVL:** Se exploró y demostró la eficacia de los árboles AVL en sistemas que requieren búsquedas, inserciones y eliminaciones con un rendimiento garantizado de O(log n).
-   **Implementación de Estructuras de Datos Avanzadas:** Se desarrollaron desde cero las clases para el `BinaryHeap` y el `AVLTree`, fortaleciendo las habilidades de implementación y optimización.
-   **Fortalecimiento del Pensamiento Algorítmico:** El diseño del hook `useTaskManager`, que orquesta la interacción entre ambas estructuras de datos, fue un ejercicio clave en pensamiento algorítmico y programación eficiente.

---

## 2. Proceso de Desarrollo y Arquitectura

El sistema se construyó como una Single Page Application (SPA) utilizando React. La arquitectura se dividió en tres capas principales:

1.  **Capa de Datos (`/lib`):** Contiene las implementaciones puras de `BinaryHeap` y `AVLTree`. Esta capa es agnóstica a la interfaz y contiene la lógica algorítmica central.
2.  **Capa de Lógica de Estado (`/hooks`):** El hook `useTaskManager` actúa como un controlador que conecta las estructuras de datos con el estado de la aplicación en React. Sincroniza las inserciones, eliminaciones y actualizaciones en ambas estructuras y gestiona la persistencia de datos en `localStorage`.
3.  **Capa de Presentación (`/components`):** Incluye todos los componentes de React responsables de renderizar la interfaz de usuario, capturar las interacciones del usuario y visualizar el estado actual de las estructuras de datos.

El desarrollo fue un proceso iterativo que incluyó la configuración inicial del proyecto, la implementación de las estructuras de datos, la creación de la interfaz, la adición de funcionalidades interactivas (edición, pan/zoom) y la corrección de bugs, como el problema de persistencia de datos al recargar la página.

---

## 3. Algoritmos Implementados

### a. Montículo Binario (Max-Heap)
-   **Función:** Gestionar las tareas según su prioridad.
-   **Operaciones Clave:**
    -   `push(task)`: Inserta una nueva tarea y la "burbujea" hacia arriba (`bubbleUp`) para mantener la propiedad del montículo. Complejidad: **O(log n)**.
    -   `pop()`: Extrae la tarea de mayor prioridad (la raíz), la reemplaza con el último elemento y lo "hunde" hacia abajo (`sinkDown`) para restaurar el orden. Complejidad: **O(log n)**.
    -   `peek()`: Devuelve el elemento de mayor prioridad sin extraerlo. Complejidad: **O(1)**.

### b. Árbol AVL
-   **Función:** Indexar tareas por un `id` único para búsquedas eficientes.
-   **Operaciones Clave:**
    -   `insert(task)`: Inserta un nodo y realiza rotaciones (simples o dobles) si la inserción provoca un desequilibrio. Complejidad: **O(log n)**.
    -   `delete(id)`: Elimina un nodo y realiza las rotaciones necesarias para rebalancear el árbol a lo largo del camino hacia la raíz. Complejidad: **O(log n)**.
    -   `find(id)`: Busca un nodo siguiendo la lógica de un árbol de búsqueda binario. Complejidad: **O(log n)**.

---

## 4. Resultado y Conclusiones

El proyecto culminó con éxito en una aplicación funcional que cumple con todos los requerimientos técnicos especificados. El sistema no solo gestiona tareas, sino que también sirve como una herramienta educativa que visualiza el comportamiento de un árbol AVL en tiempo real.

La decisión de utilizar estas estructuras de datos avanzadas, en lugar de simples arrays, demostró ser fundamental para lograr un rendimiento óptimo y habilitar funcionalidades complejas como la obtención instantánea de la tarea más prioritaria y la indexación eficiente. El proyecto valida la importancia de la teoría algorítmica en la construcción de software robusto y escalable.