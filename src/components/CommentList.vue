<template>
  <div class="comment-list">
    <ul>
      <li v-for="comment in comments" :key="comment.id" class="comment-item">
        {{ comment.content }} - 작성자: {{ comment.author }} - 작성일: {{ formatDate(comment.createdAt) }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    comments: Array,
  },
  methods: {
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
.comment-list {
  margin-top: 20px;
}

.title {
  font-size: 1.2em;
  color: #333;
}

.comment-item {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}
</style>