<template>
  <header class="portal-header">
    <div class="header-inner">
      <div class="header-brand">
        <span class="header-logo" aria-hidden="true">🎮</span>
        <div>
          <h1 class="header-title">{{ t('nav.title') }}</h1>
          <p class="header-subtitle">{{ t('nav.subtitle') }}</p>
        </div>
      </div>
      <language-switcher :locale="locale" />
    </div>
  </header>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from './language-switcher.vue'

defineProps({ locale: { type: String, required: true } })
const { t } = useI18n()
</script>

<style scoped>
.portal-header {
  padding: 1.5rem 0 0.5rem;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-logo {
  font-size: 3.5rem;
  line-height: 1;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.header-title {
  font-size: 2rem;
  font-weight: 900;
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  line-height: 1.1;
}

.header-subtitle {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1rem;
  margin-top: 0.25rem;
}

@media (max-width: 480px) {
  .header-title {
    font-size: 1.5rem;
  }
  .header-logo {
    font-size: 2.5rem;
  }
}
</style>
