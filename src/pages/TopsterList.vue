<template>
  <div class="home">

    <div class="album py-5 bg-body-tertiary">
      <div class="container">

        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" v-if="topsters != null">
          <TopsterCard v-for="(topster, idx) in topsters" :key="idx" :topster="topster"/>
        </div>
      </div>

    </div>
    <Pagination :page="page" :totalPages="totalPages" @pageChange="handlePageChange"/>
  </div>
</template>

<script>
import axios from "axios";
import TopsterCard from "@/components/TopsterCard.vue";
import Pagination from "@/components/Pagination.vue";
import router from "@/scripts/router";

export default {
  name: "topsters",
  components: {Pagination, TopsterCard,},

  data() {
    return {
      page: 1,
      topsters: [],
      totalPages: 1, // totalPages를 추가합니다.
      totalPageArray: [],
    };
  },

  mounted() {
    alert('미구현 페이지!');
    router.push('/');
    const queryString = `?page=${this.page}`;
    axios.get(`/topsters` + queryString).then((res) => {
      this.topsters = res.data;
    })
    .catch(err => {
      if (err.response.data.code === 'T1002') {
        alert('탑스터가 존재하지 않습니다.');
      }
      if (err.response.status == 500) {
        alert('죄송합니다 서버에 문제가 생겼습니다.');
      }
    });
  },

  // setup() {
  //   const state = reactive({
  //     topsters: [],
  //     page: 1,
  //     totalPages: 1,
  //     totalPageArray: [],
  //   });
  //
  //   onMounted(() => {
  //     const queryString = `?page=${state.page}`;
  //     axios.get(`/topsters` + queryString).then((res) => {
  //       state.topsters = res.data;
  //     })
  //     .catch(err => {
  //       if (err.response.data.code === 'T1002') {
  //         alert('탑스터가 존재하지 않습니다.');
  //       }
  //     });
  //   })
  //   return {state}
  // },

  methods: {

    search() {
      const queryString = `?page=${this.page}&max=${this.max}`;
      axios.get(`/topster/my${queryString}`)
      .then(res => {
        this.topsters = res.data.content;
        this.totalPages = res.data.totalPages;
        this.totalPageArray = this.generatePageArray;
      })
    },

    handlePageChange(newPage) {
      this.page = newPage;
      this.search(); // 페이지 변경 시에도 게시물을 다시 가져오도록 수정
    },

    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.search();
      }
    },

    nextPage() {
      if (this.page < this.totalPages) {
        this.page++;
        this.search();
      }
    },

    gotoPage(pageNumber) {
      this.page = pageNumber;
      this.search();
    },

  },

  computed: {
    // 계산된 속성을 통해 페이지 숫자 배열 생성
    generatePageArray() {
      return Array.from({ length: this.totalPages }, (_, index) => index + 1);
    },
  },

  watch: {
    // 페이지가 바뀔 때마다 totalPageArray 업데이트
    page() {
      this.totalPageArray = this.generatePageArray;
    },
  },

}
</script>

<style scoped>

</style>