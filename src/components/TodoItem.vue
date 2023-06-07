<script setup lang="ts">
export interface ITodo {
  text: string;
  done: boolean;
  id: number;
}

interface ITodoItemProps {
  todo: ITodo;
}
const props = defineProps<ITodoItemProps>();

interface ITodoItemEmits {
  (e: "todo:update", todo: ITodo): void;
}
const emits = defineEmits<ITodoItemEmits>();

function handleChecked() {
  emits("todo:update", {...props.todo, done: !props.todo.done})
}
</script>

<template>
  <li :class="['TodoItem', { TodoItem_isDone: todo.done }]">
    <input type="checkbox" :checked="todo.done" @change="handleChecked"/>
    <span>{{ todo.id }} : {{ todo.text }}</span>
  </li>
</template>

<style lang="scss">
.TodoItem {
  padding: 5px;
  background: blanchedalmond;
  border-radius: 5px;
  border: solid 1px gray;

  &_isDone {
    text-decoration-line: line-through;
  }
}
</style>
