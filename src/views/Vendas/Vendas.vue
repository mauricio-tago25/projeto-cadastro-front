<template>
  <div id="pagVenda">
    <b-nav>
      <b-nav-item to="/"
        ><b-icon icon="arrow-left-square" font-scale="2"></b-icon
      ></b-nav-item>
      <b-nav-text class="h2">Cadastro de Vendas</b-nav-text>
    </b-nav>

    <b-form>
      <b-form-group
        id="input-group-id-cliente"
        label="ID do Cliente:"
        label-for="input-id-cliente"
      >
        <b-form-input
          id="input-id-cliente"
          v-model="venda.idCliente"
          placeholder="Ex: 1"
          type="number"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-valor-total"
        label="Valor total da venda:"
        label-for="input-valor-total"
      >
        <b-form-input
          id="input-valor-total"
          v-model="venda.valorTotal"
          placeholder="Ex: 999.90"
          required
        ></b-form-input>
      </b-form-group>

      <div id="input-group-data-hora">
        <label for="input-data-hora">Escolha uma data:</label>
        <b-form-datepicker
          id="input-data-hora"
          v-model="venda.dataHora"
          class="mb-2"
        ></b-form-datepicker>
        <p>Value: '{{ venda.dataHora }}'</p>
      </div>

      <b-button type="reset" variant="outline-danger">Limpar</b-button>
      <b-button variant="success" @click="salvar">Cadastrar</b-button>
    </b-form>

    <table show-empty stacked="md">
      <thead>
        <tr>
          <th>ID do Cliente</th>
          <th>Data e Hora</th>
          <th>Valor Total</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="venda in vendas" :key="venda.id">
          <td>{{ venda.idCliente }}</td>
          <td>{{ venda.valorTotal }}</td>
          <td>{{ venda.dataHora }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      venda: {
        id: "",
        idCliente: "",
        valorTotal: "",
        dataHora: "",
      },
      vendas: [],
    };
  },
  mounted() {
    this.listarVendas();
  },
  methods: {
    listarVendas() {
      this.$http.get(`/vendas`).then((response) => {
        this.vendas = response.data;
      });
    },
    salvar() {
      this.$http
        .post(`/vendas`, {
          idCliente: this.venda.idCliente,
          valorTotal: this.venda.valorTotal,
          dataHora: this.venda.dataHora,
        })
        .then((response) => {
          console.log(response.data);
          this.listarVendas();
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  },
};
</script>

<style>
</style>