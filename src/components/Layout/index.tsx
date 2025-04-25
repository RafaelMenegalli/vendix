import { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { Topbar } from "../Topbar";

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const router = useRouter();
    console.log({ router })
    const showSidebar = router.pathname !== "/";
    const showTopbar = router.pathname !== "/";

    return (
        <div className={styles.container}>
            {showSidebar && <Sidebar />}
            <div className={styles.divMain}>
                {showTopbar && <Topbar />}
                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </div>
    );
}
