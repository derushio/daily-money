<template lang='pug'>
v-card.month-action-dialog
    v-card-title.title.grey.lighten-2(headline) {{ monthAction.name }}
    v-card-text
        v-layout(wrap row align-center)
            v-text-field(v-model='value' type='number')
            span 円
    v-card-actions
        v-spacer
        v-btn(flat color='error' @click='remove') REMOVE
        v-btn(flat color='warning' @click='cancel') CANCEL
        v-btn(flat color='primary' @click='update') UPDATE
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { VDialogComponent } from 'instant-vuetify-overlays';
import { MonthAction } from '@/store';

@Component
export default class MonthActionDialog extends Vue {
    @Prop({ type: Object, required: true })
    protected monthAction?: MonthAction;
    protected value = 0;

    protected mounted() {
        this.value = this.monthAction!.value;
    }

    protected update() {
        this.$emit('ok');
    }

    protected async remove() {
        const result = await this.$vdialog.confirm('本当に削除しますか？').promise;
        if (!result.confirm) { return; }
    }
}
</script>

<style lang='stylus' scoped>
@require '~@/assets/styles/entry/_variable.styl';

.month-action-dialog {}
</style>
