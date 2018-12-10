<template lang='pug'>
v-container#home(fluid fill-height)
    v-layout(justify-center): v-flex(xs12 sm10 md8)
        daily-budget(v-if='getCurrent() != null'
                :index='getIndex()' :month='getCurrent()'
                :date='getDate()' :section-date='getSectionDate()')
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import DailyBudget from '@/components/money/DailyBudget.vue';
import { Month } from '@/store';

@Component({
    components: {
        DailyBudget,
    },
})
export default class Home extends Vue {
    protected date = new Date();

    protected getYear() {
        let year = this.date.getFullYear();
        if (this.date.getMonth() + 1 === 1
                && this.date.getDate() < this.getSectionDate()) {
            year--;
        }
        return year;
    }

    protected getMonth() {
        let month = this.date.getMonth() + 1;
        if (this.date.getDate() < this.getSectionDate()) {
            month--;
            if (month === 0) {
                // 年をまたいだ考慮
                month = 12;
            }
        }
        return month;
    }

    protected getDate() {
        let date = this.date.getDate();
        if (this.date.getDate() < this.getSectionDate()) {
            // TODO: 厳密にやる
            date += 31;
        }
        return date;
    }

    protected getSectionDate() {
        return 10;
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
            await this.$store.dispatch('newMonth', { vm: this, index: this.getIndex() });
            // this.$forceUpdate();
        }
    }
}
</script>

<style lang='stylus' scoped>
@require '~@/assets/styles/entry/_variable.styl';

#home {}
</style>
