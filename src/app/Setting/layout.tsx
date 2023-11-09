import Sidebar from "../components/Sidebar"

export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            <div className="layout">
                <Sidebar />
                <main className="layout__main-content">
                    {children}
                </main>
            </div>
        </section>
    )
}