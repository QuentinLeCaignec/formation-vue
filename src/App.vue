<script setup lang="ts">
import {computed, reactive, ref} from "vue";

interface ITodo {
  text: string;
  done: boolean;
  id: number;
}

/* Static Data */
const labels = {
  button: "Ajouter TODO",
  empty: "Rien à faire !"
}

/* Methods */
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

/* Data */
const newTodo = ref<string | null>(null);
const todos = reactive<Array<ITodo>>([]);

/* Computed */
const emptyCondition = computed<boolean>(() => {
  return todos.length === 0 || (todos.length > 0 && todos.every(todo => todo.done))
})
</script>

<template>
  <div v-for="(todo, index) of todos" :key="index"
       :class="['Todo', { 'Todo_isDone': todo.done}]">
    <input type="checkbox" v-model="todo.done"/>
    <span>{{ todo.id }} : {{ todo.text }}</span>
  </div>
  <div>{{ emptyCondition ? labels.empty : "" }}</div>
  <form @submit.stop.prevent="handleSubmit">
    <input class="new-todo" v-model="newTodo">
    <button type="submit">{{ labels.button }}</button>
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
