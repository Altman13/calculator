<template>
  <div class="col-lg-2">
    История операций:
    <ul v-for="result in allHistory" :key="result.id">
      <li>{{result}}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["allHistory"])
  }
};
</script>

<style lang="scss" scoped>

li {
  list-style-type: none;
  margin-left: -40px;
  line-height: 6px;
}
.col-lg-2 {
  text-align: left;
  border: solid 2px black;
  margin-left: -45px;
}
</style>