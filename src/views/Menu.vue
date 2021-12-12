<template>
  <b-jumbotron>
    <template #header>Projeto de Cadastro</template>

    <template #lead>
      Projeto de cadastro de clientes, de produtos e de vendas.
    </template>

    <hr class="my-4" />

    <router-link to="/clientes" tag="button">Clientes</router-link>
    <router-link to="/produtos" tag="button">Produtos</router-link>
    <router-link to="/vendas" tag="button">Vendas</router-link>
  </b-jumbotron>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style>
</style>