# ITZFIZZ · Scroll-Driven Hypercar Hero Animation

An ultra-smooth, scroll-driven automotive hero section animation inspired by the [ItzFizz Car Scroll Animation reference](https://paraschaturvedi.github.io/car-scroll-animation). Built with **React 19**, **GSAP ScrollTrigger**, **Tailwind CSS**, and the **Web Audio API**.

---

## 🚀 Live Demo

- **Production URL**: [https://ais-pre-rrdnbpdsxx4poks6ln7kxg-198481170689.asia-southeast1.run.app](https://ais-pre-rrdnbpdsxx4poks6ln7kxg-198481170689.asia-southeast1.run.app)
- **Development URL**: [https://ais-dev-rrdnbpdsxx4poks6ln7kxg-198481170689.asia-southeast1.run.app](https://ais-dev-rrdnbpdsxx4poks6ln7kxg-198481170689.asia-southeast1.run.app)
- **Original Inspiration**: [paraschaturvedi.github.io/car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation)

---

## ✨ Features & Functional Compliance

### 1. Hero Section Layout (Above the Fold)
- Occupies a full **100vh sticky viewport** inside a pinned track.
- Prominently showcases the letter-spaced display headline:  
  **`W E L C O M E   I T Z F I Z Z`**
- Quantitative impact metrics / statistics displayed below:
  - **98.6%** Aero Efficiency (Dynamic ground effect downforce)
  - **2.1s** 0–100 km/h Sprint Velocity (Silicon carbide stator)
  - **1,250 hp** Quad-Motor Output (Active yaw vectoring)
  - **99.2%** Thermal Retention (Dielectric cooling loop)

### 2. Initial Load Animation
- Staggered letter-by-letter entrance (`stagger: 0.035s`, `y: 35 → 0`, `filter: blur(10px) → blur(0px)`).
- Subtitle and vehicle silhouette slide into resting stance with cubic easing.
- Impact statistics fade in one-by-one with a subtle delayed sequence.

### 3. Scroll-Based Animation (Core Feature)
- Driven strictly by scroll progress using **GSAP ScrollTrigger** with butter-smooth scrub inertia (`scrub: 1.1`).
- Multi-phase kinetic progression:
  - **Phase 01: Stance to Launch (0% – 35%)**: Letter spacing expands, stats fade out, car translates with realistic pitch angle and road streak acceleration.
  - **Phase 02: Full Acceleration (35% – 70%)**: Vehicle glides across the frame with simulated high-speed wake turbulence.
  - **Phase 03: Apex Dynamic Attack (70% – 100%)**: Transition to aggressive front 3/4 angle with matrix LED beams cutting through the dark atmosphere.

### 4. 60 FPS Compositor Performance
- Exclusively uses GPU-accelerated CSS transforms (`translate3d`, `scale`, `rotateZ`) and `opacity`.
- Zero layout reflows or heavy geometry calculations during scroll.

### 5. Interactive & Added Polish
- **Dynamic Speedometer & Telemetry HUD**: Digital speed gauge (0–360 km/h) and lateral G-force sensor reacting to real-time scroll velocity.
- **Web Audio API Engine Sound**: Procedurally synthesized turbine hum and airflow that increases in pitch with scroll speed (with instant mute/unmute).
- **Interactive Inspect Pins**: Clickable/hoverable hotspots for the Carbon Splitter, Ceramic Discs, Battery Tub, and Active DRS Wing.
- **Auto-Drive Simulation**: Hands-free autoplay button to preview the entire scroll trajectory smoothly.
- **Bespoke Finisher Studio**: Color accent customizer modal (Obsidian, Grigio Titanio, Liquid Cobalt, Monaco Rosso, Circuit Gold).
- **CFD Wind Tunnel & Cockpit Sections**: Detailed aerodynamic downforce simulator and cockpit craftsmanship showcase.

---

## 🛠️ Tech Stack

- **React 19**
- **TypeScript**
- **GSAP 3** + **ScrollTrigger**
- **Tailwind CSS v4**
- **Lucide Icons**
- **Vite**

---

## 📦 Local Development

1. Clone or download the repository:
   ```bash
   git clone <YOUR_REPO_URL>
   cd itzfizz-car-scroll-animation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## 📄 License

Apache-2.0
