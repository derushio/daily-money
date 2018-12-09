<template lang='pug'>
.daily-budget
    h2.headline {{ index }} の情報

    v-container.month
        h3.title 月の予算
        v-layout(wrap row align-center)
            v-text-field(:value='month.budget' readonly)
            span 円
            v-flex(sm3 xs12).mx-2
                v-btn.fw.mx-0(@click='changeBudget') 予算を変更
    v-divider

    v-container.daily
        h3.title １日あたりの予算
        v-layout(wrap row align-center)
            v-text-field(:value='getDailyBudget()' readonly)
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
}
</script>

<style lang='stylus' scoped>
@require '~@/assets/styles/entry/_variable.styl';

.daily-budget {}
</style>
