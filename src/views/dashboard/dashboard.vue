<template>
  <div class="container">
    <form>
      <div class="flex-center">
        <div>
          <h2>Search heroes by name!</h2>

          <div class="form-group">
            <label for="name">Name</label>
            <input class="form-control" type="text" id="name" v-model="name" />
          </div>
          <button class="btn btn-primary" @click="searchByName">Search by name</button>
          <hr />
          <h2>Search heroes by powerstats!</h2>
          <div class="range">
            <div class="form-group" style="width: 100%;">
              <label for="intelligence">Intelligence: {{stats.intelligence}}</label>
              <input
                type="range"
                class="custom-range"
                id="intelligence"
                v-model="stats.intelligence"
              />
            </div>
          </div>
          <div class="range">
            <div class="form-group" style="width: 100%;">
              <label for="strength">Strength: {{stats.strength}}</label>
              <input type="range" class="custom-range" id="strength" v-model="stats.strength" />
            </div>
          </div>
          <div class="range">
            <div class="form-group" style="width: 100%;">
              <label for="speed">Speed: {{stats.speed}}</label>
              <input type="range" class="custom-range" id="speed" v-model="stats.speed" />
            </div>
          </div>
          <div class="range">
            <div class="form-group" style="width: 100%;">
              <label for="durability">Durability: {{stats.durability}}</label>
              <input type="range" class="custom-range" id="durability" v-model="stats.durability" />
            </div>
          </div>
          <div class="range">
            <div class="form-group" style="width: 100%;">
              <label for="power">Powery: {{stats.power}}</label>
              <input type="range" class="custom-range" id="power" v-model="stats.power" />
            </div>
          </div>
          <div class="range">
            <div class="form-group" style="width: 100%;">
              <label for="combat">Combaty: {{stats.combat}}</label>
              <input type="range" class="custom-range" id="combat" v-model="stats.combat" />
            </div>
          </div>
          <button class="btn btn-primary" @click="searchByStats">Search with stats</button>
        </div>
      </div>
    </form>
    <app-heroes-list v-if="superheroes || isLoading"></app-heroes-list>
  </div>
</template>

<script>
import HeroesList from "../heroesList/HeroesList.vue";
export default {
  data() {
    return {
      name: "",
      stats: {
        intelligence: "88",
        strength: "11",
        speed: "33",
        durability: "28",
        power: "36",
        combat: "100"
      }
    };
  },
  computed: {
    superheroes() {
      return this.$store.getters.superheroes;
    },
    isLoading() {
      return this.$store.getters.heroesLoading;
    }
  },
  methods: {
    searchByStats() {
      // TODO:
    },
    searchByName() {
      this.$store.dispatch("fetchSuperheroesByName", this.name);
    }
  },
  components: {
    appHeroesList: HeroesList
  },
  created() {
    // this.$store.dispatch("fetchSuperheroes");
  }
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: space-evenly;

  > h2 {
    text-align: center;
  }
  .range {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>