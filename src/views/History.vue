<template lang='pug'>
v-container#history(fluid fill-height)
    v-layout(justify-center): v-flex(xs12 sm10 md8)
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class History extends Vue {}
</script>

<style lang='stylus' scoped>
@require '~@/assets/styles/entry/_variable.styl';

.history {}
</style>
