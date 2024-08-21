<script setup>
const props = defineProps({
  user: {
    required: true,
    type: Object,
    default: null,
  }
});

const emits = defineEmits(["remove"]);

const deleteUser = () => {
  emits("remove", props.user.id);
}
</script>

<template>
  <div class="user">

    <div>
      <p>FirstName: {{ user.firstName }}</p>
      <p>LastName: {{ user.lastName }}</p>
      <p>Login: {{ user.login }}</p>
      <p>Role: {{ user.role }}</p>
    </div>

    <div class="buttons">
      <button class="delete" @click="deleteUser">Delete user</button>
    </div>
  </div>
</template>

<style scoped>
.user {
  border: solid grey 2px;
  padding: 12px;
  border-radius: 20px;
  margin-top: 20px;
  background-color: white;
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
</style>