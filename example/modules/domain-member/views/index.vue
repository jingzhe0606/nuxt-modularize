<template>
  <div>会员域 {{ appId }} {{ memberName }}</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('domain-member', ['appId']),
    ...mapState('domain-member/member', ['memberName'])
  }
}
</script>

<style lang="scss" scoped>
</style>
