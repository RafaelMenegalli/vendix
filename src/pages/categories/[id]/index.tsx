import api from '@/services/axios';
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import PlusIcon from '@rsuite/icons/Plus';
import { GetServerSideProps } from 'next';
import { useRouter } from "next/router";
import { useState } from 'react';
import { Button, Divider, IconButton, Input, Toggle } from "rsuite";
import styles from "./../add/styles.module.scss";

const iziToast = typeof window !== 'undefined' ? require('izitoast') : null;

interface CategoryData {
  name: string;
  description: string;
  active: boolean;
}

interface CategoryEditProps {
  category: CategoryData;
  id: number;
}

export default function CategoriesEdit({ category, id }: CategoryEditProps) {
  const router = useRouter();
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);
  const [active, setActive] = useState(category.active);
  const [loading, setLoading] = useState(false);

  const handleBackPage = () => {
    router.push("/categories");
  };

  const handleGoToAddCategory = () => {
    router.push("/categories/add")
  }

  const handleUpdate = async () => {
    try {
      setLoading(true);

      if (!name) {
        iziToast.warning({
          title: "Aviso!",
          message: "O campo nome é obrigatório",
          position: "topRight",
          close: true,
        });
        return;
      }

      const updateCategoryObj = { name, description, active };

      const response = await api.patch(`/categories/${id}`, updateCategoryObj);

      if (response.data.data) {
        iziToast.success({
          title: "Sucesso!",
          message: response.data.message,
          position: "topRight",
          close: true,
        });
        handleBackPage();
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || "Erro ao atualizar categoria";
      iziToast.error({
        title: "Erro!",
        message,
        position: "topRight",
        close: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.actionBar}>
        <div></div>

        <div className={styles.buttonSeparator}>
          <IconButton
            icon={<PlusIcon />}
            appearance="primary"
            color="green"
            onClick={handleGoToAddCategory}
          ></IconButton>

          <IconButton
            icon={<ArrowLeftLineIcon />}
            appearance="primary"
            color="blue"
            onClick={handleBackPage}
          />
        </div>
      </div>

      <Divider />

      <div className={styles.formContainer}>
        <div style={{ gridColumn: 'span 10' }} className={styles.fieldSeparator}>
          <span>Nome</span>
          <Input value={name} onChange={setName} />
        </div>

        <div
          style={{
            gridColumn: 'span 2',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          className={styles.fieldSeparator}
        >
          <span>Ativo</span>
          <Toggle checked={active} onChange={setActive} />
        </div>

        <div style={{ gridColumn: 'span 12' }} className={styles.fieldSeparator}>
          <span>Descrição</span>
          <Input as="textarea" rows={3} value={description} onChange={setDescription} />
        </div>
      </div>

      <div className={styles.footer}>
        <Button
          appearance="primary"
          color="green"
          onClick={handleUpdate}
          loading={loading}
        >
          Atualizar
        </Button>
      </div>
    </div>
  );
}

// SSR
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const response = await api.get(`/categories/${id}`);
    return {
      props: {
        category: response.data,
        id: Number(id),
      },
    };
  } catch (error) {
    console.error("Erro ao buscar categoria:", error);
    return {
      notFound: true,
    };
  }
};
