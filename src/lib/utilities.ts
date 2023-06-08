import type {ITodo} from "@/types/todo";

export function removeNulls<T>(
    value: T | undefined | Record<string, never>,
): value is Exclude<T, null> {
    return value != null && Object.keys(value).length !== 0;
}

export function isTodo(todo: any): todo is ITodo {
    return todo &&
        typeof todo === "object" &&
        "id" in todo &&
        "text" in todo &&
        "done" in todo;
}
