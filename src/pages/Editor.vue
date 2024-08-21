<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";
import moment from "moment";
import Request from "@/components/Request.vue";

const role = localStorage.getItem("role");
const userId = localStorage.getItem("user");

let form = ref({
  title: '',
  description: '',
  status: '',
  necessity: '',
  date: moment(Date.now()).format('yyyy/MM/DD  HH:mm'),
  user: userId,
  performer: '',
  // photo: File,
});

let requests = ref([]);
let performers = ref([]);
const users = ref([]);

let isOpened = ref(false);

console.log(`The role from editor: ${role} and the user's id is ${userId}`);

onMounted(() => {
  getRequests();
  getUsers();
});

async function postRequest() {
  if (form.value.title === '' && form.value.description === '' && form.value.status === '' && form.value.necessity === '') {
    alert("Вы ничего не написали!");
  } else {
    requests.value.push(form.value);
    await axios.post("http://localhost:3000/requests",
        form.value
    ).then(res => {
      requests.value.push(res.data);
    }).catch(err => {
      console.log(err);
    })
  }
  console.log("Function is called post a request");
}

async function getRequests() {
  let result = await axios.get("http://localhost:3000/").then(data => {
    requests.value = (data.data);
    console.log(requests.value);
  }).catch(err => {
    console.log(err);
  });
  console.log("Function is called get " + result);
}

async function getUsers() {
  axios.get(`http://localhost:3000/users`).then(res => {
    console.log(res.data);
    users.value = res.data;
  }).catch(err => {
    console.log(err);
  });
}

async function deleteRequest(index, id) {
  requests.value.splice(index, 1);
  // let id = requests.value[index].id;
  await axios.delete(`http://localhost:3000/request/:${id}`).then(res => {
    console.log(requests.value);
  }).catch(err => {
    console.log(err);
  });
}

async function updateRequest(id, data) {
  await axios.put(`http://localhost:3000/updateReq/:${id}`, data);
}

async function toBuy(index, id, data) {
  await axios.put(`http://localhost:3000/updateReq/:${id}`, data);
}

async function toGetTheCheque(id) {
  await axios.get(`http://localhost:3000/cheque/:${id}`).then(() => {
    console.log('The cheque was gotten successfully');
    window.open(`http://localhost:3000/cheque/:${id}`);
  }).catch(err => {
    console.log(err);
  });
}
</script>

<template>
<!--  <img src="http://localhost:3000/SCARLET_NEXUS.jpg" alt="Scarlet Nexus">-->
  <h1 v-if="role">Редактор заявок на ремонт</h1>
  <div v-if="role" class="editor">
    <input v-model="form.title" placeholder="Title" type="text" name="" id="">
    <br>
    <input v-model="form.description" placeholder="Description" type="text" name="" id="">
    <br>
<!--    <input v-on="form.photo" placeholder="photo" type="file" name="" id="">-->
<!--    <br>-->
    <div v-if="role === 'Admin'">
      <label class="text-white">Приоритетность</label>
      <div class="custom-select">
        <select v-model="form.necessity">
          <option>Не срочно</option>
          <option>Стандартно</option>
          <option>Срочно</option>
        </select>
      </div>
      <!--      <br>-->
    </div>
    <div v-if="role === 'Admin'">
      <label class="text-white">Статус заказа</label>
      <div class="custom-select">
        <select v-model="form.status">
          <option>На рассмотрении</option>
          <option>В процессе</option>
          <option>Сделано</option>
          <option>Оплачено</option>
        </select>
      </div>
      <br>
    </div>
    <div v-if="role === 'Admin'">
      <label class="text-white">Выполняющий</label>
      <div class="custom-select">
        <select v-model="form.performer">
          <option v-for="(performer, index) in users.filter(e => {return (e.role === 'Worker')})">
            {{ performer.firstName }}
          </option>
        </select>
      </div>
    </div>
    <div class="space">
      <button class="post" @click="postRequest">To send</button>
    </div>
  </div>
  <div v-if="role" class="editor" v-for="(request, index) in requests">
    <request @update="updateRequest(request.id, request)" @saveCheque="toGetTheCheque(request.id)"
             @remove="deleteRequest(index, requests[index].id)" @buy="toBuy(index, request.id, request)"
             :users="users"
             :request="request"></request>
  </div>
  <div class="buttons">
    <button class="open" @click="isOpened = !isOpened">Click to open the statistics</button>
  </div>
  <div class="text" v-if="isOpened">
    <p> Оплаченные заказы:
      {{
        requests.filter(e => {
          return (e.status === "Оплачено")
        }).length
      }}
    </p>
    <p> Выполененые заказы:
      {{
        requests.filter(e => {
          return (e.status === "Сделано")
        }).length
      }}
    </p>
    <p>Выполняемые заказы:  {{requests.length}}</p>
  </div>
</template>

<style scoped>
h1 {
  font-family: Baghdad, serif;
  font-size: 46px;
  text-align: center;
  position: relative;
  top: -50px;
}

.editor {
  position: relative;
  top: -40px;
}

input {
  border-radius: 20px;
  width: 41vmax;
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

.buttons {
  margin-top: -20px;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-select {
  min-width: 350px;
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

.open {
  width: 40vmax;
  font-size: 17px;
  background-color: #939393;
  border-radius: 10px;
  border: solid #4b4b4b;
  color: white;
  padding: 2px 4px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
}

/*=============
Aesthetics
=========================*/

* {
  box-sizing: border-box;
}

.text {
  text-align: center;
  background-color: white;
}

.space {
  margin-top: 20px;
}

img {
  width: 20vmax;
  height: 13vmax;
}
</style>