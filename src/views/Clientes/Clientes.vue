<template>
  <div id="pagCliente">
    <b-nav>
      <b-nav-item to="/"
        ><b-icon icon="arrow-left-square" font-scale="2"></b-icon
      ></b-nav-item>
      <b-nav-text class="h2">Cadastro de Clientes</b-nav-text>
    </b-nav>

    <b-form>
      <b-form-group id="input-group-nome" label="Nome:" label-for="input-nome">
        <b-form-input
          id="input-nome"
          v-model="cliente.nome"
          placeholder="Ex: José Silva"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-cpf" label="CPF:" label-for="input-cpf">
        <b-form-input
          id="input-cpf"
          v-model="cliente.cpf"
          placeholder="Ex: 123456789"
          required
        ></b-form-input>
      </b-form-group>

      <div id="input-group-data-nascimento">
        <label for="input-data-nascimento">Escolha uma data:</label>
        <b-form-datepicker
          id="input-data-nascimento"
          v-model="cliente.dataNascimento"
          class="mb-2"
        ></b-form-datepicker>
        <p>Value: '{{ cliente.dataNascimento }}'</p>
      </div>

      <b-button type="reset" variant="outline-danger">Limpar</b-button>
      <b-button variant="success" @click="salvar">Cadastrar</b-button>
    </b-form>

    <table show-empty stacked="md">
      <thead>
        <tr>
          <th>Nome</th>
          <th>CPF</th>
          <th>Data de Nascimento</th>
          <th>Editar</th>
          <th>Deletar</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="cliente in clientes" :key="cliente.id">
          <td>{{ cliente.nome }}</td>
          <td>{{ cliente.cpf }}</td>
          <td>{{ cliente.dataNascimento }}</td>
          <td>
            <b-button variant="warning" @click="editarCliente(cliente)">
              <b-icon icon="pencil-square"></b-icon>
            </b-button>
          </td>
          <td>
            <b-button variant="danger" @click="excluirCliente(cliente.id)">
              <b-icon icon="trash"></b-icon>
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cliente: {
        id: "",
        nome: "",
        cpf: "",
        dataNascimento: "",
      },
      clientes: [],
      pesquisa: "",
    };
  },
  mounted() {
    this.listarClientes();
  },
  computed: {},
  methods: {
    salvar() {
      if (!this.cliente.id) {
        this.$http
          .post(`/clientes`, {
            nome: this.cliente.nome,
            cpf: this.cliente.cpf,
            dataNascimento: this.cliente.dataNascimento,
          })
          .then((response) => {
            console.log(response.data);
            this.listarClientes();
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else {
        this.$http
          .put(`/clientes`, {
            id: this.cliente.id,
            nome: this.cliente.nome,
            cpf: this.cliente.cpf,
            dataNascimento: this.cliente.dataNascimento,
          })
          .then((response) => {
            console.log(response.data);
            this.listarClientes();
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    },

    editarCliente(cliente) {
      this.cliente = cliente;
    },

    excluirCliente(id) {
      this.$http
        .delete(`clientes/${id}`)
        .then((response) => {
          console.log(response.data);
          this.listarClientes();
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    listarClientes() {
      this.$http.get(`/clientes`).then((response) => {
        this.clientes = response.data;
      });
    },
  },
};
</script>

<style>
</style>