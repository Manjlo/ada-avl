# Proyecto: Implementación de Colas de Prioridad con Montículos y Árboles AVL para Indexación

**Fecha:** 05 de diciembre de 2025
**Grupo:** (Nombres de los 3 estudiantes)
**Repositorio:** (Añadir enlace al repositorio de GitHub/GitLab aquí)

---

## Descripción del Proyecto

En este proyecto, se ha diseñado y desarrollado un sistema que integra **montículos (heaps)** para gestionar colas de prioridad y **árboles AVL** para indexar una lista de objetos de manera eficiente. El objetivo es una aplicación que permita la inserción, eliminación y recuperación óptima de elementos mediante estas dos estructuras de datos avanzadas, cumpliendo con los objetivos de aprendizaje de estructuras de datos avanzadas y pensamiento algorítmico.

## Caso de Uso: Gestión de Tareas en un Sistema de Productividad

La aplicación implementada es un **sistema para gestionar tareas pendientes**. Permite a los usuarios agregar, actualizar y completar tareas según su importancia y categoría.

-   **Tareas:** Cada tarea tiene un identificador único, una descripción, una prioridad (baja, media, alta) y una fecha de vencimiento.
-   **Estructuras de Datos Utilizadas:**
    -   Un **Montículo Binario (Max-Heap)** gestiona las tareas según su prioridad, permitiendo acceder rápidamente a la tarea más urgente (O(1)).
    -   Un **Árbol AVL** indexa las tareas por su identificador único, permitiendo búsquedas, inserciones y eliminaciones eficientes (O(log n)).

---

## Requerimientos Técnicos Cumplidos

1.  **Cola de Prioridad con Montículos:**
    -   Se implementó un **montículo binario (max-heap)** que administra las tareas según su prioridad.
    -   Se implementaron operaciones de inserción (`push`) y extracción (`pop`) del elemento con mayor prioridad.
    -   La estructura del montículo se mantiene íntegra y ordenada tras cada operación.

2.  **Indexación con Árbol AVL:**
    -   Se construyó un árbol AVL que almacena y ordena las tareas por un identificador único.
    -   Se implementaron operaciones de **inserción, búsqueda y eliminación** con reequilibrio automático del árbol mediante rotaciones.
    -   Se garantiza una búsqueda eficiente de **O(log n)** para cualquier tarea en la colección.

3.  **Operaciones Fundamentales:**
    -   **Agregar Tarea:** Se inserta en el montículo y en el árbol AVL simultáneamente.
    -   **Eliminar Tarea:** Al completar una tarea, se elimina del montículo y del árbol AVL.
    -   **Buscar Tarea:** Se utiliza el árbol AVL para encontrar tareas por su ID (aunque no hay una UI explícita para esto, la lógica está implementada).
    -   **Obtener Tarea más Prioritaria:** Se extrae la tarea con mayor prioridad del montículo.

4.  **Casos de Prueba (Verificables en la GUI):**
    -   **Prueba de Inserción:** Se pueden ingresar múltiples tareas con diferentes prioridades y verificar que la "Tarea de Mayor Prioridad" siempre es la correcta.
    -   **Prueba de Eliminación:** Al completar o eliminar la tarea de mayor prioridad, la siguiente tarea más urgente ocupa su lugar, manteniendo la estructura correcta.
    -   **Prueba de Indexación:** La visualización del árbol AVL demuestra la estructura de indexación. La edición y eliminación de tareas específicas actualiza el árbol correctamente.
    -   **Prueba de Equilibrio:** La visualización del árbol AVL muestra gráficamente cómo el árbol se reestructura y mantiene su equilibrio después de cada inserción o eliminación.

---

## 🚀 Cómo Ejecutar el Proyecto

Sigue estos sencillos pasos para poner en marcha la aplicación en tu máquina local.

### Prerrequisitos

-   **Node.js:** Asegúrate de tener instalado Node.js (versión 18 o superior recomendada).
-   **npm:** El gestor de paquetes de Node, que se instala automáticamente con Node.js.

### Pasos de Instalación y Ejecución

1.  **Clona el Repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_DEL_DIRECTORIO>
    ```

2.  **Instala las Dependencias:**
    Abre una terminal en la raíz del proyecto y ejecuta el siguiente comando.
    ```bash
    npm install
    ```

3.  **Inicia el Servidor de Desarrollo:**
    Este comando iniciará la aplicación en modo de desarrollo.
    ```bash
    npm run dev
    ```
    Abre la URL local que aparece en la terminal (generalmente `http://localhost:5173`) en tu navegador.