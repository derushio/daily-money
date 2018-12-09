import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentMonth: '',
        monthList: {
        } as { [key: string]: Month },
    },
    mutations: {
        newMonth: (state, args: { month: string, budget: number }) => {
            state.monthList[args.month] = {
                budget: args.budget,
                actions: [],
            };
        },
    },
    actions: {
    },
});

export interface Month {
    budget: number;
    actions: Array<{
        name: string;
        value: number;
    }>;
}
