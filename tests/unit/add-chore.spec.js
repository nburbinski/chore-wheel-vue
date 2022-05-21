import { shallowMount } from "@vue/test-utils";
import AddChore from "@/components/AddChore.vue";
import { createStore } from "vuex";
import { initialStoreState } from "./testStore";

describe("AddChore.vue", () => {
  const store = createStore(initialStoreState);
  it("renders wrapper", () => {
    const wrapper = shallowMount(AddChore, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });


  // Refactored into Chore List Component

  // it("renders form", () => {
  //   const wrapper = shallowMount(AddChore, {
  //     global: {
  //       plugins: [store],
  //     },
  //   });
  //   expect(wrapper.find("form").exists()).toBe(true);
  //   expect(wrapper.findAll("input").length).toBe(2);
  //   expect(wrapper.findAll("select").length).toBe(1);
  //   expect(wrapper.findAll("option").length).toBe(4);

  //   expect(wrapper.find("button").exists()).toBe(true);
  // });

  // it("renders label", () => {
  //   const wrapper = shallowMount(AddChore, {
  //     global: {
  //       plugins: [store],
  //     },
  //   });
  //   expect(wrapper.findAll("label").length).toBe(3);
  // });

  // it("doesn't run on empty submit", async () => {
  //   const wrapper = shallowMount(AddChore, {
  //     global: {
  //       plugins: [store],
  //     },
  //   });
  //   await wrapper.find("form").trigger("submit.prevent");

  //   expect(wrapper.emitted("add")).toBe(undefined);
  // });

  // it("runs on valid submit", async () => {
  //   const wrapper = shallowMount(AddChore, {
  //     global: {
  //       plugins: [store],
  //     },
  //   });
  //   const inputs = wrapper.findAll("input");

  //   // Check initial length
  //   expect(store.state.chores.length).toBe(2);

  //   // Set inputs and add chore
  //   await inputs.at(0).setValue("test chore");
  //   await inputs.at(1).setValue("2019-03-15");
  //   await wrapper.find("select").setValue("Nic");
  //   await wrapper.find("form").trigger("submit.prevent");

  //   expect(store.state.chores.length).toBe(3);
  // });
});
