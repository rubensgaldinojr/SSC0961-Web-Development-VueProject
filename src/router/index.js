import { createRouter, createWebHistory } from "vue-router";
import VisualizacaoDefesas from "../views/VisualizacaoDefesas.vue";
import DefesaDetalhes from "../views/DefesaDetalhes.vue";
import PaginaUsuario from "../views/PaginaUsuario.vue";

const routes = [
  { path: "/", name: "visualizacao", component: VisualizacaoDefesas },
  { path: "/defesas/:defesa", name: "detalhes", component: DefesaDetalhes },
  { path: "/user", name: "usuario", component: PaginaUsuario }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
