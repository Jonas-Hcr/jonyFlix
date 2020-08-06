import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CadastroCategoria() {
  const [categorias, setCategorias] = useState([]);

  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  };
  const [valores, setValores] = useState(valoresIniciais);

  function setValor(chave, valor) {
    setValores({
      ...valores,
      [chave]: valor,
    });
  }

  function handleChange(infosDoEvento) {
    setValor(
      infosDoEvento.target.getAttribute('name'),
      infosDoEvento.target.value,
    );
  }

  useEffect(() => {
    const URL_SERVER = window.location.hostname.includes('localhost') ? 'http://localhost:8080/categorias' : 'https://jony-flix.herokuapp.com/categorias';
    fetch(URL_SERVER)
      .then(async (respostaServidor) => {
        const resposta = await respostaServidor.json();
        setCategorias([
          ...resposta,
        ]);
      });
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {valores.nome}
      </h1>

      <form onSubmit={function handleSubmit(infos) {
        infos.preventDefault();
        setCategorias([
          ...categorias,
          valores,
        ]);
        setValores(valoresIniciais);
      }}
      >
        <FormField
          label="Nome da Categoria"
          name="nome"
          type="text"
          value={valores.nome}
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          name="descricao"
          type="textarea"
          value={valores.descricao}
          onChange={handleChange}
        />

        <FormField
          label="Cor"
          name="cor"
          type="color"
          value={valores.cor}
          onChange={handleChange}
        />

        <Button>
          Cadastrar
        </Button>
      </form>

      {categorias.length === 0 && (
      <div>
        Loading...
      </div>
      )}

      <ul>
        {categorias.map((categoria) => (
          <li key={`${categoria.nome}`}>
            {categoria.nome}
          </li>
        ))}
      </ul>

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
