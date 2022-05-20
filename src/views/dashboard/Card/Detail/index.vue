<template>
  <div>
    <div class="card-header">
      <span>{{ title }}</span>
      <em>😊</em>
    </div>
    <div class="card-content">
      <span>￥{{ count }}</span>
      <em>😊</em>
    </div>
    <div class="card-charts">
      <slot name="charts"></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "count"],
};
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  color: rgb(132, 136, 136);
}
.card-content {
  font-size: 24px;
}
.card-charts {
  height: 50px;
}
.card-footer {
  border-top: 1px solid #eee;
}
</style>
