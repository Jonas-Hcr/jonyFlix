import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import useForm from '../../../hocks/useForm';
import Button from '../../../components/Button';
import videosReposity from '../../../repositories/videos';

function CadastroVideo() {
  const history = useHistory();
  const { handleChange, valores } = useForm({
    titulo: 'Padrão',
    url: 'https://www.youtube.com/watch?v=I6AKyLe7Evs',
    categoria: 'Games',
  });

  return (
    <div>
      <PageDefault>
        <h1>Cadastro de video</h1>

        <form onSubmit={(event) => {
          event.preventDefault();
          videosReposity.create({
            titulo: valores.titulo,
            url: valores.url,
            categoriaId: 1,
          })
            .then(() => {
              console.log('Cadastrou com sucesso!');
              history.push('/');
            });
        }}
        >
          <FormField
            label="Título do Vídeo"
            name="titulo"
            value={valores.titulo}
            onChange={handleChange}
          />

          <FormField
            label="URL"
            name="url"
            value={valores.url}
            onChange={handleChange}
          />

          <FormField
            label="Categoria do Vídeo"
            name="categoria"
            value={valores.categoria}
            onChange={handleChange}
          />

          <Button type="submit">
            Cadastrar
          </Button>
        </form>

        <Link to="/cadastro/categoria">
          Cadastrar categoria
        </Link>
      </PageDefault>
    </div>
  );
}

export default CadastroVideo;
