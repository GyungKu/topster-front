<template>
  <div class="home">

    <div class="album py-5 bg-body-tertiary">
      <div class="container">

        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <TopsterCard v-for="(topster, idx) in state.topsters" :key="idx" :topster="topster" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import {onMounted, reactive} from "vue";
import TopsterCard from "@/components/TopsterCard.vue";

export default {
  name: "MyTopster",
  components: {TopsterCard,},

  setup() {
    const state = reactive({
      topsters: []
    });
    onMounted(() => {
      axios.get(`/topsters/my`).then((res) => {
        state.topsters = res.data;
      })
      .catch(err => {
        if (err.response.data.code === 'T1002') {
          alert('탑스터가 존재하지 않습니다.');
        }
      });
    })
    return {state}
  }
}
</script>