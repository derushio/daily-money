<template lang='pug'>
.today-budget
    .month
        h2.title 今月の予算
        v-layout(wrap row align-center)
            v-text-field(v-model='month.budget' readonly)
            v-btn 予算を変更
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Month } from '@/store';

@Component
export default class TodayBudget extends Vue {
    @Prop({ type: Object })
    protected month?: Month;
}
</script>

<style lang='stylus' scoped>
@require '~@/assets/styles/entry/_variable.styl';

.today-budget {}
</style>
