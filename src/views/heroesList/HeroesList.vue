<template>
  <div class="table-container">
    <div v-if="!isLoading">
      Heroes List:
      <div v-if="superheroes.length > 0">
        <table class="table table-striped table-info text-center">
          <thead>
            <tr>
              <th>#ID</th>
              <th class="text-center">Chracter Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(hero, index) in superheroes" :key="index">
              <td>{{hero.id}}</td>
              <td>{{hero.name}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <hr />
        <span
          style="margin: 1rem; display: block;"
        >No superheroes with this name or stats! Search again.</span>
        <hr />
      </div>
    </div>
    <div v-else class="spinner">
      <app-spinner :size="'4'" />
    </div>
  </div>
</template>

<script>
import Spinner from "../../components/shared/spinner/Spinner";
export default {
  computed: {
    superheroes() {
      return this.$store.getters.superheroes;
    },
    isLoading() {
      return this.$store.getters.heroesLoading;
    }
  },
  components: {
    appSpinner: Spinner
  }
};
</script>

<style scoped lang="scss">
.table-container {
  width: 40%;
  .table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
    background-color: transparent;
    border-spacing: 0;
    border-collapse: collapse;
    display: table;
    border-color: grey;
    &-info {
      font-weight: 300;
    }
  }

  .spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}
</style>