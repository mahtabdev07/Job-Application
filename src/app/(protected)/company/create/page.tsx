// app/company/[id]/createjob/page.tsx

'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation"; // ✅ useParams added
import axiosInstance from "@/lib/axios";

const CreateJobPage = () => {
  const [job_title, setTitle] = useState("");
  const [job_description, setDescription] = useState("");
  const [job_location, setLocation] = useState("");
  const [salary_min, setMin] = useState("");
  const [salary_max, setMax] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const params = useParams(); // ✅ useParams hook
  const id = params.id as string; // 👈 cast it

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post("/api/job", {
        job_title,
        job_description,
        job_location,
        salary_min: Number(salary_min),
        salary_max: Number(salary_max),
        companyId: id, // ✅ use it here
      });
      router.push(`/company/detail/${id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Job Posting</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Job Title</Label>
          <Input
            id="title"
            placeholder="e.g. Frontend Developer"
            value={job_title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Job Description</Label>
          <Textarea
            id="description"
            placeholder="Write about the job..."
            value={job_description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
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
          <div className="w-full">
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

          <div className="w-full">
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

        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Job"}
        </Button>
      </form>
    </div>
  );
};

export default CreateJobPage;
