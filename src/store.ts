import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        currentMonth: '',
        sectionDate: 1,
        monthList: {
        } as MonthList,
    },
    mutations: {
        setCurrentMonth: (state, currentMonth: string) => {
            state.currentMonth = currentMonth;
        },
        setSectionDate: (state, sectionDate: number) => {
            if (Number.isNaN(sectionDate) || 28 < sectionDate) {
                sectionDate = 1;
            }
            state.sectionDate = sectionDate;
        },
        setMonthList: (state, monthList: MonthList) => {
            state.monthList = monthList;
        },
    },
    actions: {
        changeSectionDate: async (context, args: { vm: Vue }) => {
            const result = await args.vm.$vdialog.prompt({
                message: `予算のリセット日を入力してください (1〜28)`,
            }).promise;
            if (!result.confirm) { return; }
            const date = parseInt(result.text, 10);
            if (Number.isNaN(date) || 28 < date) {
                await args.vm.$vdialog.alert('値が不正です').promise;
                return await context.dispatch('setSectionDate', args);
            }

            context.commit('setSectionDate', date);
            context.dispatch('save');
        },
        newMonth: async (context, args: { vm: Vue, index: string }) => {
            const result = await args.vm.$vdialog.prompt({
                message: `${args.index}月の予算を入力してください`,
                persistent: true,
            }).promise;
            const budget = parseInt(result.text, 10);
            if (Number.isNaN(budget)) {
                await args.vm.$vdialog.alert('値が不正です').promise;
                return await context.dispatch('newMonth', args);
            }

            Vue.set(context.state.monthList, args.index, {
                budget,
                actions: [],
            });
            context.commit('setMonthList', context.state.monthList);
            context.dispatch('save');
        },
        changeBudget: async (context, args: { vm: Vue, index: string }) => {
            const result = await args.vm.$vdialog.prompt({
                message: `${args.index}月の予算を入力してください`,
            }).promise;
            if (!result.confirm) { return; }

            const budget = parseInt(result.text, 10);
            if (Number.isNaN(budget)) {
                await args.vm.$vdialog.alert('値が不正です').promise;
                return await context.dispatch('changeBudget', args);
            }

            context.state.monthList[args.index].budget = budget;
            context.commit('setMonthList', context.state.monthList);
            context.dispatch('save');
        },
        addAction: async (context, args: { vm: Vue, index: string }) => {
            const nameResult = await args.vm.$vdialog.prompt({
                message: `収支タイトルを入力してください`,
            }).promise;
            if (!nameResult.confirm) { return; }

            const valueResult = await args.vm.$vdialog.prompt({
                message: `収支額を入力してください`,
            }).promise;
            if (!valueResult.confirm) { return; }

            const name = nameResult.text;
            const value = parseInt(valueResult.text, 10);
            if (Number.isNaN(value)) {
                await args.vm.$vdialog.alert('値が不正です').promise;
                return await context.dispatch('addAction', args);
            }

            context.state.monthList[args.index].actions.push({
                name, value,
            });
            context.commit('setMonthList', context.state.monthList);
            context.dispatch('save');
        },

        save: (context) => {
            localStorage.setItem('timestamp', (new Date()).getTime().toString());
            localStorage.setItem('currentMonth', context.state.currentMonth);
            localStorage.setItem('sectionDate', context.state.sectionDate.toString());

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
            const sectionDate = parseInt(localStorage.getItem('sectionDate')!, 10);
            const monthIndexes = JSON.parse(localStorage.getItem('monthIndexes')!);

            const monthList = {} as MonthList;
            for (const key of monthIndexes) {
                monthList[key] = JSON.parse(localStorage.getItem(key)!);
            }

            context.commit('setCurrentMonth', currentMonth);
            context.commit('setSectionDate', sectionDate);
            context.commit('setMonthList', monthList);
        },
    },
});

export default store;

export interface Month {
    budget: number;
    actions: MonthAction[];
}

export interface MonthAction {
    name: string;
    value: number;
}

export interface MonthList {
    [key: string]: Month;
}
