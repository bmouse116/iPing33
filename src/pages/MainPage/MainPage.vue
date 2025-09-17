<template>
  <TheHeader />
  <div class="main-page">
    <section class="main-section">
      <MainSearch />
    </section>
    <section class="functional-section">
      <FunctionalSection />
    </section>
    <section class="dashboard-preview-section">
      <DashboardPreview />
    </section>
    <section class="final-cta-section">
      <FinalCTA />
    </section>
  </div>
</template>

<script setup lang="ts">
import DashboardPreview from "@/pages/MainPage/components/DashboardPreview.vue";
import FinalCTA from "@/pages/MainPage/components/FinalCTA.vue";
import FunctionalSection from "@/pages/MainPage/components/FunctionalSection.vue";
import MainSearch from "@/pages/MainPage/components/MainSearch.vue";
import TheHeader from "@/components/TheHeader.vue";
</script>

<style scoped lang="scss">
.main-page {
  background-image: url("/src/assets/img/Stars\ -\ Start.png");
  background-repeat: repeat;
  background-size: cover;

  .main-section {
    height: 200vh;
  }
}
</style>
