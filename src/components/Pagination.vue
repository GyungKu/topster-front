<template>
  <div>
    <button :disabled="currentPage === 1" @click="prevPage">이전</button>
    <span>{{ currentPage }} / {{ totalPages }}</span>
    <button :disabled="currentPage === totalPages" @click="nextPage">다음</button>
  </div>
</template>

<script>

export default {
  props: ["totalPages", "currentPage"],
  setup(props) {
    const prevPage = () => {
      if (props.currentPage > 1) {
        props.pageChange(props.currentPage - 1);
      }
    };

    const nextPage = () => {
      if (props.currentPage < props.totalPages) {
        props.pageChange(props.currentPage + 1);
      }
    };

    return { prevPage, nextPage };
  },
};
</script>