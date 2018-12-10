<template lang='pug'>
v-card.month-action-dialog
    v-card-title {{ monthAction.name }}
    v-card-text {{ monthAction.value }} 円
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { MonthAction } from '@/store';

@Component
export default class MonthActionDialog extends Vue {
    @Prop({ type: Object, required: true })
    protected monthAction?: MonthAction;
}
</script>

<style lang='stylus' scoped>
@require '~@/assets/styles/entry/_variable.styl';

.month-action-dialog {}
</style>
