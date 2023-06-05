<template>
  <div v-if="defesaLocal" class="detalhes-defesa">
    
    
    
    <div class="detalhes-info">
        <div class="usuario-icon">
        <img src="@/assets/user.png" alt="Ícone de Usuário" />
      </div>
      <h2>{{ defesaLocal.Nome }}</h2><br>
      <p>Data: {{ defesaLocal.Data }}</p>
      <p>Curso: {{ defesaLocal.Curso }}</p>
      <p>Programa: {{ defesaLocal.Programa }}</p>
      <div class="voltar-wrapper"><br><br><br><br>
      <router-link to="/" class="voltar-button">Voltar</router-link>
    </div>
   </div>
   
  </div> 
</template>

<script>
export default {
  props: {
    defesa: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      defesaLocal: null
    };
  },
  mounted() {
    if (this.$route.params.defesa) {
      // Aqui você pode acessar o objeto completo da defesa por meio da propriedade $route.params
      this.defesaLocal = JSON.parse(
        decodeURIComponent(this.$route.params.defesa)
      );
      console.log(this.defesaLocal);
    }
  }
};
</script>

<style>
.detalhes-defesa {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.usuario-icon {
  padding-right: 10px;
  flex-shrink: 0;
}

.usuario-icon img {
  padding-top: 10px;
  width: 48px;
  height: 48px;
}

.detalhes-info {
  line-height: 5px;
  font-size: 18px;
  padding-left: 10px;
  text-align: center;
}
.voltar-wrapper {
  margin-top: 20px; /* Adicionado para espaço acima do botão */
}

.voltar-button {
  padding-bottom: -20px;
  color: #2c3e50;
  text-decoration: none;
  padding: 5px 10px;
  border: 1px solid #2c3e50;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.voltar-button:hover {
  background-color: #2c3e50;
  color: #ffffff;
}
</style>