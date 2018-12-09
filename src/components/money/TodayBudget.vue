<template lang='pug'>
.today-budget
    .month
        h2.title: p 今月の予算
        p {{ month.budget }}円
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
