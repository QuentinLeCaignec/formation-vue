<script setup lang="ts">
import {computed, reactive, ref} from "vue";

interface ITodo {
  text: string;
  done: boolean;
  id: number;
}

type TFilter = "all" | "todo" | "done";

/* Static Data */
const labels = {
  button: "Ajouter TODO",
  empty: "Rien à faire !",
  filters: {
    all: "Tous",
    todo: "À Faire",
    done: "Terminé"
  }
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
const currentFilter = ref<TFilter>("todo");

/* Computed */
const filteredTodos = computed(() => {
  if (currentFilter.value === "todo") {
    return todos.filter(todo => !todo.done)
  } else if (currentFilter.value === "done") {
    return todos.filter(todo => todo.done)
  } else {
    return todos
  }
})
const emptyCondition = computed<boolean>(() => {
  return todos.length === 0 || (todos.length > 0 && todos.every(todo => todo.done))
})
</script>

<template>
  <div class="TodoApp__Content">
    <div class="TodoApp__Todos">
      <div v-for="(todo, index) of filteredTodos" :key="index + todo.id"
           :class="['TodoApp__Todo', { 'TodoApp__Todo_isDone': todo.done}]">
        <input type="checkbox" v-model="todo.done"/>
        <span>{{ todo.id }} : {{ todo.text }}</span>
      </div>
    </div>
    <div>{{ emptyCondition ? labels.empty : "" }}</div>
    <div class="TodoApp__Filters">
      <div class="TodoApp__Filter">
        <input type="radio" name="filters" id="all" value="all" v-model="currentFilter">
        <label for="all">{{ labels.filters.all }}</label>
      </div>
      <div class="TodoApp__Filter">
        <input type="radio" name="filters" id="todo" value="todo" v-model="currentFilter">
        <label for="todo">{{ labels.filters.todo }}</label>
      </div>
      <div class="TodoApp__Filter">
        <input type="radio" name="filters" id="done" value="done" v-model="currentFilter">
        <label for="done">{{ labels.filters.done }}</label>
      </div>
    </div>
  </div>
  <form class="TodoApp__Form" @submit.stop.prevent="handleSubmit">
    <input class="new-todo" v-model="newTodo">
    <button type="submit">{{ labels.button }}</button>
  </form>
</template>

<style lang="scss">

.TodoApp {

  &__Content {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 10px;
  }

  &__Todos {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__Todo {
    padding: 5px;
    background: blanchedalmond;
    border-radius: 5px;
    border: solid 1px gray;

    &_isDone {
      text-decoration-line: line-through;
    }
  }

  &__Filters {
    display: flex;
    flex-direction: row;
    gap: 5px;
    justify-content: center;
    border: dashed 1px gray;
    border-radius: 5px;
    padding: 5px;
  }

  &__Filter {
    font-size: 12px;
    color: gray;
  }

  &__Form {
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 5px;
  }
}
</style>
