import { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { Topbar } from "../Topbar";

interface LayoutProps {
    setTheme: (theme: "light" | "dark") => void;
    theme: "light" | "dark";
    children: ReactNode;
}

export function Layout({ children, setTheme, theme }: LayoutProps) {
    const router = useRouter();
    const showSidebar = router.pathname !== "/";
    const showTopbar = router.pathname !== "/";
    const isLoginPage = router.pathname === "/";

    return (
        <div className={styles.container}>
            {showSidebar && <Sidebar />}
            <div className={styles.divMain}>
                {showTopbar && <Topbar setTheme={setTheme} theme={theme} />}
                <main className={styles.main} style={{ overflow: isLoginPage ? "hidden" : "auto" }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
