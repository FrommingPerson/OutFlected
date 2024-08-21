<script setup>
import Editor from "@/pages/Editor.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <Header class="header"></Header>
  <div class="main">
  <main class="content">
    <div>
<!--    <editor></editor>-->
    </div>
  </main>
  </div>
  <router-view></router-view>
</template>

<style scoped>
.main {
  //margin-top: 30px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.content {
  flex-wrap: wrap; display: flex; justify-content: center; align-items: center;
  //margin-top: 20px;
}

.header {
  //position: relative;
  //top: -200px;
  margin-bottom: 70px;
  //width: 80vmin;
}
</style>
