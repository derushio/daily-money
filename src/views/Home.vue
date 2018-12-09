<template lang='pug'>
v-container#home(fluid fill-height)
    v-layout(justify-center): v-flex(xs12 sm10 md8)
        template(v-if='getCurrent() != null')
            today-budget(:month='getCurrent()')
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import TodayBudget from '@/components/money/TodayBudget.vue';
import { Month } from '@/store';

@Component({
    components: {
        TodayBudget,
    },
})
export default class Home extends Vue {
    protected getYear() {
        return new Date().getFullYear();
    }

    protected getMonth() {
        return new Date().getMonth() + 1;
    }

    protected getIndex() {
        return `${this.getYear()}/${this.getMonth()}`;
    }

    protected getCurrent() {
        return this.$store.state.monthList[this.getIndex()];
    }

    protected async mounted() {
        await this.loadMonth();
    }

    protected async loadMonth() {
        const month = this.getCurrent() as Month | undefined;
        if (month == null) {
            await this.$vdialog.alert('データがありません、新規作成します').promise;
            await this.newMonth();
        }
    }

    protected async newMonth() {
        const result = (await this.$vdialog.prompt('今月の予算を入力してください')
            .promise);
        const budget = parseInt(result.text, 10);
        if (!result.confirm) {
            this.loadMonth();
            return;
        }
        if (Number.isNaN(budget)) {
            await this.$vdialog.alert('値が不正です').promise;
            this.newMonth();
            return;
        }

        this.$store.commit('newMonth', {
            month: this.getIndex(),
            budget,
        });
        // TODO: forceUpdate以外の方法
        this.$forceUpdate();
    }
}
</script>

<style lang='stylus' scoped>
@require '~@/assets/styles/entry/_variable.styl';

#home {}
</style>
