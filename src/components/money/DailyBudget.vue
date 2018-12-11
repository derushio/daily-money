<template lang='pug'>
.daily-budget
    p: h2.headline {{ index }} の情報

    .month.px-3
        p: h3.title 月の予算
        p: v-layout(wrap row align-center)
            v-flex(lg3 sm4 xs6): v-text-field(:value='month.budget' readonly)
            span 円
            v-flex(sm3 xs12).mx-2
                v-btn.fw.mx-0(@click='updateBudget') 予算を変更

        p: h3.title 今月の支出合計
        p: v-layout(wrap row align-center)
            v-flex(lg3 sm4 xs6): v-text-field(:value='getSumActionValues()' readonly)
            span 円

        p: h3.title 月の残予算
        p: v-layout(wrap row align-center)
            v-flex(lg3 sm4 xs6): v-text-field(:value='getNowBudget()' readonly)
            span 円
    v-divider.mb-3

    .daily.px-3
        p: h3.title １日あたりの予算
        p: v-layout(wrap row align-center)
            v-flex(lg3 sm4 xs6): v-text-field(:value='getDailyBudget()' readonly)
            span 円
    v-divider.mb-3

    .actions.px-3
        p: v-layout(wrap row)
            v-btn(@click='addAction') 収支を追加
    v-divider.mb-3

    .actions.px-3
        p: h3.title 収支リスト
        p: v-layout(wrap row)
            v-flex(v-for='action, i in month.actions' :key='i' lg4 sm6 xs12).pa-1
                v-hover
                    v-card.pointer(slot-scope='{ hover }'
                            :class='`elevation-${hover ? 12 : 2}`'
                            @click='openMonthActionDialog(action)')
                        v-card-text: v-layout(wrap row)
                            span {{ action.name }}
                            v-divider(vertical).mx-2
                            span {{ action.value }}
                            span 円
    v-divider.mb-3
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import MonthActionDialog from '@/components/money/dialog/MonthActionDialog.vue';
import { Month, MonthAction } from '@/store';

@Component
export default class DailyBudget extends Vue {
    @Prop({ type: String, required: true })
    protected index?: string;
    @Prop({ type: Object, required: true })
    protected month?: Month;
    @Prop({ type: Number, required: true })
    protected date?: number;
    @Prop({ type: Number, required: true })
    protected sectionDate?: number;

    protected getSumActionValues() {
        return this.month!.actions.reduce((prev, action) => {
            return prev + action.value;
        }, 0);
    }

    protected getNowBudget() {
        return this.month!.budget - this.getSumActionValues();
    }

    protected getDailyBudget() {
        return Math.floor(this.getNowBudget() / (31 - (this.date! - this.sectionDate!)));
    }

    protected async openMonthActionDialog(monthAction: MonthAction) {
        this.$vdialog.open({ component: MonthActionDialog, propsData: {
            index: this.index!, monthAction,
        } });
    }

    protected async updateBudget() {
        await this.$store.dispatch('updateBudget', { vm: this, index: this.index! });
    }

    protected async addAction() {
        await this.$store.dispatch('addAction', { vm: this, index: this.index! });
    }
}
</script>

<style lang='stylus' scoped>
@require '~@/assets/styles/entry/_variable.styl';

.daily-budget {}
</style>
