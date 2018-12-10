<template lang='pug'>
v-app#app
    v-navigation-drawer(app temporary v-model='drawer')
    v-toolbar(app)
        v-toolbar-side-icon(@click.stop='drawer = !drawer')
        v-toolbar-title Daily money

    v-content
        v-container(fluid)
            router-view(v-if='loaded')

    v-footer(inset)
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { aswait } from '@/utils/AsyncTimeout';

@Component
export default class App extends Vue {
    protected loaded = false;
    protected drawer = false;

    protected async mounted() {
        try {
            await this.$vprogress.circularLoading(async () => {
                await this.$store.dispatch('load');
            }, { minTime: 1000 });
        } catch (e) {
            if (e.message === 'no data') {
                this.$vsnackbar.alert('ようこそ');
            }
        }

        this.loaded = true;
    }
}
</script>

<style lang='stylus'>
@require '~@/assets/styles/entry/_all.styl';

#app {}
</style>
