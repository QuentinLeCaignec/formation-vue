<script setup lang="ts">
import {computed, ref} from 'vue'
import type {ITodo} from "@/components/TodoItem.vue";
import TodoItem from "@/components/TodoItem.vue";

type TFilter = 'all' | 'todo' | 'done'

/* Static Data */
const labels = {
  button: 'Ajouter TODO',
  empty: 'Rien à faire !',
  filters: {
    all: 'Tous',
    todo: 'À Faire',
    done: 'Terminé'
  },
  notAllDone: 'Tout cocher',
  allDone: 'Tout décocher'
}

/* Methods */
function handleDoneChange() {
  const newValue = !allDone.value
  todos.value.map((todo) => (todo.done = newValue))
}

function handleUpdateTodo(updatedTodo: ITodo) {
  const i = todos.value.findIndex(todo => todo.id === updatedTodo.id)
  todos.value[i] = updatedTodo;
}

function handleSubmit() {
  if (newTodo.value !== null) {
    const newTodoObject: ITodo = {
      text: newTodo.value as string,
      done: false,
      id: todos.value.length + 1
    }
    todos.value.push(newTodoObject)
    newTodo.value = null
  }
}

/* Data */
const newTodo = ref<string | null>(null)
const todos = ref<Array<ITodo>>([])
const currentFilter = ref<TFilter>('todo')

/* Computed */
const filteredTodos = computed<Array<ITodo>>(() => {
  if (currentFilter.value === 'todo') {
    return todos.value.filter((todo) => !todo.done)
  } else if (currentFilter.value === 'done') {
    return todos.value.filter((todo) => todo.done)
  } else {
    return todos.value
  }
})
const emptyCondition = computed<boolean>(() => todos.value.length === 0)
const allDone = computed<boolean>(() => todos.value.every((todo) => todo.done))
const indeterminate = computed<boolean>(
    () => !todos.value.every((todo) => todo.done) && todos.value.some((todo) => todo.done)
)
</script>

<template>
  <h1 class="TodoApp__Title">Todo App</h1>
  <div class="TodoApp__Content">
    <ul class="TodoApp__Todos">
      <li class="TodoApp__Empty" v-if="emptyCondition || allDone">{{ labels.empty }}</li>
      <TodoItem v-for="(todo, index) of filteredTodos" :key="`${index}_${todo.id}`"
                :todo="todo" @todo:update="handleUpdateTodo"/>
    </ul>
    <div class="TodoApp__Filters">
      <div class="TodoApp__Filter">
        <input type="radio" name="filters" id="all" value="all" v-model="currentFilter"/>
        <label for="all">{{ labels.filters.all }}</label>
      </div>
      <div class="TodoApp__Filter">
        <input type="radio" name="filters" id="todo" value="todo" v-model="currentFilter"/>
        <label for="todo">{{ labels.filters.todo }}</label>
      </div>
      <div class="TodoApp__Filter">
        <input type="radio" name="filters" id="done" value="done" v-model="currentFilter"/>
        <label for="done">{{ labels.filters.done }}</label>
      </div>
    </div>
    <div class="TodoApp__AllDone" v-if="!emptyCondition">
      <input
          type="checkbox"
          id="allDone"
          :checked="allDone"
          :indeterminate="indeterminate"
          @change="handleDoneChange"
      />
      <label for="allDone" v-if="allDone">{{ labels.allDone }}</label>
      <label for="allDone" v-else>{{ labels.notAllDone }}</label>
    </div>
  </div>
  <form class="TodoApp__Form" @submit.stop.prevent="handleSubmit">
    <input class="new-todo" v-model="newTodo"/>
    <button type="submit">{{ labels.button }}</button>
  </form>
</template>

<style lang="scss">
.TodoApp {
  &__Title {
    font-size: 18px;
    text-align: center;
    margin: 0;
  }

  &__Content {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin: 10px 0;
  }

  &__Empty {
    text-align: center;
    font-size: 12px;
  }

  &__Todos {
    display: flex;
    flex-direction: column;
    gap: 5px;
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

  &__AllDone {
    font-size: 12px;
    color: gray;
    text-align: center;
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
