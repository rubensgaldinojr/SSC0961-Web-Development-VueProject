<template>
  <div>
    <header class="header">
      <div class="logo-container">
        <h1><a href="/"><img src="./assets/logo.png" alt="Logo" class="logo"></a></h1>
      </div>
      <div class="menu-container">
        <router-link to="/" class="header-button">
          <div class="header-link">
            <h2>Página de Busca</h2>
          </div>
        </router-link>
        <router-link to="/user" class="header-button header-button-user">
          <div class="header-link">
            <h2>Página do Aluno</h2>
          </div>
        </router-link>
      </div>
    </header>
    <router-view></router-view>
    <footer class="rodape">
      <div class="rodape-layout">
        <div>
          <a href="https://www.icmc.usp.br/"><img src="./assets/icmc_logo_footer.png" alt="ICMC" title="ICMC" class="rodape-img"></a>
        </div>
        <div>
          <h4>Informações da Matéria</h4>
          <p class="rodape-titulo">SSC0961 - Desenvolvimento Web e Mobile <br> 01/2023</p>
        </div>
        <div>
          <h4>Informações da Atividade</h4>
          <p class="rodape-titulo-subtitulo"> T1 - Aplicação Web em Vue.js | Ades</p>
        </div>    
      </div>
  </footer>
  </div>
</template>

<style>
#app {
  height: 100vh;
  font-family:sans-serif;
}
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.header {
  height: 85px;
  background-color: #122234;
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 25px;
}

.logo-container {
  display: flex;
  align-items: center;
  width: 33%;
}

.menu-container{
  display: flex;
  justify-content: flex-end;
  width: 67%;
}

.logo {
  width: 100px;
  height: 50px;
  padding: 14px 0px 0px 30px;
}

.header-button {
  text-decoration: none;
  height: 100%;
  margin-right: 35px;
  cursor: pointer;
  text-align: center;
}

.header-button-user{
  padding-right: 0px;
} 
.header-button:focus {
  outline: none;
}
.header-link:focus {
  outline: none;
}
.header-link{
  text-decoration: none;
  position: relative;
  color: #ffffff;
  font-size: 12px;
  padding: 4px;
}

.header-link:hover{
  background-color: white;
  color: #122234;
}

.header-link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0;
  background-color: transparent;
  color: #122234;
}


.header-button:hover .header-link::after {
  height: 2px;
  color: #122234;
  background-color: #122234;
}

.rodape {
  margin-top: 50px;
  background-color: #f5f5f5;
  padding: 10px;
  text-align: center;
  font-size: 14px;
}

.rodape h4{
  font-size: 1.4em;
  margin-bottom: 15px;
}

.rodape p{
  font-size: 1.2em;
}

.rodape .rodape-layout{
  padding-top: 25px;
  display: flex;
  justify-content: space-around;
}

.rodape .rodape-img{
  width: 100px;
  height: 100px;
  display: absolute;
}
</style>
