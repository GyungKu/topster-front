<template>
  <div class="post-content">
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <div class="meta-info">
      <p>작성자: {{ post.author }}</p>
      <p>작성일: {{ formatDate(post.createdAt) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object,
  },
  methods: {
    formatDate(dateTimeString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
      return new Date(dateTimeString).toLocaleDateString(undefined, options);
    },
  },
};
</script>

<style scoped>
.post-content {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
}

p {
  color: #666;
}

.meta-info {
  margin-top: 15px;
  font-size: 14px;
  color: #888;
}

/* 추가적인 스타일링을 원하시면 여기에 계속 추가할 수 있습니다. */
</style>