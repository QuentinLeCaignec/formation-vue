import {createRouter, createWebHistory} from "vue-router";
import TodoList from "@/components/TodoList/TodoList.vue";
import Test from "@/components/Test/Test.vue";

const routes = [
    // {path: "*", redirect: "/"},
    {path: "/", components: {main: TodoList}},
    {path: "/test", components: {main: Test}}
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
