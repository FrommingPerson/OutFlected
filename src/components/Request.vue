<script setup>
import moment from "moment";
import {ref} from "vue";

const props = defineProps({
  request: {
    required: true,
    type: Object,
    default: null,
  },
  users: {
    required: true,
    type: Object,
    default: null,
  }
});


const role = localStorage.getItem("role");
const userId = localStorage.getItem("user");

let Request = props.request;

let isOpen = ref(false);

const emits = defineEmits(["remove", "update", "buy", "saveCheque"]);

const deleteReq = () => {
  emits("remove", props.request.id);
  // emits("remove", props.request.id);
}

const updateReq = () => {
  Request.date = moment(Date.now()).format('yyyy/MM/DD  HH:mm');
  emits("update", props.request.id, props.request);
}

const payReq = () => {
  Request.status = "Оплачено";
  Request.date = moment(Date.now()).format('yyyy/MM/DD  HH:mm');
  emits("buy");
}

const saveCheque = () => {
  emits("saveCheque");
}

const formattedDate = (data) => {
  return moment(data).format('yyyy/MM/DD hh:mm');
}
</script>

<template>
  <div class="request" v-if="request.user === userId || role === 'Admin'">
    <div>
      <h3>{{ request.title }}</h3>
      <p class="description">{{ request.description }}</p>
      <div v-if="role === 'User' && request.status === 'Сделано'">
        <p class="mark">Статус: ОПЛАТИТЕ РЕМОНТ || Приоритетность: {{ request.necessity }}</p>
      </div>
      <div v-else>
      <p class="mark">Статус: {{ request.status }} || Приоритетность: {{ request.necessity }}</p>
      </div>
      <p class="mark">Ответсвенный: {{ request.performer }}</p>
      <p class="date">{{ request.date }}</p>
    </div>

    <div class="buttons" v-if="request.status === 'Сделано' && role === 'User'">
      <button class="post" @click="payReq">Оплатить заказ</button>
    </div>

    <div class="buttons" v-else>
      <button class="delete" @click="deleteReq">Delete request</button>
      <br>
      <div v-if="request.status !== 'Оплачено'">
      <button class="open" @click="isOpen = !isOpen">Edit request</button>
      </div>
      <br>
      <div v-if="request.status === 'Оплачено'">
        <button class="open" @click="saveCheque">Сохранить чек</button>
      </div>
    </div>

    <div class="editor" v-if="isOpen">
      <input v-model="request.title" placeholder="Title" type="text" name="" id="">
      <br>
      <input v-model="request.description" placeholder="Description" type="text" name="" id="">
      <br>
      <div v-if="role === 'Admin'">
        <label class="text-white">Приоритетность:</label>
        <select v-model="request.necessity">
          <option>Не срочно</option>
          <option>Стандартно</option>
          <option>Срочно</option>
        </select>
        <br>
        <label class="text-white">Статус выполнения:</label>
        <select v-model="request.status">
          <option>На рассмотрении</option>
          <option>В процессе</option>
          <option>Сделано</option>
          <option>Оплачено</option>
        </select>
        <br>
        <label class="text-white">Выполняющий:</label>
        <select v-model="request.performer">
          <option v-for="performer in users.filter(e => {return (e.role === 'Worker')})">{{ performer.firstName }}
          </option>
        </select>
      </div>
      <br>
      <button class="post" @click="updateReq">Save</button>
    </div>
    <hr>
  </div>
</template>

<style scoped>
.date {
  font-size: 15px;
  color: #343434;
}

.request {
  border: solid grey 2px;
  padding: 12px;
  border-radius: 20px;
  margin-top: 20px;
  background-color: white;
}

input {
  border-radius: 20px;
  width: 26vmax;
  height: 3vmax;
  padding: 6px;
  margin-bottom: 16px;
  border: solid 2px gray;
  font-size: 16px;
}

.editor {
  margin-top: 15px;
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

.delete {
  font-size: 17px;
  background-color: rgba(231, 33, 33, 0.98);
  border-radius: 14px;
  border: solid #ff6246;
  color: white;
  padding: 2px 4px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
}

.open {
  font-size: 17px;
  background-color: #343434;
  border-radius: 20px;
  border: solid #1a1a1a;
  color: white;
  padding: 2px 4px;
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

hr {
  margin-top: 5px;
}

select {
  margin-left: 6px;
}

h3 {
  font-size: 26px;
  font-weight: bold;
}

.mark {
  font-size: 15px;
}

.description {
  font-weight: bolder;
  margin-bottom: 10px;
}
</style>