"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useCreateJob } from "@/hooks/useCreateJob";

const CreateJobPage = () => {
  const [job_title, setTitle] = useState("");
  const [job_description, setDescription] = useState("");
  const [job_location, setLocation] = useState("");
  const [salary_min, setMin] = useState("");
  const [salary_max, setMax] = useState("");

  const router = useRouter();
  const params = useParams();
  const companyId = params?.id as string;

  const { mutate: createJob, isPending } = useCreateJob();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createJob(
      {
        job_title,
        job_description,
        job_location,
        salary_min: Number(salary_min),
        salary_max: Number(salary_max),
        companyId,
      },
      {
        onSuccess: () => {
          router.push(`/company/detail/${companyId}`);
        },
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Create Job Posting</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-7">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                placeholder="e.g. Frontend Developer"
                value={job_title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                placeholder="Write about the job..."
                value={job_description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g. Remote, Delhi, etc."
                value={job_location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div className="flex gap-4">
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="min">Min Salary</Label>
                <Input
                  id="min"
                  type="number"
                  placeholder="e.g. 30000"
                  value={salary_min}
                  onChange={(e) => setMin(e.target.value)}
                  required
                />
              </div>

              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="max">Max Salary</Label>
                <Input
                  id="max"
                  type="number"
                  placeholder="e.g. 70000"
                  value={salary_max}
                  onChange={(e) => setMax(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Creating..." : "Create Job"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateJobPage;
