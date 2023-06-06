<script setup lang="ts">
import {reactive, ref} from "vue";

interface ITodo {
  text: string;
  done: boolean;
  id: number;
}

const newTodo = ref<string | null>(null);
const todos = reactive<Array<ITodo>>([]);

function handleSubmit() {
  if (newTodo.value !== null) {
    const newTodoObject: ITodo = {
      text: newTodo.value as string,
      done: false,
      id: todos.length + 1
    }
    todos.push(newTodoObject);
    newTodo.value = null;
  }
}
</script>

<template>
  <div v-for="(todo, index) of todos" :key="index"
       :class="['Todo', { 'Todo_isDone': todo.done}]">
    <input type="checkbox" v-model="todo.done"/>
    <span>{{ todo.id }} : {{ todo.text }}</span>
  </div>
  <form @submit.stop.prevent="handleSubmit">
    <input class="new-todo" v-model="newTodo">
    <button type="submit">Ajouter TODO</button>
  </form>
</template>

<style lang="scss">

.Todo {
  padding: 5px;

  &_isDone {
    text-decoration-line: line-through;
  }
}
</style>
