<template>
  <div class="card shadow-sm">
    <div class="image-container">
      <!-- TopsterCard 컴포넌트를 사용하여 이미지 표시 -->
      <ImageCard v-for="(album, idx) in topster.albums" :key="idx" :albumImage="album.image" :album="album" class="img"
                   @card-clicked="handleCardClicked(album)"/>
      <!-- 9개의 빈 아이템을 추가 -->
      <div v-for="index in Math.max(9 - topster.albums.length, 0)" :key="`empty-${index}`" class="item empty"></div>
    </div>
    <div class="card-body">
      <p class="card-text">제목 : {{ topster.title }}</p>
      <div class="d-flex justify-content-between align-items-center">
        <div v-if="noPost != 'no'">
          <router-link :to="{name: 'postRegister', params: {topsterId: topster.id}}"
                       class="btn btn-primary">게시글 작성하기</router-link>
        </div>
      </div>
      <div>작성자 : {{ topster.author }}</div>
      <div>작성일 : {{ formatDate(topster.createdAt) }}</div>
    </div>
    <AlbumDetail v-if="isModalOpen" :album="album" @close-modal="closeModal" />
  </div>
</template>

<script>
import AlbumDetail from "@/components/AlbumDetail.vue"; // AlbumDetail 컴포넌트 추가
import ImageCard from "@/components/ImageCard.vue";

export default {
  name: "TopsterCard",
  components: {ImageCard, AlbumDetail }, // AlbumDetail 컴포넌트 등록
  props: {
    topster: Object,
    noPost: null
  },
  data() {
    return {
      isModalOpen: false,
      album: null,
    };
  },
  computed: {
    reversAlbums() {
      return this.topster.albums.slice().reverse();
    }
  },
  methods: {
    handleCardClicked(album) {
      this.album = album;
      this.isModalOpen = true;
      // API 호출로 앨범 정보 가져오기 ( topster.album안에는 id, image만 갖고 id를 통해 api를 호출한다는 가정하에 한 것임)
      // axios.get(`/album/${id}`)
      // .then(response => {
      //   this.albums = response.data;
      //   this.isModalOpen = true; // 모달 열기
      // })
      // .catch(error => {
      //   console.error("앨범 정보를 불러오는 중 오류 발생:", error);
      // });
    },
    closeModal() {
      this.isModalOpen = false; // 모달 닫기
    },

    formatDate(dateTimeString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
      return new Date(dateTimeString).toLocaleDateString(undefined, options);
    },

  },
};
</script>

<style scoped>
.card .img {
  flex: 0 0 calc(33.33% - 10px); /* 한 줄에 3개씩 배치하고 간격을 조절합니다. */
  height: 150px;
  margin: 5px;
  background-color: #f0f0f0;
  object-fit: contain; /* 이미지가 잘리지 않고 가로세로 비율을 유지하도록 설정합니다. */
}

.image-container {
  display: flex;
  flex-wrap: wrap;
}

.item.empty {
  flex: 0 0 calc(33.33% - 10px); /* 한 줄에 3개씩 배치하고 간격을 조절합니다. */
  height: 150px;
  margin: 5px;
  background-color: #f0f0f0;
}
.album-detail {
  /* 모달 스타일 */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 기타 스타일링 */
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  z-index: 999; /* 원하는 높은 숫자로 설정 */
}
</style>