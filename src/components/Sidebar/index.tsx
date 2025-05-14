import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import TagIcon from '@rsuite/icons/Tag';
import Link from "next/link";
import { Nav, Sidenav } from "rsuite";
import styles from "./styles.module.scss";

export function Sidebar() {
    return (
        <>
            <div className={styles.mainContainer}>
                <Sidenav className={styles.sideNav}>
                    <Sidenav.Body className={styles.sidebarBody}>
                        <Nav activeKey="1">
                            <Nav.Item eventKey="1" icon={<DashboardIcon />} as={Link} href="/dashboard">
                                Dashboard
                            </Nav.Item>

                            <Nav.Item eventKey="4" icon={<TagIcon />} as={Link} href="/sale">
                                Vendas
                            </Nav.Item>

                            <Nav.Item eventKey="2" icon={<DashboardIcon />} as={Link} href="/stock">
                                Estoque
                            </Nav.Item>

                            <Nav.Menu eventKey="3" title="Cadastros" icon={<GroupIcon />}>
                                <Nav.Item eventKey="3-1" as={Link} href='/products'>Produtos</Nav.Item>
                                <Nav.Item eventKey="3-2" as={Link} href='/categories'>Categorias</Nav.Item>
                            </Nav.Menu>

                            {/* <Nav.Menu eventKey="4" title="Settings" icon={<GearCircleIcon />}>
                                <Nav.Item eventKey="4-1">Applications</Nav.Item>
                                <Nav.Item eventKey="4-2">Channels</Nav.Item>
                                <Nav.Item eventKey="4-3">Versions</Nav.Item>
                                <Nav.Menu eventKey="4-5" title="Custom Action">
                                    <Nav.Item eventKey="4-5-1">Action Name</Nav.Item>
                                    <Nav.Item eventKey="4-5-2">Action Params</Nav.Item>
                                </Nav.Menu>
                            </Nav.Menu> */}
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
            </div>
        </>
    )
} 