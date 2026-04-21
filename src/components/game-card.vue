<template>
  <article class="card" :style="{ '--accent': game.color }">
    <div class="card-icon">
      <img
        v-if="game.iconUrl"
        :src="game.iconUrl"
        :alt="gameName"
        width="80"
        height="80"
        loading="lazy"
        @error="onImgError"
      />
      <span v-if="!game.iconUrl || imgFailed" class="card-emoji">{{ game.iconEmoji || '🎮' }}</span>
    </div>

    <div class="card-body">
      <span class="card-age">{{ t('games.ageRange', { age: game.ageRange }) }}</span>
      <h2 class="card-title">{{ gameName }}</h2>
      <p class="card-desc">{{ gameDesc }}</p>
    </div>

    <div class="card-actions">
      <a :href="game.gameUrl" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
        {{ t('games.playNow') }}
      </a>
      <a :href="game.repoUrl" class="btn btn-ghost" target="_blank" rel="noopener noreferrer">
        {{ t('games.viewSource') }}
      </a>
    </div>
  </article>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  game: { type: Object, required: true },
  locale: { type: String, required: true },
})

const { t } = useI18n()
const imgFailed = ref(false)

const gameName = computed(() => props.game.name[props.locale] ?? props.game.name.en)
const gameDesc = computed(() => props.game.description[props.locale] ?? props.game.description.en)

function onImgError() {
  imgFailed.value = true
}
</script>

<style scoped>
.card {
  background: white;
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 56px rgba(0, 0, 0, 0.18);
}

.card-icon {
  background: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 150px;
}

.card-icon img {
  border-radius: 1rem;
  object-fit: contain;
}

.card-emoji {
  font-size: 4.5rem;
  line-height: 1;
}

.card-body {
  padding: 1.5rem;
  flex: 1;
}

.card-age {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 12%, white);
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  margin-bottom: 0.75rem;
}

.card-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.card-desc {
  font-size: 0.95rem;
  color: #555;
  line-height: 1.65;
}

.card-actions {
  display: flex;
  gap: 0.75rem;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid #f0f0f0;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.25rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.9rem;
  font-family: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.15s, transform 0.1s;
}

.btn:hover {
  opacity: 0.85;
  transform: scale(1.03);
}

.btn-primary {
  background: var(--accent);
  color: white;
  flex: 1;
}

.btn-ghost {
  border: 2px solid var(--accent);
  color: var(--accent);
  background: transparent;
}
</style>
