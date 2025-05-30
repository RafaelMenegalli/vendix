import { GenericDeleteModal } from '@/components/GenericDeleteModal/GenericDeleteModal';
import api from '@/services/axios';
import { UserType } from "@/utils/types/UserType";
import EditIcon from '@rsuite/icons/Edit';
import PlusIcon from '@rsuite/icons/Plus';
import SearchIcon from '@rsuite/icons/Search';
import TrashIcon from '@rsuite/icons/Trash';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Divider, IconButton, Input, InputGroup, Pagination, Table } from "rsuite";
import styles from "./styles.module.scss";
const iziToast = typeof window !== 'undefined' ? require('izitoast') : null;

const { HeaderCell, Column, Cell } = Table;

interface UserProps {
    users: UserType[];
}

export default function Users({ users }: UserProps) {
    const router = useRouter();

    const [data, setData] = useState<UserType[]>(users);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [idToDelete, setIdToDelete] = useState<number>(0);
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState<number>(10);
    const [page, setPage] = useState<number>(1);

    const handleGoToAddUser = () => {
        router.push("/users/add")
    }

    const handleChangeLimit = (dataKey: number) => {
        setPage(1);
        setLimit(dataKey);
    };

    const filteredData = data.filter((item) => {
        const search = filter.toLowerCase();

        return (item.id.toString().includes(search) || (item.email?.toLowerCase().includes(search) ?? false));
    });

    const paginationData = filteredData.slice((page - 1) * limit, page * limit);

    const handleDelete = async (id: number | string) => {
        try {
            setLoading(true)

            const response = await api.delete(`/users/${id}`)

            if (response.data.data) {
                iziToast.success({
                    title: "Sucesso!",
                    message: response.data.message,
                    position: "topRight",
                    close: true
                })

                const fetchData = await api.get<UserType[]>('/users');
                setData(fetchData.data)
            }
        } catch (error: any) {
            const message = error?.response?.data?.message || "Erro ao deletar usuário";

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
                        onClick={handleGoToAddUser}
                    ></IconButton>
                </div>

                <Divider>Todos os Usuários</Divider>

                <div className={styles.table}>
                    <div className={styles.table}>
                        <Table
                            height={400}
                            data={paginationData}
                            hover
                            showHeader
                            bordered
                            cellBordered
                            loading={loading}
                        >
                            <Column width={70} align="center" fixed>
                                <HeaderCell>ID</HeaderCell>
                                <Cell dataKey="id" />
                            </Column>

                            <Column flexGrow={1}>
                                <HeaderCell>Email</HeaderCell>
                                <Cell dataKey="email" />
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
                                                onClick={() => router.push(`/users/${rowData.id}`)}
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
                text='Você tem certeza que deseja excluir esse usuário? Essa ação não pode ser revertida.'
                confirmDelete={() => handleDelete(idToDelete)}
                loading={loading}
            />
        </>
    )
}

// SSR
export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const response = await api.get<UserType[]>('/users');
        return {
            props: {
                users: response.data
            }
        };
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return {
            props: {
                users: []
            }
        };
    }
};