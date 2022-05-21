// Add the following tests

// Does it pull from localStorage?


import {shallowMount} from "@vue/test-utils";
import App from "@/App.vue";
import { initialStoreState } from "./testStore";
import { createStore } from "vuex";

describe("App.vue", () => {
    const store = createStore(initialStoreState)
    it("renders", () => {
        const wrapper = shallowMount(App, {
            global: {
              plugins: [store],
            },
          });
                  expect(wrapper.exists()).toBe(true);
    });

    
})
