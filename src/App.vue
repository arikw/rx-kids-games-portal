<template>
  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --font-main: 'Nunito', 'Segoe UI', system-ui, sans-serif;
  --radius-card: 1.5rem;
  --shadow-card: 0 8px 32px rgba(0, 0, 0, 0.12);
}

body {
  font-family: var(--font-main);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}
</style>
