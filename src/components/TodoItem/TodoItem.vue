<script setup lang="ts">
import {nextTick, ref, watch} from 'vue'
import type {ITodo} from '@/types/todo'

type ITodoItemProps = {
  todo: ITodo
}
const props = defineProps<ITodoItemProps>()
type ITodoItemEmits = {
  (e: 'todo:update', todo: ITodo): void
}
const emits = defineEmits<ITodoItemEmits>()

/* Methods */
function handleDone() {
  emits("todo:update", {
    ...props.todo,
    done: !props.todo.done
  })
}

function handleUpdate(e: SubmitEvent) {
  const formData = e.target as HTMLFormControlsCollection;
  emits('todo:update', {
    ...props.todo,
    text: formData["text"].value,
  })
  isEditing.value = false;
}

/* Data */
const isEditing = ref<boolean>(false);
const inputRef = ref<HTMLInputElement>();

watch(isEditing, async () => {
  inputRef.value?.focus();
}, {flush: "post"})

</script>

<template>
  <li class="TodoItem__Container">
    <div :class="['TodoItem', { TodoItem_isDone: todo.done }]">
      <input type="checkbox" :checked="todo.done" @change="handleDone"
             :disabled="isEditing"/>
      <span v-if="!isEditing" data-testid="test-text">{{ todo.text }}</span>
      <form v-else @submit.prevent="handleUpdate">
        <input name="text" :value="todo.text" ref="inputRef" data-testid="test-input"/>
      </form>
    </div>
    <input type="checkbox" v-model="isEditing" data-testid="test-checkbox">
    <slot/>
  </li>
</template>

<style lang="scss">
.TodoItem {
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: 5px;
  padding: 5px;
  background: blanchedalmond;
  border-radius: 5px;
  border: solid 1px gray;
  min-height: 25px;
  align-items: center;

  &_isDone {
    text-decoration-line: line-through;
    background: lightgray;
  }

  &__Container {
    display: flex;
    flex-direction: row;
    gap: 5px;
  }
}
</style>
