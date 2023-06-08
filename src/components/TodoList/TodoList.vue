<script setup lang="ts">
import {computed, onMounted, onUpdated, ref} from 'vue'
import type {ITodo} from '@/types/todo'
import {isTodo, removeNulls} from "@/lib/utilities";
import {useTodoStore} from "@/stores/todo";
import TodoItem from "@/components/TodoItem/TodoItem.vue";

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
  const i = todos.value.findIndex((todo) => todo.id === updatedTodo.id)
  todos.value[i] = updatedTodo
}

function handleRemove(removedTodo: ITodo) {
  todos.value = todos.value.filter(todo => todo.id !== removedTodo.id)
}

function getHighestIdIncrement() {
  return todos.value.reduce((max, todo) => todo.id > max ? todo.id : max, 0)
}

function getTodosFromStorage(): Array<ITodo> {
  return [...JSON.parse(localStorage.getItem("todos"))].filter(todo => isTodo(todo)).filter(removeNulls);
}

function handleSubmit() {
  if (newTodo.value !== null) {
    const newTodoObject: ITodo = {
      text: newTodo.value as string,
      done: false,
      id: ++increment.value,
    }
    todos.value.push(newTodoObject)
    newTodo.value = null
  }
}

/* Data */
const todoStore = useTodoStore();
const todos = ref<Array<ITodo>>(getTodosFromStorage());
const newTodo = ref<string | null>(null);
const increment = ref<number>(getHighestIdIncrement());
const currentFilter = ref<TFilter>('todo');
const inputRef = ref<HTMLInputElement>();

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

onMounted(() => {
  inputRef.value?.focus();
})

onUpdated(() => {
  if (todos.value.length > 0) {
    localStorage.setItem("todos", JSON.stringify(todos.value));
    todoStore.setTodos(todos.value);
  }
})
</script>

<template>
  <div class="TodoList">
    <div class="TodoList__Content">
      <span>{{ JSON.stringify(todoStore.getTodos) }}</span>
      <ul class="TodoList__Todos">
        <li class="TodoList__Empty" v-if="emptyCondition || allDone">{{ labels.empty }}</li>
        <TodoItem
            v-for="(todo, index) of filteredTodos"
            :key="`${index}_${todo.id}`"
            :todo="todo"
            @todo:update="handleUpdateTodo"
        >
          <button class="TodoList__Button" @click="handleRemove(todo)">X</button>
        </TodoItem>
      </ul>
      <div class="TodoList__Filters">
        <div class="TodoList__Filter">
          <input type="radio" name="filters" id="all" value="all" v-model="currentFilter"/>
          <label for="all">{{ labels.filters.all }}</label>
        </div>
        <div class="TodoList__Filter">
          <input type="radio" name="filters" id="todo" value="todo" v-model="currentFilter"/>
          <label for="todo">{{ labels.filters.todo }}</label>
        </div>
        <div class="TodoList__Filter">
          <input type="radio" name="filters" id="done" value="done" v-model="currentFilter"/>
          <label for="done">{{ labels.filters.done }}</label>
        </div>
      </div>
      <div class="TodoList__AllDone" v-if="!emptyCondition">
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
    <form class="TodoList__Form" @submit.stop.prevent="handleSubmit">
      <input class="new-todo" v-model="newTodo" ref="inputRef"/>
      <button type="submit">{{ labels.button }}</button>
    </form>
  </div>
</template>

<style lang="scss">
.TodoList {
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
    list-style: none;
    margin: 0;
    padding: 0;
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

  &__Button {
    height: 50%;
    margin: auto;
  }
}
</style>
