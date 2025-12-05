# Documentación Técnica del Árbol AVL

## 1. Introducción

Este documento detalla la implementación del Árbol AVL (Adelson-Velsky and Landis) utilizado en el Gestor de Tareas. El propósito principal de esta estructura de datos en el proyecto es proporcionar un almacenamiento y acceso ultra-rápido a las tareas basado en su `ID`.

Mientras que un Montículo Binario (Binary Heap) se encarga de gestionar la cola de prioridades (es decir, qué tarea es la más urgente), el Árbol AVL se especializa en la búsqueda, inserción y eliminación de tareas en tiempo logarítmico, **O(log n)**. Esto es crucial para operaciones como la edición o eliminación de una tarea específica de la lista, donde necesitamos encontrarla rápidamente sin tener que recorrer toda la colección de tareas.

La característica que define a un Árbol AVL es su capacidad de **auto-balanceo**. Después de cada inserción o eliminación, el árbol comprueba si se ha "desequilibrado". Si es así, realiza operaciones de "rotación" para restaurar el equilibrio, garantizando así que la altura del árbol se mantenga lo más pequeña posible y que las operaciones sigan siendo eficientes.

---

## 2. El Nodo (`Node`)

Todo árbol está compuesto por nodos. En nuestra implementación, cada nodo representa una tarea.

```javascript
class Node {
  constructor(task) {
    this.task = task;       // El objeto completo de la tarea
    this.key = task.id;     // El ID de la tarea, usado como clave de ordenamiento
    this.height = 1;        // La altura inicial de un nuevo nodo es siempre 1
    this.left = null;       // Puntero al hijo izquierdo
    this.right = null;      // Puntero al hijo derecho
  }
}
```

- **`key`**: Es el `id` de la tarea. El árbol se ordena y se equilibra utilizando esta clave numérica.
- **`height`**: La altura de un nodo es la longitud del camino más largo desde ese nodo hasta una hoja. Este valor es fundamental para comprobar el equilibrio del árbol.

---

## 3. Métodos Fundamentales de Balanceo

Estos métodos auxiliares son el corazón del mecanismo de auto-balanceo del árbol.

### `_height(node)`

Calcula la altura de un nodo de forma segura.

```javascript
_height(node) {
  return node ? node.height : 0;
}
```

- **Línea por línea:**
  - `return node ? node.height : 0;`: Si el `node` existe, devuelve su propiedad `height`. Si el `node` es `null` (lo que significa que estamos más allá de una hoja), devuelve `0`. Esto evita errores y simplifica los cálculos de balanceo.

### `_updateHeight(node)`

Recalcula y actualiza la altura de un nodo basándose en la altura de sus hijos.

```javascript
_updateHeight(node) {
  node.height = 1 + Math.max(this._height(node.left), this._height(node.right));
}
```

- **Línea por línea:**
  - `Math.max(this._height(node.left), this._height(node.right))`: Encuentra cuál de los dos subárboles (izquierdo o derecho) es más alto.
  - `1 + ...`: La altura del nodo actual (`node`) es `1` (por sí mismo) más la altura de su subárbol más alto.

### `_getBalance(node)`

Calcula el "factor de equilibrio" de un nodo, que es la diferencia de altura entre su subárbol izquierdo y su subárbol derecho.

```javascript
_getBalance(node) {
  return node ? this._height(node.left) - this._height(node.right) : 0;
}
```

- **Línea por línea:**
  - `this._height(node.left) - this._height(node.right)`: Resta la altura del subárbol derecho de la del izquierdo.
  - El resultado de esta operación nos dice el estado del nodo:
    - **`Factor > 1`**: El subárbol izquierdo es más alto. El árbol está "pesado" a la izquierda.
    - **`Factor < -1`**: El subárbol derecho es más alto. El árbol está "pesado" a la derecha.
    - **`Factor` entre `-1` y `1`**: El nodo está equilibrado.

Un factor de equilibrio mayor que `1` o menor que `-1` indica un desequilibrio que debe ser corregido mediante rotaciones.

---

## 4. Rotaciones: La Magia del Auto-Balanceo

Las rotaciones son las operaciones que reestructuran el árbol para restaurar el equilibrio. Hay dos tipos básicos de rotaciones (izquierda y derecha), que se pueden combinar para resolver cuatro casos de desequilibrio.

### `_rightRotate(y)` - Rotación a la Derecha

Se utiliza para corregir un desequilibrio "Izquierda-Izquierda" (Left-Left).

```javascript
//      y           x
//     / \
//    x   T3  ->  T1  y
//   / \
//  T1  T2          T2  T3

_rightRotate(y) {
  const x = y.left;
  const T2 = x.right;

  // Realizar rotación
  x.right = y;
  y.left = T2;

  // Actualizar alturas (el orden es importante)
  this._updateHeight(y);
  this._updateHeight(x);

  return x; // La nueva raíz del subárbol
}
```

- **Línea por línea:**
  - `const x = y.left;`: `x` es el hijo izquierdo de `y` (el nodo desequilibrado). Se convertirá en la nueva raíz.
  - `const T2 = x.right;`: `T2` es el subárbol derecho de `x`. Este subárbol necesita ser reubicado.
  - `x.right = y;`: `y` se convierte en el hijo derecho de `x`.
  - `y.left = T2;`: El subárbol `T2`, que estaba a la derecha de `x`, ahora se convierte en el hijo izquierdo de `y`.
  - `_updateHeight(y); _updateHeight(x);`: Se actualizan las alturas de los nodos afectados. Es crucial actualizar la altura del antiguo nodo raíz (`y`) antes que la del nuevo (`x`).
  - `return x;`: Se devuelve `x` como la nueva raíz de esta sección del árbol.

### `_leftRotate(x)` - Rotación a la Izquierda

Se utiliza para corregir un desequilibrio "Derecha-Derecha" (Right-Right).

```javascript
//    x             y
//   / \
//  T1  y   ->    x   T3
//     / \
//    T2  T3    T1  T2

_leftRotate(x) {
  const y = x.right;
  const T2 = y.left;

  // Realizar rotación
  y.left = x;
  x.right = T2;

  // Actualizar alturas
  this._updateHeight(x);
  this._updateHeight(y);

  return y; // La nueva raíz del subárbol
}
```

- **Línea por línea:**
  - Esta operación es la imagen especular de la rotación a la derecha. `y` (el hijo derecho) se convierte en la nueva raíz, y `x` se convierte en su hijo izquierdo.

---

## 5. Método de Inserción (`insert`)

Este método añade una nueva tarea al árbol y luego activa el proceso de rebalanceo si es necesario.

```javascript
_insert(node, task) {
  // 1. Inserción estándar de un Árbol Binario de Búsqueda (BST)
  if (!node) {
    return new Node(task);
  }

  if (task.id < node.key) {
    node.left = this._insert(node.left, task);
  } else if (task.id > node.key) {
    node.right = this._insert(node.right, task);
  } else {
    return node; // No se permiten IDs duplicados
  }

  // 2. Actualizar la altura del nodo ancestro actual
  this._updateHeight(node);

  // 3. Calcular el factor de equilibrio para este nodo
  const balance = this._getBalance(node);

  // 4. Si el nodo está desequilibrado, se elige uno de los 4 casos de rotación
  
  // Caso Izquierda-Izquierda (Left-Left)
  if (balance > 1 && task.id < node.left.key) {
    return this._rightRotate(node);
  }

  // Caso Derecha-Derecha (Right-Right)
  if (balance < -1 && task.id > node.right.key) {
    return this._leftRotate(node);
  }

  // Caso Izquierda-Derecha (Left-Right)
  if (balance > 1 && task.id > node.left.key) {
    node.left = this._leftRotate(node.left);
    return this._rightRotate(node);
  }

  // Caso Derecha-Izquierda (Right-Left)
  if (balance < -1 && task.id < node.right.key) {
    node.right = this._rightRotate(node.right);
    return this._leftRotate(node);
  }

  // 5. Si no hay desequilibrio, devolver el nodo sin cambios
  return node;
}
```

- **Análisis del Proceso:**
  1.  **Inserción BST:** El método desciende recursivamente por el árbol, comparando el `task.id` con la `key` de cada nodo para encontrar la ubicación correcta, igual que en un árbol de búsqueda binario simple. Cuando encuentra un lugar vacío (`!node`), crea y devuelve un `new Node`.
  2.  **Ascenso y Actualización:** A medida que la recursión "vuelve hacia arriba", cada nodo ancestro en el camino de inserción actualiza su altura (`_updateHeight`).
  3.  **Verificación de Equilibrio:** Inmediatamente después de actualizar la altura, se calcula el factor de equilibrio (`_getBalance`).
  4.  **Rotaciones (si es necesario):**
      - **LL/RR (Simples):** Si el desequilibrio es "lineal" (todo a la izquierda o todo a la derecha), se realiza una única rotación (`_rightRotate` o `_leftRotate`).
      - **LR/RL (Dobles):** Si el desequilibrio es "cruzado" (por ejemplo, pesado a la izquierda, pero el subárbol izquierdo está pesado a la derecha), se requieren dos rotaciones. Por ejemplo, en el caso LR, primero se hace una rotación a la izquierda en el hijo izquierdo (`node.left`) para convertirlo en un caso LL, y luego se realiza la rotación a la derecha en el nodo actual.

---

## 6. Método de Eliminación (`delete`)

Eliminar un nodo es más complejo que insertarlo, ya que el rebalanceo puede ser necesario en múltiples niveles del árbol.

```javascript
_delete(node, key) {
  // 1. Eliminación estándar de un Árbol Binario de Búsqueda (BST)
  if (!node) return node;

  if (key < node.key) {
    node.left = this._delete(node.left, key);
  } else if (key > node.key) {
    node.right = this._delete(node.right, key);
  } else {
    // Nodo encontrado. Proceder con la eliminación.
    if (!node.left || !node.right) {
      // Caso 1: Nodo con 0 o 1 hijo
      node = node.left || node.right;
    } else {
      // Caso 2: Nodo con 2 hijos
      const temp = this._minValueNode(node.right); // Encontrar el sucesor in-order
      node.key = temp.key;
      node.task = temp.task;
      node.right = this._delete(node.right, temp.key); // Eliminar el sucesor
    }
  }

  if (!node) return node; // Si el árbol quedó vacío

  // 2. Actualizar altura del nodo actual
  this._updateHeight(node);

  // 3. Calcular factor de equilibrio y rebalancear (similar a la inserción)
  const balance = this._getBalance(node);
  
  // Caso Izquierda-Izquierda
  if (balance > 1 && this._getBalance(node.left) >= 0) {
    return this._rightRotate(node);
  }
  // Caso Izquierda-Derecha
  if (balance > 1 && this._getBalance(node.left) < 0) {
    node.left = this._leftRotate(node.left);
    return this._rightRotate(node);
  }
  // Caso Derecha-Derecha
  if (balance < -1 && this._getBalance(node.right) <= 0) {
    return this._leftRotate(node);
  }
  // Caso Derecha-Izquierda
  if (balance < -1 && this._getBalance(node.right) > 0) {
    node.right = this._rightRotate(node.right);
    return this._leftRotate(node);
  }

  return node;
}
```

- **Análisis del Proceso:**
  1.  **Eliminación BST:**
      - Se busca el nodo a eliminar.
      - **Si tiene 0 o 1 hijo:** Simplemente se reemplaza el nodo por su único hijo (o `null` si no tiene hijos).
      - **Si tiene 2 hijos:** Este es el caso complejo. Para mantener la propiedad del BST, no podemos simplemente eliminarlo. En su lugar:
          a. Encontramos su **sucesor in-order** (el nodo con el valor más pequeño en el subárbol derecho), usando `_minValueNode`.
          b. Copiamos el contenido (`key` y `task`) de ese sucesor al nodo que queremos "eliminar".
          c. Ahora, recursivamente, eliminamos el nodo sucesor (que, por definición, tendrá como máximo un hijo derecho, haciendo que su eliminación sea un caso simple).
  2.  **Ascenso, Actualización y Rebalanceo:** Al igual que en la inserción, a medida que la recursión de la eliminación vuelve hacia arriba, cada nodo en el camino actualiza su altura y comprueba su factor de equilibrio, realizando las rotaciones necesarias para mantener el árbol balanceado. La lógica de los 4 casos de rotación es idéntica a la de la inserción.
