<h1 align="center">📊 Project-Pulse</h1>

<p align="center">
  <strong>Gestión de proyectos inteligente: Monitoreo en tiempo real y análisis visual.</strong>
  <br />
  Dashboard de alto rendimiento construido con el stack más moderno de React.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" />
</p>

---

## 🚀 Descripción General

**Project-Pulse** es una plataforma de gestión de proyectos diseñada para ofrecer claridad operativa. Con un enfoque en la **arquitectura limpia** y la **interactividad fluida**, permite a los usuarios rastrear el ciclo de vida de sus tareas mediante una interfaz minimalista.

Este proyecto utiliza una arquitectura de **Mock Data (JSON)**, simulando el comportamiento de una API REST de grado de producción. Es una demostración técnica de manejo de estados, visualización de datos complejos y optimización de rendimiento en el lado del cliente.

---

## ✨ Características Principales

* **📈 Dashboard Analítico:** Visualización del progreso mediante gráficos dinámicos impulsados por **Chart.js**.
* **🔄 Gestión de Estados (CRUD):** Flujo completo para visualizar y actualizar el ciclo de vida del proyecto (*To Do*, *In Progress*, *Done*).
* **⚡ Arquitectura Next.js 15:** Aprovechamiento de las últimas optimizaciones de renderizado y estructuración de carpetas.
* **🏗️ Mock API System:** Simulación de persistencia de datos mediante archivos JSON, permitiendo un desarrollo desacoplado y ágil.
* **📱 Diseño Adaptativo:** Interfaz totalmente responsiva construida con **Tailwind CSS v4** para una experiencia consistente en cualquier dispositivo.

---

## 🛠️ Stack Tecnológico

| Herramienta | Versión | Función Principal |
| :--- | :--- | :--- |
| **Next.js** | v15.4+ | Framework SSR/Static Generation y Routing. |
| **React** | v19.0+ | Biblioteca base para UI interactiva. |
| **Chart.js** | v5.3+ | Motor de renderizado de gráficas de progreso. |
| **Tailwind CSS** | v4.0 | Estilizado basado en utilidades de última generación. |
| **TypeScript** | Latest | Tipado estático para escalabilidad del código. |

---

## 📂 Arquitectura y Reutilización

El proyecto implementa el principio **DRY** y **Separation of Concerns**:

* **UI Components:** Componentes atómicos (Botones, Inputs, Badges) aislados.
* **Features:** Módulos lógicos por funcionalidad (Gráficos, Listados de Proyectos).
* **Hooks/Utils:** Lógica compartida para el filtrado de datos y cálculos de progreso.

---

## 💻 Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/Marianvsf/Project-Pulse.git](https://github.com/Marianvsf/Project-Pulse.git)
   cd Project-Pulse
