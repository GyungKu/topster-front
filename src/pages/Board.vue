<template>
  <section class="notice">
    <div class="page-title">
      <div class="container">
        <h3>자유 게시판</h3>
      </div>
    </div>

    <!-- board seach area -->
    <SearchBar :searchCond="searchCond" @searchCond="searchCondSet"></SearchBar>

    <!-- board list area -->
    <div id="board-list">
      <div class="container">
        <table class="board-table">
          <thead>
          <tr>
            <th scope="col" class="th-num">번호</th>
            <th scope="col" class="th-title">제목</th>
            <th scope="col" class="th-date">작성자</th>
            <th scope="col" class="th-date">등록일</th>
          </tr>
          </thead>
          <tbody v-for="post in posts" :key="post.id">
          <tr>
            <td>{{ post.id }}</td>
            <th>
              <router-link :to="{name: 'postDetail', params: {postId: post.id}}">{{ post.title }}</router-link>
            </th>
            <td>작성자</td>
            <td>{{ formatDate(post.createdAt) }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

  </section>
</template>

<script>
import axios from "axios";
import SearchBar from "@/components/SearchBar.vue";

export default {
  components: {
    SearchBar,
  },

  data() {
    return {
      searchCond: {
        searchKey: '',
        query: '',
      },
      sortBy: 'created_at',
      sortAsc: true,
      page: 1,
      max: 10,
      posts: [],
    };
  },

  // mounted() {
  //   axios.get("/posts").then((res) => {
  //     this.posts = res.data.content;
  //   })
  // },
  methods: {
    search() {
      const key = this.searchCond.searchKey;
      const query = this.searchCond.query;

      // Axios를 사용하여 서버에서 게시글 목록을 가져옴
      axios.get(`/posts?${key}=${query}`)
      .then(response => {
        this.posts = response.data.content;
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
    },

    searchCondSet(searchCond) {
      this.searchCond = searchCond;
      console.log(searchCond.key);
      console.log(searchCond.query);
      this.search();
    },

    formatDate(createdAt) {
      const date = new Date(createdAt);
      const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`;
      return formattedDate;
    },

  },
};

function padZero(value) {
  return value < 10 ? `0${value}` : value;
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  border-spacing: 0;
}
section.notice {
  padding: 80px 0;
}

.page-title {
  margin-bottom: 60px;
}
.page-title h3 {
  font-size: 28px;
  color: #333333;
  font-weight: 400;
  text-align: center;
}

#board-search .search-window {
  padding: 15px 0;
  background-color: #f9f7f9;
}
#board-search .search-window .search-wrap {
  position: relative;
  /*   padding-right: 124px; */
  margin: 0 auto;
  width: 80%;
  max-width: 564px;
}
#board-search .search-window .search-wrap input {
  height: 40px;
  width: 100%;
  font-size: 14px;
  padding: 7px 14px;
  border: 1px solid #ccc;
}
#board-search .search-window .search-wrap input:focus {
  border-color: #333;
  outline: 0;
  border-width: 1px;
}
#board-search .search-window .search-wrap .btn {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 108px;
  padding: 0;
  font-size: 16px;
}

.board-table {
  font-size: 13px;
  width: 100%;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.board-table a {
  color: #333;
  display: inline-block;
  line-height: 1.4;
  word-break: break-all;
  vertical-align: middle;
}
.board-table a:hover {
  text-decoration: underline;
}
.board-table th {
  text-align: center;
}

.board-table .th-num {
  width: 100px;
  text-align: center;
}

.board-table .th-date {
  width: 200px;
}

.board-table th, .board-table td {
  padding: 14px 0;
}

.board-table tbody td {
  border-top: 1px solid #e7e7e7;
  text-align: center;
}

.board-table tbody th {
  padding-left: 28px;
  padding-right: 14px;
  border-top: 1px solid #e7e7e7;
  text-align: left;
}

.board-table tbody th p{
  display: none;
}

.btn {
  display: inline-block;
  padding: 0 30px;
  font-size: 15px;
  font-weight: 400;
  background: transparent;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  text-transform: uppercase;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

.btn-dark {
  background: #555;
  color: #fff;
}

.btn-dark:hover, .btn-dark:focus {
  background: #373737;
  border-color: #373737;
  color: #fff;
}

.btn-dark {
  background: #555;
  color: #fff;
}

.btn-dark:hover, .btn-dark:focus {
  background: #373737;
  border-color: #373737;
  color: #fff;
}

/* reset */

* {
  list-style: none;
  text-decoration: none;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.clearfix:after {
  content: '';
  display: block;
  clear: both;
}
.container {
  width: 1100px;
  margin: 0 auto;
}
.blind {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  margin: -1px;
  width: 1px;
  height: 1px;
}
</style>