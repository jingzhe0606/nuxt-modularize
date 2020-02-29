<template>
  <div>商品域{{ test }} {{ $route.meta.test }} {{ goodsId }}</div>
</template>

<script>
import { mapState } from 'vuex'
import { test } from '^domain-goods/const/path.js'
export default {
  layout: 'test',

  data () {
    return {
      test
    }
  },

  computed: {
    ...mapState('domain-goods', ['goodsId'])
  }
}
</script>

<style lang="scss" scoped>
</style>
