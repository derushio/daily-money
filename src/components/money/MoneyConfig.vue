<template lang='pug'>
.money-config
    p: h2.headline 設定

    .section-date.px-3
        p: h3.title 予算切替日
        p: v-layout(wrap row align-center)
            v-flex(lg3 sm4 xs6): v-text-field(:value='$store.state.sectionDate' readonly)
            span 日
            v-flex(sm3 xs12).mx-2
                v-btn.fw.mx-0(@click='updateSectionDate') 変更
    v-divider.mb-3
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class MoneyConfig extends Vue {
    protected async updateSectionDate() {
        await this.$store.dispatch('updateSectionDate', { vm: this });
    }
}
</script>

<style lang='stylus' scoped>
@require '~@/assets/styles/entry/_variable.styl';

.money-config {}
</style>
