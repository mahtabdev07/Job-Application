"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Pencil, Plus, Trash2 } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { useAllCompanies } from "@/hooks/useAllCompanies";
import axiosInstance from "@/lib/axios";
import { useMyCompanies } from "@/hooks/useMyCompanies";
import Link from "next/link";
import { useDeleteCompany } from "@/hooks/useDeleteCompany";

const CompanyPage = () => {
  const router = useRouter();
  const { data: myCompanies } = useMyCompanies();
  const { data: companies, isLoading } = useAllCompanies();
const { mutate: deleteCompany, isPending } = useDeleteCompany ()

  const handleRedirect = () => {
    router.push("/company/create");
  };

  const handleEdit = (id: string) => {
    router.push(`/company/${id}`);
  };

 const handleDelete = (id: string) => {
  if (confirm("Are you sure you want to delete this company?")) {
    deleteCompany(id)
  }
}

const handleCreateJob = (id: string) => {
  router.push(`/company/${id}/job/create`);
}

  const handleRedirectToDetailPage = (id: string) => {
    router.push(`/company/detail/${id}`);
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading companies...</p>;
  }

  return (
    <div className="flex flex-col h-full items-start gap-6 p-6">
      <section className="w-full">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-2xl font-bold">My companies</h1>
          <Link href={"/company/create"}>
            <Button onClick={handleRedirect} className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              Create Company
            </Button>
          </Link>
        </div>

        {myCompanies && myCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {myCompanies.map((company: any) => (
              <Card
                key={company.id}
                className="p-6 shadow-md border overflow-hidden border-muted bg-card flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-bold mb-1 text-primary">
                    {company.name}
                  </h2>
                  <p className="text-muted-foreground mb-1">
                    <strong>Industry:</strong> {company.industry}
                  </p>
                  <p className="text-muted-foreground mb-1">
                    <strong>Location:</strong> {company.location}
                  </p>
                 <div className="min-w-0 h-12 overflow-hidden test-elipsis">
  <p className="text-muted-foreground line-clamp-2">
    {company.description}
  </p>
</div>

                  <div className="flex justify-end mt-4 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCreateJob(company.id)}
                      className="flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Add Job
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(company.id)}
                      className="flex items-center gap-1"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(company.id)}
                      className="flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground mt-2">
            You haven't created any company yet.
          </p>
        )}
      </section>

      <h1 className="text-2xl font-bold">Explore Companies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {companies.map((company: any) => (
          <Card
            key={company.id}
            className="p-6 shadow-md border border-muted bg-card flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold mb-1 text-primary">
                {company.name}
              </h2>
              <p className="text-muted-foreground mb-1">
                <strong>Industry:</strong> {company.industry}
              </p>
              <p className="text-muted-foreground mb-1">
                <strong>Location:</strong> {company.location}
              </p>
              <p className="text-muted-foreground line-clamp-2">
                {company.description}
              </p>
            </div>
            <div className="flex justify-end mt-4 gap-2">
            <Button
  variant="outline"
  size="sm"
  className="flex items-center gap-1"
  onClick={() => handleRedirectToDetailPage(company.id)} // ✅ Correct click handler
>
  <Briefcase className="w-4 h-4" />
  View Openings
</Button>

            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CompanyPage;
