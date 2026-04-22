<template>
  <button class="lang-btn" @click="toggle" :aria-label="`Switch to ${t('lang.switch')}`">
    <span class="lang-icon">🌐</span>
    {{ t('lang.switch') }}
  </button>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { persistLocale } from '@/composables/useLocale'

const props = defineProps({ locale: { type: String, required: true } })
const { t } = useI18n()
const router = useRouter()

function toggle() {
  const next = props.locale === 'en' ? 'he' : 'en'
  router.push(`/${next}/`)
  persistLocale(next)
}
</script>

<style scoped>
.lang-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.6);
  color: white;
  font-weight: 700;
  font-size: 1rem;
  font-family: inherit;
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: background 0.15s, transform 0.1s;
  white-space: nowrap;
}

.lang-btn:hover {
  background: rgba(255, 255, 255, 0.35);
  transform: scale(1.04);
}

.lang-icon {
  font-size: 1.1rem;
}
</style>
