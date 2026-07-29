<script setup lang="ts">
import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import HoneycombCanvas from '@/components/background/HoneycombCanvas.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import TrustStrip from '@/components/sections/TrustStrip.vue'
import ProblemSection from '@/components/sections/ProblemSection.vue'
import FeaturesSection from '@/components/sections/FeaturesSection.vue'
import AudienceSection from '@/components/sections/AudienceSection.vue'
import ScreenshotsSection from '@/components/sections/ScreenshotsSection.vue'
import CalculatorSection from '@/components/sections/CalculatorSection.vue'
import GeoSection from '@/components/sections/GeoSection.vue'
import StatsSection from '@/components/sections/StatsSection.vue'
import CtaSection from '@/components/sections/CtaSection.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useScrollCompression } from '@/composables/useScrollCompression'

const { t, locale } = useI18n()
useScrollCompression(60)

watchEffect(() => {
  document.documentElement.lang = locale.value
  document.title = t('meta.title')
})
</script>

<template>
  <div class="app-wrapper">
    <HoneycombCanvas />
    <AppHeader />
    <main>
      <HeroSection />
      <TrustStrip />
      <ProblemSection />
      <FeaturesSection class="scroll-compress" data-compress="80" />
      <AudienceSection class="scroll-compress" />
      <ScreenshotsSection class="scroll-compress" />
      <CalculatorSection class="scroll-compress" />
      <GeoSection class="scroll-compress" />
    </main>
    <div class="dark-bottom">
      <StatsSection class="scroll-compress" />
      <CtaSection class="scroll-compress" />
      <AppFooter class="scroll-compress" />
    </div>
  </div>
</template>

<style lang="scss">
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

main {
  position: relative;
  z-index: 1;
}

.dark-bottom {
  position: relative;
  z-index: 1;
  background: $color-dark;
}

.scroll-compress {
  will-change: transform;
  transition: transform 0.1s linear;
}
</style>
