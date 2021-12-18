<template>
  <div id="pagProduto">
    <b-nav>
      <b-nav-item to="/"
        ><b-icon icon="arrow-left-square" font-scale="2"></b-icon
      ></b-nav-item>
      <b-nav-text class="h2">Cadastro de Produtos</b-nav-text>
    </b-nav>

    <b-form>
      <b-form-group id="input-group-nome" label="Nome:" label-for="input-nome">
        <b-form-input
          id="input-nome"
          v-model="produto.nome"
          placeholder="Ex: Caneta"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-preco-venda"
        label="Preço de Venda:"
        label-for="input-preco-venda"
      >
        <b-form-input
          id="input-preco-venda"
          v-model="produto.precoVenda"
          placeholder="Ex: 9.90"
          type="number"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-qtde-estoque"
        label="Quantidade no estoque:"
        label-for="input-qtde-estoque"
      >
        <b-form-input
          id="input-qtde-estoque"
          v-model="produto.estoque"
          class="mb-2"
          placeholder="Ex: 10"
          type="number"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="reset" variant="outline-danger">Limpar</b-button>
      <b-button variant="success" @click="salvar">Cadastrar</b-button>
    </b-form>

    <table show-empty stacked="md">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Preço de Venda</th>
          <th>Quantidade no Estoque</th>
          <th>Editar</th>
          <th>Deletar</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="produto in produtos" :key="produto.id">
          <td>{{ produto.nome }}</td>
          <td>{{ produto.precoVenda }}</td>
          <td>{{ produto.estoque }}</td>
          <td>
            <b-button variant="warning" @click="editarProduto(produto)">
              <b-icon icon="pencil-square"></b-icon>
            </b-button>
          </td>
          <td>
            <b-button variant="danger" @click="excluirProduto(produto.id)">
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
      produto: {
        id: "",
        nome: "",
        precoVenda: "",
        estoque: "",
      },
      produtos: [],
    };
  },
  mounted() {
    this.listarProdutos();
  },
  methods: {
    salvar() {
      if (!this.produto.id) {
        // Se não houver um produto cadastrado, então faça POST
        this.$http
          .post(`/produtos`, {
            nome: this.produto.nome,
            precoVenda: this.produto.precoVenda,
            estoque: this.produto.estoque,
          }) // Senão atualize o produto
          .then((response) => {
            console.log(response.data);
            this.listarProdutos();
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else {
        this.$http
          .put(`/produtos`, {
            id: this.produto.id,
            nome: this.produto.nome,
            precoVenda: this.produto.precoVenda,
            estoque: this.produto.estoque,
          })
          .then((response) => {
            console.log(response.data);
            this.listarProdutos();
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    },

    editarProduto(produto) {
      this.produto = produto;
    },

    excluirProduto(id) {
      this.$http
        .delete(`produtos/${id}`)
        .then((response) => {
          console.log(response.data);
          this.listarProdutos();
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    listarProdutos() {
      this.$http.get(`/produtos`).then((response) => {
        this.produtos = response.data;
      });
    },
  },
};
</script>

<style>
</style>