<template>
  <div id="app">
    <router-view/>
    <glbmp v-show="mediaList.length"/>
  </div>
</template>

<script>
import glbmp from '@/components/glbMp'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    glbmp
  },
  computed: {
    ...mapGetters([
      'mediaList'
    ])
  }
}
</script>
