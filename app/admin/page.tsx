import Image from "next/image";
import Link from "next/link";

import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";

interface AppointmentDocument {
  name: string;
  [key: string]: any; // Adjust based on your actual data structure
}

const AdminPage = async () => {
  try {
    const appointments = await getRecentAppointmentList();

    // Ensure TypeScript knows the type of the documents
    const documents = (appointments.documents || []).filter(
      (
        doc: AppointmentDocument | null | undefined
      ): doc is AppointmentDocument =>
        doc !== null && doc !== undefined && typeof doc.name === "string"
    );

    return (
      <div className="mx-auto flex max-w-7xl flex-col space-y-14">
        <header className="admin-header">
          <Link href="/" className="cursor-pointer">
            <Image
              src="/assets/icons/logo-full.svg"
              height={32}
              width={162}
              alt="logo"
              className="h-8 w-fit"
            />
          </Link>
          <p className="text-16-semibold">Admin Dashboard</p>
        </header>

        <main className="admin-main">
          <section className="w-full space-y-4">
            <h1 className="header">Welcome 👋</h1>
            <p className="text-dark-700">
              Start the day with managing new appointments
            </p>
          </section>

          <section className="admin-stat">
            <StatCard
              type="appointments"
              count={appointments.scheduledCount || 0}
              label="Scheduled appointments"
              icon="/assets/icons/appointments.svg"
            />
            <StatCard
              type="pending"
              count={appointments.pendingCount || 0}
              label="Pending appointments"
              icon="/assets/icons/pending.svg"
            />
            <StatCard
              type="cancelled"
              count={appointments.cancelledCount || 0}
              label="Cancelled appointments"
              icon="/assets/icons/cancelled.svg"
            />
          </section>

          <DataTable columns={columns} data={documents} />
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error rendering AdminPage:", error);

    return (
      <div className="mx-auto max-w-7xl">
        <p className="text-red-500">
          Error loading admin dashboard. Please try again later.
        </p>
      </div>
    );
  }
};

export default AdminPage;
