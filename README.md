# Essencia Inmobiliaria — Landing Page de Captación Premium

Este repositorio contiene el código fuente de la landing page de captación de **Essencia Inmobiliaria** (`essencia-landing`). Diseñada con una estética editorial de lujo (Exagerated Minimalism) y optimizada para la conversión de propietarios en Gandía, La Safor y Valencia.

El proyecto comparte estrictamente la identidad visual, los componentes interactivos premium y los estándares de accesibilidad del sitio web principal de Essencia Inmobiliaria, ofreciendo una experiencia coherente y fluida para el usuario.

---

## 🛠️ Arquitectura y Estructura del Proyecto

El código está estructurado de forma modular en React (Vite + TypeScript + Tailwind CSS):

```text
├── public/                    # Archivos estáticos
│   ├── Logo_Negro.svg         # Logos en formato SVG
│   ├── Logo_Blanco.svg
│   ├── Packpro_Essencia.mp4   # Vídeo promocional de alta calidad
│   └── enviar_correo.php      # Backend en PHP para el procesamiento del formulario
├── src/
│   ├── components/            # Componentes reutilizables de la interfaz
│   │   ├── ui/
│   │   │   └── CarouselProgress.tsx  # Indicador de progreso de los carruseles móviles
│   │   ├── FloatingWhatsApp.tsx      # Botón flotante de contacto directo en WhatsApp
│   │   ├── LandingHeader.tsx         # Navegación superior con selector de idioma
│   │   ├── LandingFooter.tsx         # Pie de página corporativo con enlaces legales
│   │   ├── StatsSection.tsx          # Indicadores clave con contadores animados (Optimizado SEO)
│   │   ├── ProcessSteps.tsx          # Fases iniciales del proceso de venta
│   │   ├── MiaMethodSection.tsx      # Método MIA interactivo de 10 pasos (Premium Split View)
│   │   ├── VisualProSection.tsx      # Sección del "Pack Visual Pro" (Vídeo + Slider de IA + Galería)
│   │   ├── ManagementClosingSection.tsx # Accordion de gestión y cierre de la venta
│   │   ├── PhoneMockup.tsx           # Contenedor estético con forma de iPhone
│   │   ├── StickyBuyBanner.tsx       # Banner inferior persistente con llamadas a la acción
│   │   ├── Logo.tsx                  # Componente SVG inline del logo corporativo
│   │   └── FAQSection.tsx            # Acordeón de preguntas frecuentes de fondo oscuro
│   ├── context/
│   │   └── LanguageContext.tsx       # Proveedor de traducciones (ES, EN, FR, DE, VA)
│   ├── types/
│   │   └── property.ts               # Definición de tipos deTypeScript (Ej: Property)
│   ├── utils/
│   │   └── xmlParser.ts              # Conversor de XML Kyero a objetos de React
│   ├── pages/
│   │   └── Landing.tsx               # Ensamblador principal de la Landing Page
│   ├── index.css                     # Estilos globales y clases decorativas
│   └── main.tsx                      # Punto de entrada de la aplicación
├── tailwind.config.js         # Configuración del motor CSS con los colores y fuentes corporativos
└── package.json               # Dependencias del proyecto
```

---

## 💎 Sistema de Diseño y Coherencia Estética

La landing page se ha ajustado para alinearse al 100% con la web principal:
*   **Colores Corporativos:** El acento principal (`brand-blue-500`) utiliza `#1fc0d9` (el azul/cian oscuro característico de la marca) en combinación con `#222222` (`editorial-black`) y `#f6f7f8` (`editorial-gray`).
*   **Tipografía:** 
    *   **Display (Símbolos, Botones y Párrafos):** `Manrope` (Sans-serif, moderna y legible).
    *   **Serif (Títulos editoriales y destacados):** `Playfair Display` (Elegante y de lujo).
*   **Efectos visuales:** Se integran sombras de difusión suaves (`diffusion`) y efectos internos de vidrio (`glass-inner`) en los contenedores premium de la web principal.

---

## 🌟 Componentes y Funcionalidades Destacadas

### 1. StatsSection (Estadísticas con Animación Optimizada)
*   **Visualización Premium:** Grid de KPIs en cajas oscuras translucidas.
*   **Optimización SEO Local:** A diferencia de los contadores comunes que cargan en `0` (invisibles para los robots de búsqueda), este componente **renderiza el valor estático final directamente en el HTML** inicial para que los bots de Google y otras IAs lo indexen de inmediato, aplicando la animación numérica encima de forma progresiva.

### 2. MiaMethodSection (Método MIA Split-Screen)
*   **Interactividad Fluida:** En lugar de abrir modales molestos para el usuario, implementa una pantalla dividida. El usuario pulsa sobre los iconos de los 10 pasos en la izquierda y el contenido detallado cambia en la tarjeta de la derecha con transiciones fluidas de Framer Motion.
*   **Nativo y Ligero:** Se ha rediseñado para utilizar iconos nativos del sistema en lugar de dependencias externas.

### 3. VisualProSection (Pack Visual Pro)
*   **Vídeo Auto-Play:** Teléfono móvil interactivo que reproduce el vídeo promocional de forma automática solo cuando entra en el campo visual del usuario (utiliza `IntersectionObserver` para ahorrar batería y datos en móvil).
*   **Slider Antes/Después:** Comparador de imágenes interactivo deslizable (con soporte táctil en móvil) para ilustrar el poder de la Inteligencia Artificial frente al estado antiguo de las viviendas.

### 4. FAQSection (Preguntas Frecuentes Translucidas)
*   Sección de acordeones interactivos en fondo oscuro con efectos de brillo ambiental. Integra transiciones de altura suaves con `AnimatePresence` y números gigantes decorativos de fondo.

### 5. Sincronización del Mapa interactivo (React Leaflet)
*   Muestra las propiedades vendidas y reservadas en el mapa. Sincroniza dinámicamente el estado de `hover` de las tarjetas del carrusel con el pulso y tamaño del marcador correspondiente en el mapa.

---

## ✉️ Procesamiento del Formulario (Backend PHP)

El formulario de valoración gratuita en el final de la landing page procesa de manera segura el nombre, teléfono, email, dirección e **imágenes/vídeos adjuntos** a través del script `public/enviar_correo.php`:

*   **Subida Múltiple de Archivos:** Soporta adjuntar múltiples imágenes o clips de vídeo directamente desde el móvil o PC.
*   **Manejo de CORS y Seguridad:** Configurado con cabeceras de respuesta JSON y códigos de estado HTTP para interactuar limpiamente con la API de `fetch` de React.
*   **Feedback en Tiempo Real:** El botón de envío muestra un spinner animado durante el proceso de subida y un mensaje de éxito estético al terminar.

---

## 🌍 Soporte Multi-idioma

La landing es 100% traducible a 5 idiomas mediante React Context (`LanguageContext.tsx`):
1.  **Español (ES)**
2.  **Inglés (EN)**
3.  **Francés (FR)**
4.  **Alemán (DE)**
5.  **Valenciano / Catalán (VA)**

La landing detecta el cambio de idioma y actualiza automáticamente los atributos del documento HTML (por ejemplo, `lang="en"`) para mejorar el SEO internacional.

---

## ⚡ Ejecución y Compilación Local

### Requisitos
*   **Node.js** (versión 18 o superior)
*   **NPM**

### Instrucciones
1.  **Instalar dependencias:**
    ```bash
    npm install
    ```
2.  **Iniciar el entorno de desarrollo:**
    ```bash
    npm run dev
    ```
    Abre [http://localhost:5173](http://localhost:5173) en tu navegador.
3.  **Comprobar errores de compilación:**
    ```bash
    npx tsc --noEmit
    ```
4.  **Compilar bundle de producción:**
    ```bash
    npm run build
    ```
    La compilación optimizada se guardará en el directorio `/dist`.
