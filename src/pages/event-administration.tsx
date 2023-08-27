import { useSession } from "next-auth/react";
import { EventAdministration } from "~/components/EventAdministration";
import { AdminRoleLayout } from "~/components/layout/AdminRoleLayout";

export default function EventAdministrationPage() {
    const {data: session} = useSession()

    if (!session || session.user.role !== "ADMIN") return <></>

    return <AdminRoleLayout session={session}>
        <EventAdministration/>
    </AdminRoleLayout>
}