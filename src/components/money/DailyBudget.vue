<template lang='pug'>
.daily-budget
    h2.headline: p {{ index }} の情報

    v-container.month
        h3.title: p 月の予算
        v-layout(wrap row align-center)
            v-flex(lg3 sm4 xs6): v-text-field(:value='month.budget' readonly)
            span 円
            v-flex(sm3 xs12).mx-2
                v-btn.fw.mx-0(@click='changeBudget') 予算を変更
    v-divider

    v-container.daily
        h3.title: p １日あたりの予算
        v-layout(wrap row align-center)
            v-flex(lg3 sm4 xs6): v-text-field(:value='getDailyBudget()' readonly)
            span 円
    v-divider

    v-container.actions
        v-layout(wrap row)
            v-btn(@click='addAction') 収支を追加
    v-divider

    v-container.actions
        h3.title: p 収支リスト
        v-layout(wrap row)
            v-flex(v-for='action in month.actions' lg4 sm6 xs12).pa-1: v-card
                v-card-text: v-layout(wrap row)
                    span {{ action.name }}
                    v-divider(vertical).mx-2
                    span {{ action.value }}
                    span 円
    v-divider
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Month } from '@/store';

@Component
export default class DailyBudget extends Vue {
    @Prop({ type: String, required: true })
    protected index?: string;
    @Prop({ type: Object, required: true })
    protected month?: Month;

    protected getDailyBudget() {
        return Math.floor(this.month!.budget / 31);
    }

    protected async changeBudget() {
        await this.$store.dispatch('changeBudget', { vm: this, index: this.index! });
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
