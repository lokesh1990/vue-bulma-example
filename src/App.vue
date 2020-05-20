<template>
  <div class="app">
    <countries></countries>
  </div>
</template>

<script>
import Countries from './Countries.vue';

export default {
  name: 'app',
  components: {
    Countries,
  },
};
</script>
