import EditIcon from '@rsuite/icons/Edit';
import PlusIcon from '@rsuite/icons/Plus';
import SearchIcon from '@rsuite/icons/Search';
import TrashIcon from '@rsuite/icons/Trash';
import { useRouter } from 'next/router';
import { Divider, IconButton, Input, InputGroup, Table } from "rsuite";
import styles from "./styles.module.scss";
const { HeaderCell, Column, Cell } = Table;

const data = [
    { id: 1, name: "Pod", description: "Descartável e muito gostoso", active: true },
    { id: 2, name: "Vape", description: "Reutilizável porém meio ruim", active: false }
];

export default function Categories() {
    const router = useRouter();

    const handleGoToAddCategory = () => {
        router.push("/categories/add")
    }

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.actionBar}>
                    <InputGroup>
                        <Input
                            placeholder='Pesquise por qualquer coisa...'
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
                            // height={450}
                            autoHeight
                            data={data}
                            hover
                            showHeader
                            bordered
                            cellBordered
                        >
                            <Column width={70} align="center" fixed>
                                <HeaderCell>ID</HeaderCell>
                                <Cell dataKey="id" />
                            </Column>

                            <Column flexGrow={1}>
                                <HeaderCell>Nome</HeaderCell>
                                <Cell dataKey="name" />
                            </Column>

                            <Column flexGrow={2}>
                                <HeaderCell>Descrição</HeaderCell>
                                <Cell dataKey="description" />
                            </Column>

                            <Column flexGrow={2}>
                                <HeaderCell>Ativo</HeaderCell>
                                <Cell>
                                    {(rowData) => (
                                        <span>
                                            {rowData.active ? "Sim" : "Não"}
                                        </span>
                                    )}
                                </Cell>
                            </Column>

                            <Column flexGrow={1}>
                                <HeaderCell>Ações</HeaderCell>
                                <Cell style={{ display: "flex", alignItems: "center" }}>
                                    {(rowData) => (
                                        <div className={styles.actionTableCell}>
                                            <IconButton
                                                icon={<EditIcon />}
                                                size="sm"
                                                appearance="primary"
                                            // onClick={() => handleEdit(rowData)}
                                            />
                                            <IconButton
                                                icon={<TrashIcon />}
                                                size="sm"
                                                color="red"
                                                appearance="subtle"
                                            // onClick={() => handleDelete(rowData)}
                                            />
                                        </div>
                                    )}
                                </Cell>
                            </Column>

                        </Table>
                    </div>

                </div>
            </div>
        </>
    )
}