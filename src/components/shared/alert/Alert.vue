<template>
  <div
    class="alert position"
    :class="{'alert-danger': type === 'danger', 'alert-info': type === 'info', 'alert-warning': type === 'warning'}"
  >
    <strong v-if="type === 'danger'">Alert!</strong>
    <strong v-if="type === 'info'">Info!</strong>
    <strong v-if="type === 'warning'">Warning!</strong>
    {{message}}
  </div>
</template>

<script>
export default {
  props: ["message", "type"]
};
</script>

<style scoped lang="scss">
.position {
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
  cursor: pointer;
}
</style>