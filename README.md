# Gestor de Tareas Pro

Bienvenido a **Gestor de Tareas Pro**, una aplicación de lista de tareas de alto rendimiento diseñada para llevar tu flujo de trabajo diario al siguiente nivel. Esta aplicación no es un gestor de tareas común; está impulsado por estructuras de datos avanzadas (un **Árbol AVL** y un **Montículo Binario**) para ofrecer una organización y visualización de tareas excepcionalmente rápida y eficiente.

## ✨ Características Principales

- **Creación y Gestión de Tareas:** Añade tareas fácilmente especificando descripción, prioridad (Alta, Media, Baja) y fecha de vencimiento.
- **Edición en Línea:** Modifica la prioridad y la fecha de vencimiento de cualquier tarea directamente desde la lista, y observa cómo la visualización se actualiza en tiempo real.
- **Tarea de Mayor Prioridad Siempre a la Vista:** La aplicación utiliza un **Montículo Binario (Binary Heap)** para identificar y mostrar instantáneamente la tarea más urgente, permitiéndote enfocarte en lo que realmente importa.
- **Visualización Interactiva del Árbol AVL:** Observa cómo tus tareas se organizan en un árbol AVL auto-balanceable. Esta visualización no es estática; puedes:
    - **Hacer zoom** con la rueda del ratón para acercar o alejar la vista.
    - **Arrastrar (pan)** el lienzo con el ratón para navegar por árboles grandes y complejos.
- **Persistencia de Datos:** Las tareas se guardan automáticamente en el `localStorage` de tu navegador. Puedes cerrar la pestaña o reiniciar el navegador y tus tareas seguirán ahí.
- **Interfaz Limpia y Moderna:** Una interfaz de usuario cuidadosamente diseñada, sin dependencias de frameworks CSS, para una experiencia fluida y agradable.

---

## 🔬 Análisis Detallado: El Árbol AVL

El corazón de la visualización de esta aplicación es un Árbol AVL. A diferencia de un árbol de búsqueda binario simple, un AVL garantiza que el árbol permanezca **balanceado**, lo que asegura una eficiencia máxima en todas sus operaciones.

### ¿Qué es un Árbol AVL?

Es un tipo de árbol de búsqueda binario (BST) auto-balanceable. Su propiedad fundamental es que para cualquier nodo, las alturas de sus dos subárboles hijos pueden diferir como máximo en uno. Esta diferencia se conoce como el **Factor de Equilibrio**. Si en algún momento una inserción o eliminación provoca que este factor sea mayor que 1 o menor que -1, el árbol realiza operaciones llamadas **rotaciones** para restaurar el equilibrio.

Esta garantía de equilibrio es lo que permite que las operaciones clave mantengan una complejidad temporal logarítmica.

### Métodos Principales y su Complejidad

#### 1. Inserción (`insert(task)`)

- **Lógica:**
    1.  La inserción comienza como en un BST estándar, buscando la ubicación correcta para el nuevo nodo según su `id`.
    2.  Una vez insertado, el algoritmo asciende desde el nuevo nodo hacia la raíz, actualizando la altura de cada nodo ancestro.
    3.  En cada ancestro, calcula el Factor de Equilibrio.
    4.  Si se encuentra un nodo desbalanceado, se aplica una de las cuatro posibles **rotaciones** (Izquierda-Izquierda, Derecha-Derecha, Izquierda-Derecha, Derecha-Izquierda) para restaurar el equilibrio del árbol.
- **Complejidad Temporal:** **O(log n)**. Gracias al auto-balanceo, la altura del árbol se mantiene logarítmica con respecto al número de nodos (`n`), por lo que la búsqueda del lugar de inserción y las rotaciones posteriores se realizan en tiempo logarítmico.

#### 2. Eliminación (`delete(id)`)

- **Lógica:**
    1.  La eliminación también comienza como en un BST estándar para encontrar y eliminar el nodo.
    2.  Al igual que en la inserción, el algoritmo asciende desde el punto de eliminación hacia la raíz, actualizando alturas y revisando el Factor de Equilibrio.
    3.  Si un nodo se desbalancea, se aplican las rotaciones necesarias para corregirlo. Este proceso puede requerir múltiples rotaciones a medida que se asciende por el árbol.
- **Complejidad Temporal:** **O(log n)**. Por las mismas razones que la inserción, la estructura balanceada del árbol garantiza un rendimiento logarítmico.

#### 3. Búsqueda (`find(id)`)

- **Lógica:** Este es el proceso de búsqueda estándar de un BST. Se compara el `id` buscado con el `id` del nodo actual. Si es menor, se busca en el subárbol izquierdo; si es mayor, en el derecho. El proceso se repite hasta encontrar el nodo o llegar a una hoja nula.
- **Complejidad Temporal:** **O(log n)**. La eficiencia de la búsqueda es el principal beneficio de mantener el árbol balanceado.

#### 4. Operaciones Auxiliares

- **`_getBalance(node)`:** Calcula el Factor de Equilibrio de un nodo restando la altura del subárbol derecho de la del izquierdo. Su complejidad es **O(1)**.
- **`_rightRotate(node)` y `_leftRotate(node)`:** Realizan las rotaciones. Estas operaciones son atómicas y solo involucran la reasignación de unos pocos punteros entre los nodos. Su complejidad es **O(1)**.

---

## 🚀 Cómo Ejecutar el Proyecto

Sigue estos sencillos pasos para poner en marcha la aplicación en tu máquina local.

### Prerrequisitos

- **Node.js:** Asegúrate de tener instalado Node.js (versión 18 o superior recomendada).
- **npm:** El gestor de paquetes de Node, que se instala automáticamente con Node.js.

### Pasos de Instalación y Ejecución

1.  **Clona el Repositorio (si aplica):**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_DEL_DIRECTORIO>
    ```

2.  **Instala las Dependencias:**
    Abre una terminal en la raíz del proyecto y ejecuta el siguiente comando para instalar todas las librerías necesarias.
    ```bash
    npm install
    ```

3.  **Inicia el Servidor de Desarrollo:**
    Este comando iniciará la aplicación en modo de desarrollo con recarga en caliente.
    ```bash
    npm run dev
    ```
    Una vez ejecutado, verás un mensaje en la terminal con la URL local para abrir en tu navegador (generalmente `http://localhost:5173`).

4.  **Compila para Producción (Opcional):**
    Si deseas crear una versión optimizada de la aplicación para desplegarla, ejecuta:
    ```bash
    npm run build
    ```
    Los archivos compilados se generarán en una carpeta llamada `dist`.
