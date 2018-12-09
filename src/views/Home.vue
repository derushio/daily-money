<template lang='pug'>
v-container#home(fluid fill-height)
    v-layout(justify-center): v-flex(xs12 sm10 md8)
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {}
</script>

<style lang='stylus' scoped>
@require '~@/assets/styles/entry/_variable.styl';

#home {}
</style>
