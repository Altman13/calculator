<template>
  <div class="col-lg-2">
    История операций:
    <ul v-for="result in allHistory" :key="result.id">
      <li>{{result}}</li>
    </ul>
    <div>
      <form @submit="addLocation(name)">
        <input v-model="name" />
        <button type="submit">добавить</button>
      </form>
      <article v-for="(hist, idx) in history" :key="idx">
        <h1>{{ hist.test }}</h1>
      </article>
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
      name: ""
    };
  },
  firestore() {
    return {
      history: db.collection("history")
    };
  },
  methods: {
    addLocation(test) {
      // <-- новый метод
      //const createdAt = new Date()
      db.collection("history").add({ test });
    }
  },
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
}
</style>