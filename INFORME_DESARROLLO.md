# Informe de Desarrollo: Gestor de Tareas Pro

**Fecha:** 05 de diciembre de 2025
**Autor:** Asistente de IA (Gemini)
**Proyecto:** Gestor de Tareas Pro

---

## Introducción

El propósito de este documento es detallar el proceso de concepción, desarrollo e implementación de la aplicación "Gestor de Tareas Pro". El objetivo principal del proyecto fue crear un gestor de tareas de alto rendimiento, diferenciado por el uso de estructuras de datos avanzadas para optimizar la manipulación y priorización de tareas. La aplicación fue construida utilizando **React** y **Vite**, con un enfoque en una interfaz de usuario interactiva y una lógica de backend robusta implementada completamente en el lado del cliente.

---

## 1. Proceso de Creación Paso a Paso

El desarrollo de la aplicación siguió un proceso iterativo, adaptándose a los requisitos funcionales y de experiencia de usuario.

### a. Configuración Inicial y Estructura del Proyecto
El proyecto se inició con **Vite** y una plantilla de **React**. La estructura inicial se organizó de forma modular, separando la lógica de la aplicación (hooks), los componentes de la interfaz de usuario (components) y los algoritmos de las estructuras de datos (lib).

### b. Implementación del Núcleo Lógico (`useTaskManager`)
El cerebro de la aplicación es el hook personalizado `useTaskManager`. Este hook se diseñó para orquestar dos estructuras de datos clave:
1.  **Montículo Binario (Binary Heap):** Para gestionar las tareas por prioridad. Su principal ventaja es que permite acceder a la tarea de máxima prioridad en tiempo **O(1)**.
2.  **Árbol AVL:** Para almacenar las tareas y permitir búsquedas, inserciones y eliminaciones rápidas basadas en un `id` único. Su naturaleza auto-balanceable garantiza una complejidad de **O(log n)** para estas operaciones.

### c. Desarrollo de Componentes de la Interfaz (UI)
Se crearon componentes reutilizables en React para cada parte de la interfaz:
- `TaskForm`: Formulario para la creación de nuevas tareas.
- `TaskList`: Lista que muestra todas las tareas y permite su edición y finalización.
- `TopTaskCard`: Tarjeta que destaca la tarea de mayor prioridad obtenida del montículo.
- `AVLVisualizer`: Componente interactivo para la visualización del árbol AVL.

### d. Transición de Estilos: De TailwindCSS a CSS Puro
Inicialmente, se intentó configurar TailwindCSS. Sin embargo, surgieron problemas de configuración con PostCSS. Para resolverlo y tener un control más granular y performante, se tomó la decisión de eliminar todas las dependencias de Tailwind y reescribir los estilos utilizando **CSS puro y modular**, con un archivo `.css` por cada componente.

### e. Implementación de Funcionalidades Avanzadas
- **Edición en Línea:** Se añadió la capacidad de editar la prioridad y fecha de vencimiento de las tareas. Esta acción desencadena una reconstrucción completa del montículo y del árbol AVL para reflejar los cambios de prioridad en tiempo real.
- **Visualizador Interactivo:** El componente `AVLVisualizer` se mejoró para permitir el **arrastre (pan)** y el **zoom** con el ratón, transformando un lienzo estático en una herramienta de exploración de datos dinámica.
- **Persistencia de Datos:** Se implementó el guardado de tareas en el `localStorage` del navegador. Se corrigió un error crítico (condición de carrera) que borraba los datos al recargar la página, asegurando que el estado de la aplicación persista entre sesiones.

### f. Internacionalización y Refinamiento
Finalmente, toda la interfaz de usuario fue traducida al español. Además, se realizaron múltiples ajustes finos en la visualización del árbol (tamaño de nodos, grosor de líneas, tamaño de fuente) para optimizar la legibilidad y la estética.

---

## 2. Algoritmos Utilizados para el Árbol AVL

El Árbol AVL es un pilar fundamental de la aplicación. A continuación, se detalla su funcionamiento.

### a. Conceptos Fundamentales
- **Factor de Equilibrio (Balance Factor):** Es la diferencia entre la altura del subárbol izquierdo y la altura del subárbol derecho de un nodo. En un árbol AVL, este factor solo puede ser **-1, 0 o 1**.
- **Rotaciones:** Son operaciones de reestructuración que se aplican cuando una inserción o eliminación provoca que un nodo tenga un Factor de Equilibrio de -2 o 2. Su objetivo es restaurar el equilibrio del árbol.

### b. Algoritmo de Inserción (`insert`)
1.  **Inserción Estándar:** El nuevo nodo se inserta como en un Árbol de Búsqueda Binario (BST) normal.
2.  **Actualización de Alturas:** Se actualiza la altura de todos los nodos ancestros del nodo recién insertado.
3.  **Verificación de Equilibrio:** Para cada ancestro, se calcula su Factor de Equilibrio.
4.  **Rebalanceo (Rotaciones):** Si se encuentra un nodo desbalanceado, se aplica una de las cuatro rotaciones posibles:
    - **Rotación Simple a la Derecha (Caso Izquierda-Izquierda):** Cuando el nuevo nodo se inserta en el subárbol izquierdo del hijo izquierdo del nodo desbalanceado.
    - **Rotación Simple a la Izquierda (Caso Derecha-Derecha):** Cuando el nuevo nodo se inserta en el subárbol derecho del hijo derecho.
    - **Rotación Doble Izquierda-Derecha:** Cuando el nuevo nodo se inserta en el subárbol derecho del hijo izquierdo.
    - **Rotación Doble Derecha-Izquierda:** Cuando el nuevo nodo se inserta en el subárbol izquierdo del hijo derecho.

### c. Algoritmo de Eliminación (`delete`)
1.  **Eliminación Estándar:** El nodo se elimina como en un BST normal.
2.  **Actualización y Rebalanceo:** Al igual que en la inserción, se asciende por el árbol desde el punto de la eliminación, actualizando alturas y aplicando las rotaciones necesarias para corregir cualquier desequilibrio que haya surgido.

---

## 3. Resultado

El resultado final es una **Single Page Application (SPA)** altamente funcional y performante. La aplicación permite una gestión de tareas fluida, donde la priorización no es solo un dato, sino una propiedad estructural que se puede visualizar y entender. La interfaz es limpia, intuitiva y completamente interactiva, especialmente el lienzo de visualización del árbol AVL, que ofrece una herramienta potente para observar cómo se organizan los datos internamente.

---

## 4. Conclusiones

1.  **Elección de Estructuras de Datos:** El uso de un Montículo Binario y un Árbol AVL fue un éxito rotundo. Demostró cómo la elección correcta de algoritmos puede ofrecer mejoras significativas en el rendimiento y habilitar características únicas (como la visualización en tiempo real) que no serían factibles con estructuras de datos más simples como arrays.

2.  **Complejidad vs. Beneficio:** Aunque la implementación de un Árbol AVL es considerablemente más compleja que la de un array, el beneficio de tener operaciones garantizadas en **O(log n)** es inmenso para la escalabilidad de la aplicación.

3.  **Desarrollo Iterativo:** El proceso de desarrollo demostró la importancia de la iteración. Funcionalidades como el pan/zoom y la corrección del bug de persistencia fueron cruciales para transformar un prototipo funcional en una aplicación robusta y usable.

4.  **Potencial a Futuro:** La arquitectura actual sienta las bases para futuras mejoras, como la implementación de un backend para la sincronización de usuarios, filtros de búsqueda más avanzados o la transición a `IndexedDB` para manejar volúmenes de datos aún mayores.
