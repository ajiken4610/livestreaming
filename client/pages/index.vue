<template lang="pug">
div
  table.table
    tbody
      tr(v-for="(value,key) in data")
        td {{key}}
        td {{value}}
</template>

<script setup lang="ts">
const data = ref({});
const socket = new WebSocket("ws://localhost:3050/");
socket.addEventListener("open", (e) => {
  console.log("Connected");
});

socket.addEventListener("message", (e) => {
  console.log(e.data);
  data.value = JSON.parse(e.data);
});

socket.addEventListener("close", (e) => {
  console.log("Connection lost");
});

socket.addEventListener("error", (e) => {
  console.error(e);
});
</script>
