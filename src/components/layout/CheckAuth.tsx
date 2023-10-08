import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface CheckAuthProps {
    children: React.ReactNode;
    }

export const CheckAuth = ({children} : CheckAuthProps) => {
    const router = useRouter()
    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/signin");
        }
    });

    if (status === "loading") {
        return <div>Loading...</div>
    }
    return <>
        {children}
    </>
}