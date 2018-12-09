<template lang='pug'>
v-container#home(fluid fill-height)
    v-layout(justify-center): v-flex(xs12 sm10 md8)
        daily-budget(v-if='getCurrent() != null'
                :index='getIndex()' :month='getCurrent()')
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import DailyBudget from '@/components/money/DailyBudget.vue';
import { Month } from '@/store';

@Component({
    components: {
        DailyBudget,
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
            await this.$store.dispatch('newMonth', { vm: this, index: this.getIndex() });
            this.$forceUpdate();
        }
    }
}
</script>

<style lang='stylus' scoped>
@require '~@/assets/styles/entry/_variable.styl';

#home {}
</style>
