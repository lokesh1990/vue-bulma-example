<template>
  <div class="countries">
    <template v-if="loading > 0">
      Loading
    </template>
    <template v-else>
      <div class="tile is-ancestor is-vertical">
        <div class="tile is-parent">
          <div class="tile is-child">
            <section class="hero is-dark">
              <div class="hero-body">
                <div class="container has-text-centered is-uppercase">
                  <h2 class="subtitle is-3">Hello countries - A Vue, Bulma example</h2>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div class="tile is-parent">
          <div class="tile is-2 is-child">
          </div>
          <div class="tile is-child box">
            <table class="table is-fullwidth is-hoverable">
              <thead class="is-uppercase">
                <tr>
                  <th> </th>
                  <th>country</th>
                  <th>continent</th>
                  <th>capital</th>
                  <th>currency</th>
                  <th>dial code</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="country in countries" :key="country.name">
                  <td class="has-text-weight-bold">{{country.index}}</td>
                  <td>{{country.name}}</td>
                  <td>{{country.continent.name}}</td>
                  <td>{{country.capital}}</td>
                  <td>
                    <div v-if="country.currency">
                      <div v-for="cur in country.currency.split(',')" :key="cur">
                        <p>{{cur}}</p>
                      </div>        
                    </div>
                  </td>
                  <td>
                    <div v-if="country.phone">
                        <div v-for="phon in country.phone.split(',')" :key="phon">
                          <p>+{{phon}}</p>
                        </div>        
                      </div>
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="tile is-2 is-child">
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
.table {
  &.is-hoverable tbody {
    tr {
        &:not(.is-selected):hover {
          color: ghostwhite;
          background-color: rgb(40, 130, 240) !important;
      }
    }
  }
}
</style>

<script>
import gql from 'graphql-tag';

// GraphQL query
const countriesQuery = gql`
  query info {
    countries {
      name,
      capital,
      currency,
      phone,
      continent
      {
        name
      }
    }
  }
`;

// Component def
export default {
  // Local state
  data: () => ({
    countries: { },
    loading: 0
  }),
  // Apollo GraphQL
  apollo: {
    // Local state data
    countries : {
      query: countriesQuery,
      loadingKey: 'loading',
      result(data) {
        data.data.countries.sort((x, y) => { 
          if(x.continent.name == y.continent.name) {
            return x.name > y.name ? 1 : -1;
          }
          return x.continent.name > y.continent.name ? 1 : -1; 
        });

        let counter = 0;
        data.data.countries.forEach(c =>
        {
          counter++;
          c.index = counter;
        });
      }
    }
  }
};
</script>
