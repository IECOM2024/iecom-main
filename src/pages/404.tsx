import { Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NotFound } from "~/components/NotFound";
import { PublicLayout } from "~/components/layout/PublicLayout";

export default function Page404() {
    const router = useRouter();

    return (
        <PublicLayout>
            <NotFound/>
        </PublicLayout>
    );
}