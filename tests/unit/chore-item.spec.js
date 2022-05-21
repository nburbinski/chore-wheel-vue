import { shallowMount } from "@vue/test-utils";
import ChoreItem from "@/components/ChoreItem.vue";

describe("ChoreItem.vue", () => {
  const wrapper = shallowMount(ChoreItem);
  it("renders Chore component", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
