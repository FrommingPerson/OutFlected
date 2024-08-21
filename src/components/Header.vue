<script setup>
  const role = localStorage.getItem("role");
</script>

<template>
  <header>
    <div class="elementOfMenu" v-if="role">
      <router-link :to="{name: 'home'}">Заявки</router-link>
    </div>
    <div class="elementOfMenu">
      <router-link v-if="!role" :to="{name: 'auth'}">Вход</router-link>
      <router-link v-if="role" :to="{name: 'auth'}">Выход</router-link>
    </div>
    <div class="elementOfMenu">
      <router-link :to="{name: 'reg'}">Зарегистрироваться</router-link>
    </div>
    <div class="elementOfMenu" v-if="role==='Admin'">
      <router-link :to="{name: 'admin'}">Администрация</router-link>
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  position: sticky;
  padding: 0.75rem 1.25rem;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
  width: 100%;
  height: 4rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  backdrop-blur: blur(12px);
  background-color: white;
}

.elementOfMenu {
  display: flex;
  gap: 0.75rem;
  //font-size: 1.5rem;
  line-height: 2rem;
  color: #333131;
  font-size: 17px;
}
</style>