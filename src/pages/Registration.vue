<script setup>
import {ref} from "vue";
import axios from "axios";

let form = ref({
  firstName: '',
  lastName: '',
  login: '',
  password: '',
  // role: '',
})

const role = localStorage.getItem("role");

async function postUser() {
  if (form.value.firstName === '' && form.value.lastName === '' && form.value.login === '' && form.value.password === '') {
    alert("Вы ничего не написали!");
  } else {
    await axios.post("http://localhost:3000/registration",
        form.value
    ).then(res => {
      console.log(res.data);
      // window.location.href = '/auth';
      location.reload();
    }).catch(err => {
      console.log(err);
      alert("The problems with you!!!");
    })
  }
  console.log("Function is called reg");
}

let str = 'jg"hfhfhfhfh';
let space = 'n\'';

str = str.replace('"', "'");

console.log(str);
</script>

<template>
  <div class="registration">
    <h1>Регистрация</h1>
    <div class="content">
      <div>
        <input v-model="form.firstName" placeholder="Имя" type="text" name="" id="">
        <input v-model="form.lastName" placeholder="Фамилия" type="text" name="" id="">
        <input v-model="form.login" placeholder="Логин" type="text" name="" id="">
        <input v-model="form.password" placeholder="Пароль" type="text" name="" id="">
<!--        <div class="option" v-if='role === "Admin"'>-->
<!--          <label class="text-white">Роль пользователя</label>-->
<!--          <div class="custom-select">-->
<!--            <select v-model="form.role">-->
<!--              <option>User</option>-->
<!--              <option>Worker</option>-->
<!--              <option>Admin</option>-->
<!--            </select>-->
<!--          </div>-->
<!--        </div>-->
        <div>
          <button @click="postUser" class="post">Отправить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.registration {
  margin-bottom: 190px;
}

input {
  border-radius: 20px;
  width: 37vmax;
  height: 3vmax;
  padding: 6px;
  margin-bottom: 26px;
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

.content {
  position: relative;
  top: -40px;
  width: 35vmax;
}

.option {
  margin-top: -14px;
  margin-bottom: 20px;
}

.custom-select {
  min-width: 360px;
  position: relative;
}

select {
  appearance: none;
  /*  safari  */
  -webkit-appearance: none;
  /*  other styles for aesthetics */
  width: 100%;
  font-size: 1.15rem;
  padding: 0.675em 6em 0.675em 1em;
  background-color: #fff;
  border: 1px solid #caced1;
  border-radius: 0.25rem;
  color: #000;
  cursor: pointer;
}

.custom-select::before,
.custom-select::after {
  --size: 0.3rem;
  content: "";
  position: absolute;
  right: 1rem;
  pointer-events: none;
}

.custom-select::before {
  border-left: var(--size) solid transparent;
  border-right: var(--size) solid transparent;
  border-bottom: var(--size) solid black;
  top: 40%;
}

.custom-select::after {
  border-left: var(--size) solid transparent;
  border-right: var(--size) solid transparent;
  border-top: var(--size) solid black;
  top: 55%;
}
</style>