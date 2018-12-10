<template lang='pug'>
v-card.month-action-dialog
    v-card-text
        v-text-field(v-model='name')
        v-divider
        v-layout(wrap row align-center)
            v-text-field(v-model='value' type='number')
            span 円
    v-divider
    v-card-actions.overflow-x-auto
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
    @Prop({ type: String, required: true })
    protected index?: string;
    @Prop({ type: Object, required: true })
    protected monthAction?: MonthAction;

    protected name = '';
    protected value = '0';

    protected mounted() {
        this.name = this.monthAction!.name;
        this.value = this.monthAction!.value.toString();
    }

    protected async update() {
        await this.$store.dispatch('updateAction', {
            vm: this, index: this.index!,
            id: this.monthAction!.id,
            name: this.name, value: parseInt(this.value, 10),
        });
        this.$emit('ok');
    }

    protected async remove() {
        const result = await this.$vdialog.confirm('本当に削除しますか？').promise;
        if (!result.confirm) { return; }

        await this.$store.dispatch('removeAction', {
            vm: this, index: this.index!,
            id: this.monthAction!.id,
        });
        this.$emit('ok');
    }
}
</script>

<style lang='stylus' scoped>
@require '~@/assets/styles/entry/_variable.styl';

.month-action-dialog {}
</style>
