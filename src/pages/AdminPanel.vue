<script setup>
import UserCart from "@/components/UserCart.vue";
import {onMounted, ref} from "vue";
import axios from "axios";

const users = ref([]);

const role = localStorage.getItem("role");
const currentUser = localStorage.getItem("user");

async function getUsers() {
  axios.get(`http://localhost:3000/users`).then(res => {
    console.log(res.data);
    users.value = res.data;
  }).catch(err => {
    console.log(err);
  });
}

async function deleteUser(index) {
  let id = users.value[index].id;
  users.value.splice(index, 1);
  axios.delete(`http://localhost:3000/deleteUser/:${id}`, currentUser).then(res => {
    console.log(res.data);
  }).catch(err => {
    console.log(err);
  })
}

onMounted(() => {
  getUsers();
})

</script>

<template>
  <div class="panel" v-if="role ==='Admin'">
    <h1>Панель для администрирования</h1>
    <div v-for="(user, index) in users">
      <user-cart @remove="deleteUser(index)" :user="user"/>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-family: Baghdad, serif;
  font-size: 46px;
  text-align: center;
  position: relative;
  top: -10px;
}
</style>