import api from '@/services/axios';
import { CategoriesType } from '@/utils/types/CategoriesType';
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import { GetServerSideProps } from 'next';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { Button, Divider, IconButton, Input, InputNumber, SelectPicker, Toggle, Uploader } from "rsuite";
import styles from "./styles.module.scss";
const iziToast = typeof window !== 'undefined' ? require('izitoast') : null;

interface ProductsAddProps {
    categories: CategoriesType[]
}

export default function ProductsAdd({ categories }: ProductsAddProps) {
    const router = useRouter();
    const [categoriesData, setCategoriesData] = useState<{ value: number, label: string }[]>([]);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [active, setActive] = useState<boolean>(true);
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [price, setPrice] = useState<string | number | null>(0);
    const [image, setImage] = useState<string>("haha");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (categories && categories.length > 0) {
            const formattedCategories = categories.map(category => {
                return { value: category.id, label: category.name }
            })

            setCategoriesData(formattedCategories)
        }

    }, [categories])

    const handleBackPage = () => {
        router.push("/products")
    }

    const handleSave = async () => {
        try {
            setLoading(true)

            if (!name || !categoryId || !price) {
                iziToast.warning({
                    title: "Aviso!",
                    message: "Os campos de Nome, Categoria e Preço são obrigatórios.",
                    position: "topRight",
                    close: true
                })
                return;
            }

            const createProductObj = {
                name, description, active, categoryId, price, image
            }

            const response = await api.post('/products', createProductObj)

            if (response.data.data) {
                iziToast.success({
                    title: "Sucesso!",
                    message: response.data.message,
                    position: "topRight",
                    close: true
                })

                handleBackPage()
            }
        } catch (error: any) {
            const messages = error?.response?.data?.message || ["Erro ao cadastrar produto"];

            const errorsArray = Array.isArray(messages) ? messages : [messages];

            errorsArray.forEach((msg: string) => {
                iziToast.error({
                    title: "Erro!",
                    message: msg,
                    position: "topRight",
                    close: true
                });
            });
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.actionBar}>
                    <div></div>

                    <IconButton
                        icon={<ArrowLeftLineIcon />}
                        appearance="primary"
                        color="blue"
                        onClick={handleBackPage}
                    ></IconButton>
                </div>

                <Divider></Divider>

                <div className={styles.formContainer}>
                    <div style={{ gridColumn: 'span 5' }} className={styles.fieldSeparator}>
                        <span>Nome</span>
                        <Input
                            value={name}
                            onChange={(v) => setName(v)}
                        />
                    </div>

                    <div style={{ gridColumn: 'span 4' }} className={styles.fieldSeparator}>
                        <span>Categoria</span>
                        <SelectPicker
                            data={categoriesData}
                            value={categoryId}
                            onChange={(v) => setCategoryId(v)}
                        />
                    </div>

                    <div style={{ gridColumn: 'span 2' }} className={styles.fieldSeparator}>
                        <span>Preço</span>
                        <InputNumber
                            prefix="R$"
                            value={price}
                            onChange={(v) => {
                                const value = Number(v);
                                setPrice(value)
                            }}
                        />
                    </div>

                    <div style={{ gridColumn: 'span 1' }} className={styles.fieldSeparator}>
                        <span>Ativo</span>
                        <Toggle
                            defaultChecked
                            checked={active}
                            onChange={(v) => setActive(v)}
                        />
                    </div>

                    <div style={{ gridColumn: 'span 12' }} className={styles.fieldSeparator}>
                        <span>Descrição</span>
                        <Input
                            as="textarea"
                            rows={3}
                            value={description}
                            onChange={(v) => setDescription(v)}
                        />
                    </div>

                    <div style={{ gridColumn: 'span 12' }} className={styles.fieldSeparator}>
                        <span>Foto</span>
                        <Uploader action="//jsonplaceholder.typicode.com/posts/" draggable>
                            <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span>Clique ou arraste uma foto para esta área!</span>
                            </div>
                        </Uploader>
                    </div>
                </div>

                <div className={styles.footer}>
                    <Button
                        appearance="primary"
                        color="green"
                        onClick={handleSave}
                        loading={loading}
                    >
                        Cadastrar
                    </Button>
                </div>
            </div>
        </>
    )
}

// SSR
export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const response = await api.get<CategoriesType[]>('/categories/active');
        return {
            props: {
                categories: response.data
            }
        };
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        return {
            props: {
                categories: []
            }
        };
    }
};