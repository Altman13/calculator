<template>
  <div class="col-lg-3">
    История операций:
    <ul v-for="(hist, idx) in history" :key="idx">
      <li>{{ hist.hist }}</li>
    </ul> 
    <div>
      <!-- <form>
        <input v-model="name" />
        <button type="submit" @click.prevent="addLocation(name)">добавить</button>
      </form> -->
      <!-- <article v-for="(hist, idx) in history" :key="idx">
        <h1>{{ hist.hist }}</h1>
      </article> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { db } from "../main";

export default {
  data() {
    return {
      history: [],
      name: "",
      newTodo: "",
    };
  },
  firestore() {
    return {
      history: db.collection("history")
    };
  },
  methods: {

    addLocation(test) {
      db.collection("history").add({ test });
    }
  },
  computed: {
    ...mapGetters(["allHistory"])
  },
  mounted () {

  },
};
</script>

<style lang="scss" scoped>
li {
  list-style-type: none;
  margin-left: -40px;
  line-height: 6px;
}
.col-lg-3 {
  text-align: left;
  border: solid 2px black;
}
</style>