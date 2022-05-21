import { shallowMount } from "@vue/test-utils";
import ChoreList from "@/components/ChoreList.vue";
import { createStore } from "vuex";
import { initialStoreState } from "./testStore";

// Tests for the Header component
describe("ChoreList.vue", () => {
  const store = createStore(initialStoreState);

  it("renders wrapper ", () => {
    const wrapper = shallowMount(ChoreList, {
      propsData: { chores: store.state.chores },
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  // Dynamically render number of columns
  it("renders columns", () => {
    const wrapper = shallowMount(ChoreList, {
      propsData: { chores: store.state.chores },
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.findAll("th").length).toBe(4);
    expect(wrapper.findAll("th").at(0).text()).toBe("");
    expect(wrapper.findAll("th").at(1).text()).toBe("Chore");
    expect(wrapper.findAll("th").at(2).text()).toBe("Due Date");
    expect(wrapper.findAll("th").at(3).text()).toBe("Assigned To");
  });

  //  Dynamically render number of chores
  it("renders chore data", () => {
    const wrapper = shallowMount(ChoreList, {
      propsData: { chores: store.state.chores },
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.findAll("tr").length).toBe(4);
    expect(wrapper.findAll("tr").at(1).findAll("td").at(1).text()).toBe(
      "Washing Dishes"
    );
    expect(wrapper.findAll("tr").at(2).findAll("td").at(1).text()).toBe(
      "Vacuuming"
    );
  });

  it("changes completed status on double click", async () => {
    const wrapper = shallowMount(ChoreList, {
      propsData: { chores: store.state.chores },
      global: {
        plugins: [store],
      },
    });

    expect(store.state.chores[0].completed).toBe(false);
    expect(store.state.chores[1].completed).toBe(false);

    await wrapper.findAll("tr").at(1).trigger("dblclick");
    expect(store.state.chores[0].completed).toBe(true);
    expect(store.state.chores[1].completed).toBe(false);

    await wrapper.findAll("tr").at(1).trigger("dblclick");
    await wrapper.findAll("tr").at(2).trigger("dblclick");
    expect(store.state.chores[0].completed).toBe(false);
    expect(store.state.chores[1].completed).toBe(true);
  });
});
