<script setup>
import {computed, createApp, ref} from "vue";
import axios from "axios";

let form = ref({
  login: '',
  password: '',
})

let user = ref({
  role: '',
  user: '',
  firstName: '',
  lastName: '',
  login: '',
})

async function auth() {
  if (form.value.login === '' && form.value.password === '') {
    alert("Вы ничего не написали!");
  } else {
    await axios.post(`http://localhost:3000/login`,
        form.value
    ).then(res => {
      console.log(res.data);
      user.value.role = res.data[0].Role;
      user.value.user = res.data[0].Id;
      user.value.firstName = res.data[0].FirstName;
      console.log(user.value);
      localStorage.setItem("role", user.value.role);
      localStorage.setItem("user", user.value.user);
      localStorage.setItem("firstName", user.value.firstName);
      location.reload();
      // window.location.href = '/editor';
    }).catch(err => {
      console.log(err);
    })
  }
  console.log("Function is called reg");
}

function deleteLocal() {
  localStorage.clear();
  location.reload();
}

const role = localStorage.getItem("role");
const firstName = localStorage.getItem("firstName");
</script>

<template>
  <div class="auth" v-if="!role">
  <h1>Вход</h1>
  <div class="content">
    <div class="">
      <input v-model="form.login" placeholder="Логин" type="text" name="" id="">
      <input v-model="form.password" placeholder="Пароль" type="text" name="" id="">
    </div>
    <div>
      <button @click="auth" class="post">Войти</button>
    </div>
  </div>
  </div>

  <div v-if="role" class="exit">
    <h1>Вы авторизовались как: {{ role}}</h1>
    <p>Неоднозначно приветсвуем вас {{firstName}}</p>
  <div class="buttons">
    <button @click="deleteLocal" class="delete">Выйти</button>
  </div>
  </div>
</template>

<style scoped>
.auth {
  position: relative;
  top: -10px;
  margin-bottom: 300px;
}

.exit {
  margin-bottom: 500px;
  text-align: center;
}

input {
  border-radius: 20px;
  width: 37vmax;
  height: 3vmax;
  padding: 6px;
  margin-bottom: 16px;
  border: solid 2px gray;
  font-size: 16px;
}

.post {
  font-size: 17px;
  background-color: #04AA6D;
  border-radius: 20px;
  border: solid #1ee90f;
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
}

h1 {
  position: relative;
  top: -40px;
  font-family: Baghdad, serif;
  font-size: 46px;
  text-align: center;
}

p {
  position: relative;
  top: -40px;
}

.content {
  position: relative;
  top: -40px;
  width: 35vmax;
}

.delete {
  font-size: 27px;
  background-color: rgba(231, 33, 33, 0.98);
  border-radius: 14px;
  border: solid #ff6246;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
}

.buttons {
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>