<template>
  <div class="main-page">
    <h2 class="table-title">Visualização de Defesas</h2>
    <div class="search-container">
      <input type="text" v-model="searchQuery" placeholder="Pesquisar por nome" class="search-input" />
    </div>
    <!-- Radio buttons para os tipos de cursos -->
    <div class="filtros">
      <div class="filtro-item">
        <span style="color: #2a2a2a">Filtrar por Curso:</span>
        <label v-for="curso in cursos" :key="curso">
          <input
            type="radio"
            :value="curso"
            v-model="cursoSelecionado"
            @change="filteredDefesas"
          />
          {{ curso }}
        </label>
      </div>
      <div class="filtro-item">
        <span style="color: #2a2a2a;">Filtrar por Programa:</span>
        <label v-for="programa in programas" :key="programa">
          <input
            type="radio"
            :value="programa"
            v-model="programaSelecionado"
            @change="filteredDefesas"
          />
          {{ programa }}
        </label>
      </div>
      <br>
    </div>

    <table class="table">
      <thead>
      <tr>
        <th @click="ordenarDefesas('Ordem')">
          Ordem
          <span :class="getClass('Ordem')"></span>
        </th>
        <th @click="ordenarDefesas('Nome')">
          Nome
          <span :class="getClass('Nome')"></span>
        </th>
        <th @click="ordenarDefesas('Data')">
          Data
          <span :class="getClass('Data')"></span>
        </th>
        <th @click="ordenarDefesas('Curso')">
          Curso
          <span :class="getClass('Curso')"></span>
        </th>
        <th @click="ordenarDefesas('Programa')">
          Programa
          <span :class="getClass('Programa')"></span>
        </th>
      </tr>
    </thead>
      <tbody>

        <tr v-for="defesa in filteredDefesas" :key="defesa.Ordem"
          @mouseenter="showDetails($event, defesa)"
          @mouseleave="hideDetails"
          @click="verDetalhes(defesa)"
        >
          <td>{{ defesa.Ordem }}</td>
          <td>{{ defesa.Nome }}</td>
          <td>{{ defesa.Data }}</td>
          <td>{{ defesa.Curso }}</td>
          <td>{{ defesa.Programa }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="selectedDefesa" class="details-container" :style="detailsStyle">
      <div class="details">
        <h3>{{ selectedDefesa.Nome }}</h3>
        <p>Data: {{ selectedDefesa.Data }}</p>
        <p>Curso: {{ selectedDefesa.Curso }}</p>
        <p>Programa: {{ selectedDefesa.Programa }}</p>
      </div>
    </div>
  </div>
  <div>
  <button class="btn-top" @click="scrollToTop">
    </button>
  
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  data() {
    return {
      defesas: [],
      selectedDefesa: null,
      mouseX: 0,
      mouseY: 0,
      sortColumn: null,
      sortType: null,
      searchQuery: '',
      filteredDefesas: [],
      cursos: [],
      programas: [],
      cursoSelecionado: 'Todos',
      programaSelecionado: 'Todos'


    };
  },
  methods: {
    saveFiltersAndSorting() {
    const filtersAndSorting = {
      sortColumn: this.sortColumn,
      sortType: this.sortType,
      searchQuery:this.searchQuery,
      cursoSelecionado:this.cursoSelecionado,
      programaSelecionado:this.programaSelecionado

    };
    localStorage.setItem('filtersAndSorting', JSON.stringify(filtersAndSorting));
  },
  loadFiltersAndSorting() {
    const filtersAndSorting = localStorage.getItem('filtersAndSorting');
    if (filtersAndSorting) {
      const { sortColumn, sortType, searchQuery,  cursoSelecionado, programaSelecionado} = JSON.parse(filtersAndSorting);
      this.sortColumn = sortColumn;
      this.sortType = sortType;
      this.searchQuery = searchQuery;
      this.cursoSelecionado = cursoSelecionado;
      this.programaSelecionado = programaSelecionado;

    }
  },

    handleScroll() {
      const btnTop = document.querySelector('.btn-top');
      if (btnTop) {
        if (window.pageYOffset > window.innerHeight) {
          btnTop.style.display = 'block';
        } else {
          btnTop.style.display = 'none';
        }
      }
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    showDetails(event, defesa) {
      this.selectedDefesa = defesa;
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    },
    verDetalhes(defesa) {
      console.log("TEste");
      let defesa1 = JSON.stringify(defesa);
      defesa1 = encodeURIComponent(defesa1)
      this.$router.push({
        name: 'detalhes',
        params: { defesa: defesa1 }
      });
    },
    hideDetails() {
      this.selectedDefesa = null;
    },
    carregarDefesas() {
      const defesasCache = sessionStorage.getItem('defesas');
      if (defesasCache) {
        this.defesas = JSON.parse(defesasCache);
      } else {
        axios.get('http://thanos.icmc.usp.br:4567/api/v1/defesas')
          .then(response => {
            this.defesas = response.data.items;
            sessionStorage.setItem('defesas', JSON.stringify(this.defesas));
            this.getCursosUnicos();
            this.getProgramasUnicos();
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    ordenarDefesas(coluna) {
      if (coluna === this.sortColumn) {
        this.sortType = this.sortType === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = coluna;
        this.sortType = 'asc';
      }

      this.defesas.sort((a, b) => {
        if (coluna === 'Ordem') {
          const valorA = parseInt(a[coluna]);
          const valorB = parseInt(b[coluna]);

          return this.sortType === 'asc' ? valorA - valorB : valorB - valorA;
        }

        if (coluna === 'Data') {
          const dataA = moment(a[coluna], 'DD-MM-YYYY');
          const dataB = moment(b[coluna], 'DD-MM-YYYY');

          return this.sortType === 'asc' ? dataA - dataB : dataB - dataA;
        }

        const valueA = a[coluna].toUpperCase();
        const valueB = b[coluna].toUpperCase();

        if (valueA < valueB) {
          return this.sortType === 'asc' ? -1 : 1;
        } else if (valueA > valueB) {
          return this.sortType === 'asc' ? 1 : -1;
        }

        return 0;
      });
    },
    getClass(coluna) {
      if (coluna === this.sortColumn) {
        return this.sortType === 'asc' ? 'arrow-up' : 'arrow-down';
      }

      return '';
    },
    getCursosUnicos() {
      const cursosUnicos = [...new Set(this.defesas.map(defesa => defesa.Curso))];
      this.cursos = ['Todos', ...cursosUnicos];
    },
    getProgramasUnicos() {
      const programasUnicos = [...new Set(this.defesas.map(defesa => defesa.Programa))];
      this.programas = ['Todos', ...programasUnicos];
    }

  },
  mounted() {
    this.carregarDefesas();
    this.getCursosUnicos();
    this.getProgramasUnicos();
    this.loadFiltersAndSorting();
    window.addEventListener('scroll', this.handleScroll);
  },
  computed: {
    filteredDefesas() {
      // Filtrar as defesas com base na pesquisa e no curso selecionado
      let defesasFiltradas = this.defesas;

      // Filtrar por nome (usando a propriedade searchQuery)
      if (this.searchQuery) {
        defesasFiltradas = defesasFiltradas.filter(defesa =>
          defesa.Nome.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      // Filtrar por curso (usando a propriedade selectedCourse)
      if (this.cursoSelecionado !== 'Todos') {
        defesasFiltradas = defesasFiltradas.filter(defesa => defesa.Curso === this.cursoSelecionado);
      }

      if (this.programaSelecionado !== 'Todos') {
        defesasFiltradas = defesasFiltradas.filter(defesa => defesa.Programa === this.programaSelecionado);
      }

      return defesasFiltradas;
    },
    detailsStyle() {
      return {
        top: `${this.mouseY}px`,
        left: `${this.mouseX}px`
      };
    }
  },watch: {
    sortColumn() {
      this.saveFiltersAndSorting();
      // Atualize os dados conforme necessário
      // Exemplo: this.updateData();
    },
    sortType() {
      this.saveFiltersAndSorting();
      // Atualize os dados conforme necessário
      // Exemplo: this.updateData();
    },
    searchQuery() {
      this.saveFiltersAndSorting();
      // Atualize os dados conforme necessário
      // Exemplo: this.updateData();
    },
    cursoSelecionado() {
      this.saveFiltersAndSorting();
      // Atualize os dados conforme necessário
      // Exemplo: this.updateData();
    },
    programaSelecionado() {
      this.saveFiltersAndSorting();
      // Atualize os dados conforme necessário
      // Exemplo: this.updateData();
    },
  },

};
</script>

<style>
.main-page{
  padding:0px 20px 0px 20px;
}

.table-title {
  color:#122234;
  text-align: center;
  margin-bottom: 25px;
  margin-top: 5px;
  font-size: 35px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  color:#122234;
  border: 1px solid #dddddd;
  padding: 8px;
}

.table th {
  background-color: #f2f2f2;
}

.table tr:hover {
  background-color: #f9f9f9;
  cursor: pointer;
}

.details-container {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.details {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.details h3 {
  margin-top: 0;
}

.details p {
  margin-bottom: 10px;
}

.details-container.active {
  opacity: 1;
  pointer-events: auto;
}
.arrow-up::after {
  content: '\25B2';
  margin-left: 5px;
}

.arrow-down::after {
  content: '\25BC';
  margin-left: 5px;
}
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  width: 300px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.course-filter {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.course-filter label {
  margin-right: 10px;
}

.btn-top {
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f2f2f2;
  color: #2c3e50;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease-in-out;
  outline: none; /* Remover contorno */
  border: 1px solid #b8b8b9;
  border-width:1px;
}

.btn-top:hover {
  background-color: #b4b4b4;
  border: 1px solid #878787;
  border-width:1px;
}

.btn-top:before {
  content: "\2191"; /* Código Unicode para a seta para cima */
  display: block;
  position: relative;
  top: -2px; /* Ajuste vertical para centralizar a seta */
}
input[type="radio"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #2c3e50;
  border-radius: 50%;
  outline: none;
  transition: border-color 0.3s ease-in-out;
}

input[type="radio"]:checked {
  border-color: #2c3e50;
  background-color: #2c3e50;
}

input[type="radio"]:checked::after {
  content: "";
  display: block;
  position: relative;
  top: 4px;
  left: 4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #fff;
}

/* Estilizando as labels dos radio buttons */
.radio-label {
  display: inline-block;
  margin-right: 10px;
  cursor: pointer;
}

.radio-label:hover {
  color: #2c3e50;
}

</style>
