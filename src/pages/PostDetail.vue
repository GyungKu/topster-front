<template>
  <div>
<!--    <TopsterCard :topster="topster" v-if="topster != null"/>-->

    <PostContent :post="post" />

    <CommentList :comments="comments" />

    <CommentForm @submit-comment="submitComment" />
  </div>
</template>

<script>
import PostContent from "@/components/PostContent.vue";
import axios from 'axios';
import CommentList from "@/components/CommentList.vue";
import CommentForm from "@/components/CommentForm.vue";
import router from "@/scripts/router";

export default {
  components: {
    CommentList,
    PostContent,
    CommentForm
  },
  data() {
    return {
      post: {},
      comments: [],
      topster: {},
    };
  },
  mounted() {
    // 게시글 정보와 댓글 목록을 불러오는 API 호출
    const postId = this.$route.params.postId;

    axios.get(`/posts/${postId}`)
    .then(response => {
      this.post = response.data;

      axios.get(`/topsters/${response.data.topsterId}`)
      .then((res) => {
        this.topster = res.data;
      })
    })
    .catch(error => {
      console.error('게시글 정보를 불러오는 중 오류 발생:', error);
    });

    axios.get(`/posts/${postId}/comments`)
    .then(response => {
      this.comments = response.data;
    })
    .catch(error => {
      console.error('댓글 목록을 불러오는 중 오류 발생:', error);
    });
  },
  methods: {
    submitComment(newComment) {
      // 댓글 작성 API 호출
      const postId = this.$route.params.postId;
      axios.post(`/posts/${postId}/comments`, {
        content: newComment,
      })
      .then((res) => {
        if (res.data.code == '1009') {
          global.alert('로그인을 먼저 하십시오');
          router.push('/login');
        }
        // 댓글 목록 다시 불러오기
        this.loadComments();
      })
      .catch(error => {
        console.error('댓글 작성 중 오류 발생:', error);
      });
    },
    loadComments() {
      // 댓글 목록을 다시 불러오는 API 호출
      const postId = this.$route.params.postId;
      axios.get(`/posts/${postId}/comments`)
      .then(response => {
        this.comments = response.data;
      })
      .catch(error => {
        console.error('댓글 목록을 불러오는 중 오류 발생:', error);
      });
    },
  },
};
</script>