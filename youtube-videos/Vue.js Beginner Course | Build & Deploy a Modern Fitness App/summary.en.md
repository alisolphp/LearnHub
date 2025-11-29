# Vue.js Beginner Course | Build & Deploy a Modern Fitness App

* **Platform**: YouTube
* **Channel/Creator**: Smoljames 
* **Duration**: 04:09:55
* **Release Date**: May 5, 2025
* **Video Link**: [https://www.youtube.com/watch?v=JAgeFLJYrUY](https://www.youtube.com/watch?v=JAgeFLJYrUY)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=31acc7b2 -->

### AI-Powered buttons

Start teaching this to a:
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Vue.js%20Beginner%20Course%20%7C%20Build%20%26%20Deploy%20a%20Modern%20Fitness%20App) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Vue.js%20Beginner%20Course%20%7C%20Build%20%26%20Deploy%20a%20Modern%20Fitness%20App) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Vue.js%20Beginner%20Course%20%7C%20Build%20%26%20Deploy%20a%20Modern%20Fitness%20App) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Vue.js%20Beginner%20Course%20%7C%20Build%20%26%20Deploy%20a%20Modern%20Fitness%20App) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Vue.js%20Beginner%20Course%20%7C%20Build%20%26%20Deploy%20a%20Modern%20Fitness%20App) | 
[Story](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Vue.js%20Beginner%20Course%20%7C%20Build%20%26%20Deploy%20a%20Modern%20Fitness%20App) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Vue.js%20Beginner%20Course%20%7C%20Build%20%26%20Deploy%20a%20Modern%20Fitness%20App) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Vue.js%20Beginner%20Course%20%7C%20Build%20%26%20Deploy%20a%20Modern%20Fitness%20App) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Vue.js%20Beginner%20Course%20%7C%20Build%20%26%20Deploy%20a%20Modern%20Fitness%20App) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Vue.js%20Beginner%20Course%20%7C%20Build%20%26%20Deploy%20a%20Modern%20Fitness%20App) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Vue.js%20Beginner%20Course%20%7C%20Build%20%26%20Deploy%20a%20Modern%20Fitness%20App) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Vue.js%20Beginner%20Course%20%7C%20Build%20%26%20Deploy%20a%20Modern%20Fitness%20App)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Vue.js%20Beginner%20Course%20%7C%20Build%20%26%20Deploy%20a%20Modern%20Fitness%20App) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Vue.js%20Beginner%20Course%20%7C%20Build%20%26%20Deploy%20a%20Modern%20Fitness%20App) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Vue.js%20Beginner%20Course%20%7C%20Build%20%26%20Deploy%20a%20Modern%20Fitness%20App)
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Vue.js%20Beginner%20Course%20%7C%20Build%20%26%20Deploy%20a%20Modern%20Fitness%20App)
<!-- LH-BUTTONS:END -->

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

## Introduction & Project Demo
The course is a complete beginner-friendly Vue.js tutorial where we build a fully functional workout planner app (push-pull-legs program) with three pages: landing page, dashboard, and workout tracker. The app includes progress tracking, exercise modals with descriptions, localStorage persistence, and mobile-responsive design using Fanta.css for styling.

We use Vue 3 with Vite, plain JavaScript (no TypeScript), and the Composition API with `<script setup>`. Everything is built from scratch together — no copying large code chunks.

[Ask AI: Vue.js beginner project ideas](https://alisol.ir/?ai=Vue.js%20beginner%20project%20ideas%7CSmoljames%7CVue.js%20Beginner%20Course%20%7C%20Build%20%26%20Deploy%20a%20Modern%20Fitness%20App)

## Project Setup with Vite
Run:
```bash
npm create vite@latest
```
Choose “Vue” → “JavaScript”. Then:
```bash
cd your-project-name
npm install
npm run dev
```
The starter template gives you a working app on localhost:5173 (or similar port).

Key files:
- `index.html` → entry point
- `main.js` → creates and mounts the Vue app
- `App.vue` → root component

[Ask AI: How to create Vue project with Vite](https://alisol.ir/?ai=How%20to%20create%20Vue%20project%20with%20Vite%7CSmoljames%7CVue.js%20Beginner%20Course%20%7C%20Build%20%26%20Deploy%20a%20Modern%20Fitness%20App)

## Vue Component Basics (<script setup>)
Every `.vue` file is a Single-File Component (SFC) with three sections:
```vue
<script setup>
// logic (ref, computed, lifecycle hooks…)
</script>

<template>
  <!-- HTML + Vue directives -->
</template>

<style scoped>
/* styles only apply to this component */
</style>
```

The `scoped` attribute keeps CSS local. `<script setup>` is the modern way — everything in setup is automatically exposed to the template.

[Ask AI: Vue 3 script setup syntax](https://alisol.ir/?ai=Vue%203%20script%20setup%20syntax%7CSmoljames%7CVue.js%20Beginner%20Course%20%7C%20Build%20%26%20Deploy%20a%20Modern%20Fitness%20App)

## Project Structure We Created
```
src/
├── components/
│   ├── layout/Layout.vue
│   └── pages/
        ├── Welcome.vue
        ├── Dashboard.vue
        └── Workout.vue
├── utils/index.js     → all workout data, tips, exercise descriptions
└── App.vue            → root with navigation logic
```

We also added Fanta.css globally in `main.js`:
```js
import './fanta.css'
```

[Ask AI: Organizing components in Vue project](https://alisol.ir/?ai=Organizing%20components%20in%20Vue%20project%7CSmoljames%7CVue.js%20Beginner%20Course%20%7C%20Build%20%26%20Deploy%20a%20Modern%20Fitness%20App)

## Navigation with Conditional Rendering (Single-Page App Style)
In `App.vue` we manage which page to show:
```vue
<script setup>
import { ref } from 'vue'
import Welcome from './components/pages/Welcome.vue'
import Dashboard from './components/pages/Dashboard.vue'
import Workout from './components/pages/Workout.vue'

const selectedDisplay = ref(1) // 1=welcome, 2=dashboard, 3=workout
</script>

<template>
  <Welcome v-if="selectedDisplay === 1" :handle-change-display="() => selectedDisplay = 2" />
  <Dashboard v-else-if="selectedDisplay === 2" />
  <Workout v-else-if="selectedDisplay === 3" />
</template>
```
Passing functions as props lets child components control navigation.

[Ask AI: Conditional rendering in Vue](https://alisol.ir/?ai=Conditional%20rendering%20in%20Vue%7CSmoljames%7CVue.js%20Beginner%20Course%20%7C%20Build%20%26%20Deploy%20a%20Modern%20Fitness%20App)

## State Management with ref() and Reactive Data
All app state lives in `App.vue`:
```js
const data = ref({})                    // workout progress
const selectedWorkout = ref(-1)         // currently viewed workout index
const selectedDisplay = ref(1)
```
We load saved data on mount and save to localStorage on every change.

[Ask AI: Vue 3 ref vs reactive](https://alisol.ir/?ai=Vue%203%20ref%20vs%20reactive%7CSmoljames%7CVue.js%20Beginner%20Course%20%7C%20Build%20%26%20Deploy%20a%20Modern%20Fitness%20App)

## Building the Welcome / Landing Page
Static at first → add content → style with scoped CSS and Fanta.css classes → add “Begin” button that calls the passed `handleChangeDisplay` prop to switch to dashboard.

[Ask AI: Vue landing page design](https://alisol.ir/?ai=Vue%20landing%20page%20design%7CSmoljames%7CVue.js%20Beginner%20Course%20%7C%20Build%20%26%20Deploy%20a%20Modern%20Fitness%20App)

## Dashboard Page with Tips & Workout Grid
- Random daily tip using `Math.random()`
- Grid component receives workout data via props and renders cards
- Each card uses `v-for` and disables future workouts
- “Start Workout” button goes straight to current workout

[Ask AI: v-for and dynamic classes in Vue](https://alisol.ir/?ai=v-for%20and%20dynamic%20classes%20in%20Vue%7CSmoljames%7CVue.js%20Beginner%20Course%20%7C%20Build%20%26%20Deploy%20a%20Modern%20Fitness%20App)

## Workout Page & Exercise Modal
- Warm-up + main exercises displayed with `v-for`
- v-model on inputs for two-way binding
- Exercise modal built with `<teleport>` to body (called Portal in the course) so it overlays everything
- Modal opens on ? icon click and closes on backdrop click

Key code for teleport modal:
```vue
<Teleport to="body">
  <div v-if="showModal" class="modal-backdrop" @click="showModal = false">
    <div class="modal" @click.stop>
      <!-- content -->
    </div>
  </div>
</Teleport>
```

[Ask AI: Vue 3 Teleport for modals](https://alisol.ir/?ai=Vue%203%20Teleport%20for%20modals%7CSmoljames%7CVue.js%20Beginner%20Course%20%7C%20Build%20%26%20Deploy%20a%20Modern%20Fitness%20App)

## Progress Tracking & Completion Logic
Computed properties in `App.vue`:
```js
const isWorkoutComplete = computed(() => { …every exercise has a value… })
const firstIncompleteWorkoutIndex = computed(() => { …find first incomplete… })
```
These drive:
- Disable future workout buttons
- “Complete” button only enables when all inputs filled
- Automatic unlock of next workout on save

[Ask AI: Vue computed properties for progress tracking](https://alisolisol.ir/?ai=Vue%20computed%20properties%20for%20progress%20tracking%7CSmoljames%7CVue.js%20Beginner%20Course%20%7C%20Build%20%26%20Deploy%20a%20Modern%20Fitness%20App)

## LocalStorage Persistence
Save on every “Save & Exit” or “Complete”:
```js
localStorage.setItem('workouts', JSON.stringify(data.value))
```
Load on mount:
```js
onMounted(() => {
  const saved = localStorage.getItem('workouts')
  if (saved) data.value = JSON.parse(saved)
})
```

[Ask AI: Vue localStorage persistence](https://alisol.ir/?ai=Vue%20localStorage%20persistence%7CSmoljames%7CVue.js%20Beginner%20Course%20%7C%20Build%20%26%20Deploy%20a%20Modern%20Fitness%20App)

## Reset Plan Functionality
Reset button appears only when all workouts are complete (`firstIncompleteWorkoutIndex === -1`). Clears localStorage and resets state.

[Ask AI: Reset app state in Vue](https://alisol.ir/?ai=Reset%20app%20state%20in%20Vue%7CSmoljames%7CVue.js%20Beginner%20Course%20%7C%20Build%20%26%20Deploy%20a%20Modern%20Fitness%20App)

## Deployment to Netlify (Free)
1. Push code to GitHub
2. Connect repo in Netlify → Import project
3. Netlify auto-detects Vite build command (`npm run build`) and publish directory (`dist`)
4. Deploy → live URL in minutes

[Ask AI: Deploy Vue Vite app to Netlify](https://alisol.ir/?ai=Deploy%20Vue%20Vite%20app%20to%20Netlify%7CSmoljames%7CVue.js%20Beginner%20Course%20%7C%20Build%20%26%20Deploy%20a%20Modern%20Fitness%20App)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolisolphp)
