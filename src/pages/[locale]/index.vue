<template>
  <div class="portal" :class="{ rtl: locale === 'he' }">
    <portal-header :locale="locale" />

    <main class="game-grid">
      <game-card
        v-for="game in games"
        :key="game.id"
        :game="game"
        :locale="locale"
      />
    </main>

    <footer class="portal-footer">
      <p>{{ t('footer.openSource') }}</p>
      <p>{{ t('footer.madeWith') }}</p>
    </footer>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import gamesConfig from '../../../games.yaml'
import GameCard from '@/components/game-card.vue'
import PortalHeader from '@/components/portal-header.vue'

const props = defineProps({ locale: { type: String, required: true } })
const { t, locale: i18nLocale } = useI18n()

i18nLocale.value = props.locale

const games = gamesConfig.games
</script>

<style scoped>
.portal {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
}

.portal-footer {
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  font-size: 0.9rem;
  line-height: 2;
}

.rtl {
  direction: rtl;
}
</style>
