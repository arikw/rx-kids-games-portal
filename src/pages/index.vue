<template>
  <div />
</template>

<script setup>
import { useRouter } from 'vue-router'
import { detectLocale } from '@/composables/useLocale'

const router = useRouter()
router.replace('/' + detectLocale() + '/')
</script>
