import api from '@/services/axios';
import { CategoriesType } from '@/utils/types/CategoriesType';
import EditIcon from '@rsuite/icons/Edit';
import PlusIcon from '@rsuite/icons/Plus';
import SearchIcon from '@rsuite/icons/Search';
import TrashIcon from '@rsuite/icons/Trash';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Divider, IconButton, Input, InputGroup, Pagination, Table } from "rsuite";
import styles from "./styles.module.scss";
import { GenericDeleteModal } from '@/components/GenericDeleteModal/GenericDeleteModal';
const iziToast = typeof window !== 'undefined' ? require('izitoast') : null;

const { HeaderCell, Column, Cell } = Table;

interface CategoriesProps {
    categories: CategoriesType[];
}

export default function Categories({ categories }: CategoriesProps) {
    const router = useRouter();
    const [data, setData] = useState<CategoriesType[]>(categories);
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState<number>(10);
    const [page, setPage] = useState<number>(1);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [idToDelete, setIdToDelete] = useState<number>(0);
    const [filter, setFilter] = useState('');

    const handleGoToAddCategory = () => {
        router.push("/categories/add")
    }

    const handleChangeLimit = (dataKey: number) => {
        setPage(1);
        setLimit(dataKey);
    };

    const filteredData = data.filter((item) => {
        const search = filter.toLowerCase();

        return (
            item.name.toLowerCase().includes(search) ||
            (item.description?.toLowerCase().includes(search) ?? false) ||
            (item.active ? 'sim' : 'não').includes(search) ||
            item.id.toString().includes(search)
        );
    });

    const paginationData = filteredData.slice((page - 1) * limit, page * limit);

    const handleDelete = async (id: number | string) => {
        try {
            setLoading(true)

            const response = await api.delete(`/categories/${id}`)

            if (response.data.data) {
                iziToast.success({
                    title: "Sucesso!",
                    message: response.data.message,
                    position: "topRight",
                    close: true
                })

                const fetchData = await api.get<CategoriesType[]>('/categories');
                setData(fetchData.data)
            }
        } catch (error: any) {
            const message = error?.response?.data?.message || "Erro ao deletar categoria";

            iziToast.error({
                title: "Erro!",
                message: message,
                position: "topRight",
                close: true
            });
        } finally {
            setLoading(false)
            setIsDeleteModalOpen(false)
        }
    }

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.actionBar}>
                    <InputGroup>
                        <Input
                            placeholder='Pesquise por qualquer coisa...'
                            value={filter}
                            onChange={setFilter}
                        />
                        <InputGroup.Button>
                            <SearchIcon />
                        </InputGroup.Button>
                    </InputGroup>

                    <IconButton
                        icon={<PlusIcon />}
                        appearance="primary"
                        color="green"
                        onClick={handleGoToAddCategory}
                    ></IconButton>
                </div>

                <Divider>Todas as Categorias</Divider>

                <div className={styles.table}>
                    <div className={styles.table}>
                        <Table
                            // height={paginationData.length >= 7 ? 400 : undefined}
                            // autoHeight={paginationData.length < 7}
                            height={400}
                            data={paginationData}
                            hover
                            showHeader
                            bordered
                            cellBordered
                            loading={loading}
                        >
                            <Column width={70} align="center" fixed resizable>
                                <HeaderCell>Código</HeaderCell>
                                <Cell dataKey="id" />
                            </Column>

                            <Column flexGrow={1} resizable>
                                <HeaderCell>Nome</HeaderCell>
                                <Cell dataKey="name" />
                            </Column>

                            <Column flexGrow={2} resizable>
                                <HeaderCell>Descrição</HeaderCell>
                                <Cell>
                                    {(rowData) => (
                                        <span>{rowData.description ?? "-"}</span>
                                    )}
                                </Cell>
                            </Column>

                            <Column flexGrow={2} resizable>
                                <HeaderCell>Ativo</HeaderCell>
                                <Cell>
                                    {(rowData) => (
                                        <span>
                                            {rowData.active ? "Sim" : "Não"}
                                        </span>
                                    )}
                                </Cell>
                            </Column>

                            <Column flexGrow={1} align="center">
                                <HeaderCell>Ações</HeaderCell>
                                <Cell>
                                    {(rowData) => (
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                gap: '12px',
                                                height: '100%',
                                            }}
                                        >
                                            <EditIcon
                                                onClick={() => router.push(`/categories/${rowData.id}`)}
                                                style={{ cursor: 'pointer', color: '#09f' }}
                                                className={styles.iconAction}
                                            />
                                            <TrashIcon
                                                onClick={() => {
                                                    setIsDeleteModalOpen(true);
                                                    setIdToDelete(rowData.id);
                                                }}
                                                style={{ cursor: 'pointer', color: '#f33' }}
                                                className={styles.iconAction}
                                            />
                                        </div>
                                    )}
                                </Cell>
                            </Column>

                        </Table>
                        <div style={{ padding: 20 }}>
                            <Pagination
                                prev
                                next
                                first
                                last
                                ellipsis
                                boundaryLinks
                                maxButtons={5}
                                size="xs"
                                layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                                total={filteredData.length}
                                limitOptions={[10, 30, 50]}
                                limit={limit}
                                activePage={page}
                                onChangePage={setPage}
                                onChangeLimit={handleChangeLimit}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <GenericDeleteModal
                open={isDeleteModalOpen}
                setOpen={setIsDeleteModalOpen}
                text='Você tem certeza que deseja excluir essa categoria? Essa ação não pode ser revertida.'
                confirmDelete={() => handleDelete(idToDelete)}
                loading={loading}
            />
        </>
    )
}

// SSR
export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const response = await api.get<CategoriesType[]>('/categories');
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
