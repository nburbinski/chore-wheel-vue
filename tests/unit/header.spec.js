import { shallowMount } from "@vue/test-utils";
import Header from "@/components/Header.vue";

// Tests for the Header component
describe("Header.vue", () => {
  it("renders title ", () => {
    const wrapper = shallowMount(Header);
    expect(wrapper.find("h1").text()).toBe("Chore Wheel");
  });
});
