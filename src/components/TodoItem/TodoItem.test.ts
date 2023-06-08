import {describe, it, expect} from "vitest";
import {mount} from "@vue/test-utils";
import TodoItem from "@/components/TodoItem/TodoItem.vue";

const mockTodoItem = {id: 1, text: "mon texte", done: false};

describe('TodoItem', () => {
    const wrapper = mount(TodoItem, {
        props: {todo: mockTodoItem}
    });

    it("renders and displays prop text", () => {
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.find("[data-testid='test-text']").text()).toBe("mon texte")
    })
    it("goes into editing mode when right checkbox is clicked", async () => {
        const checkbox = wrapper.get("[data-testid='test-checkbox']");
        await checkbox.setValue(true);
        const input = wrapper.find("[data-testid='test-input']");
        expect(input.exists()).toBe(true);
    })
});
