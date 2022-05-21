import { shallowMount } from "@vue/test-utils";
import UserList from "@/components/UserList.vue";
import { createStore } from "vuex";
import { initialStoreState } from "./testStore";

describe("UserList.Vue", () => {
  const store = createStore(initialStoreState);

  it("renders wrapper", () => {
    const wrapper = shallowMount(UserList, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("renders user list", () => {
    const wrapper = shallowMount(UserList, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.findAll("li").length).toBe(3);
    expect(wrapper.findAll("li").at(0).text()).toBe("Nic");
  });

  it("adds user", async () => {
    const wrapper = shallowMount(UserList, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.findAll("li").length).toBe(3);

    await wrapper.find("input").setValue("Nic");
    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.findAll("li").length).toBe(4);
  });

  it("doesn't add user", async () => {
    const wrapper = shallowMount(UserList, {
      global: {
        plugins: [store],
      },
    });

    // Store modified by previous test
    expect(wrapper.findAll("li").length).toBe(4);

    await wrapper.find("input").setValue("");
    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.findAll("li").length).toBe(4);
  });
});
