import styles from "./styles.module.scss";
import UserBadgeIcon from '@rsuite/icons/UserBadge';
import ExitIcon from '@rsuite/icons/Exit';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { relationModels } from "@/utils/Models";
import { RelationModelsType } from "@/utils/types/RelationModelsType";
import DragableIcon from '@rsuite/icons/Dragable';

interface TopbarProps {
    setTheme: (theme: "light" | "dark") => void;
    theme: "light" | "dark";
}

export function Topbar({ setTheme, theme }: TopbarProps) {
    const router = useRouter();
    const [backgroundColor, setBackgroundColor] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    useEffect(() => {
        const findModelInformations: RelationModelsType | null = relationModels.find(model => model.url === router.pathname) ?? null;

        if (findModelInformations) {
            setBackgroundColor(findModelInformations.backgroundColor)
            setTitle(findModelInformations.name)
        }
    }, [router.pathname])

    const handleExit = () => {
        router.push("/")
    }

    const handleChangeTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
    };

    return (
        <>
            <div className={styles.mainContainer} style={{ backgroundColor: backgroundColor }}>
                <span className={styles.title}>{title}</span>

                <div className={styles.actionIcons}>
                    <DragableIcon
                        className={styles.icon}
                        onClick={handleChangeTheme}
                    />

                    <UserBadgeIcon className={styles.icon} />

                    <ExitIcon
                        className={styles.icon}
                        onClick={handleExit}
                    />
                </div>
            </div>
        </>
    )
}