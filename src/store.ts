import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        currentMonth: '',
        monthList: {
        } as MonthList,
    },
    mutations: {
        setCurrentMonth: (state, currentMonth: string) => {
            state.currentMonth = currentMonth;
        },
        setMonthList: (state, monthList: MonthList) => {
            state.monthList = monthList;
        },
    },
    actions: {
        newMonth: async (context, args: { vm: Vue, index: string }) => {
            const result = (await args.vm.$vdialog.prompt({
                message: `${args.index}月の予算を入力してください`,
                persistent: true,
            }).promise);
            const budget = parseInt(result.text, 10);
            if (Number.isNaN(budget)) {
                await args.vm.$vdialog.alert('値が不正です').promise;
                context.dispatch('newMonth', args);
                return;
            }

            context.state.monthList[args.index] = {
                budget,
                actions: [],
            };
            context.commit('setMonthList', context.state.monthList);

            context.dispatch('save');
        },

        save: (context) => {
            localStorage.setItem('timestamp', (new Date()).getTime().toString());
            localStorage.setItem('currentMonth', context.state.currentMonth);

            const monthIndexes = Object.keys(context.state.monthList);
            localStorage.setItem('monthIndexes', JSON.stringify(monthIndexes));

            for (const key of monthIndexes) {
                localStorage.setItem(key, JSON.stringify(context.state.monthList[key]));
            }
        },
        load: (context) => {
            const timestamp = localStorage.getItem('timestamp');
            if (timestamp == null) {
                throw new Error('no data');
            }

            const currentMonth = localStorage.getItem('currentMonth')!;
            const monthIndexes = JSON.parse(localStorage.getItem('monthIndexes')!);

            const monthList = {} as MonthList;
            for (const key of monthIndexes) {
                monthList[key] = JSON.parse(localStorage.getItem(key)!);
            }

            context.commit('setCurrentMonth', currentMonth);
            context.commit('setMonthList', monthList);
        },
    },
});

export default store;

export interface Month {
    budget: number;
    actions: Array<{
        name: string;
        value: number;
    }>;
}

export interface MonthList {
    [key: string]: Month;
}
