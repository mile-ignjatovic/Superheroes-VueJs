<template>
  <div
    class="spinner-border text-primary"
    role="status"
    :style="{width: size + 'rem', height: size + 'rem'}"
  >
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script>
export default {
  props: ["size"]
};
</script>
