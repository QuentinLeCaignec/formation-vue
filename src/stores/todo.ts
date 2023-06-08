import {defineStore} from "pinia";
import type {ITodo} from "@/types/todo";
import {computed, ref} from "vue";

export const useTodoStore = defineStore("todo", () => {
    const todos = ref<Array<ITodo>>();
    const getTodos = computed(() => todos.value)

    function setTodos(newValue: Array<ITodo>) {
        todos.value = newValue
    }

    return {todos, getTodos, setTodos}
})
