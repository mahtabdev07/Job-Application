"use client";

import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const Filter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Checkbox filter handler
  const updateQuery = useCallback(
    (name: string, value: string, checked: boolean) => {
      const params = new URLSearchParams(searchParams.toString());

      const existingValues = params.getAll(name);

      if (checked) {
        params.append(name, value);
      } else {
        const updated = existingValues.filter((v) => v !== value);
        params.delete(name);
        updated.forEach((v) => params.append(name, v));
      }

      router.push(`/search?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <Card className="w-full shadow-none px-6 py-4 gap-2">
      <h2 className="text-lg font-semibold mb-3">Filter</h2>

      <div className="space-y-4">
        {/* Job Type Filter */}
        <div>
          <h3 className="text-sm font-bold mb-3">Job Type</h3>
          <div className="space-y-5">
            {["onsite", "remote", "hybrid"].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={searchParams
                    .getAll("job_employment_type_text")
                    .includes(type)}
                  onCheckedChange={(checked) =>
                    updateQuery("job_employment_type_text", type, !!checked)
                  }
                />
                <Label htmlFor={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Location Filter */}
        <div>
          <h3 className="text-sm font-bold mb-3">Location</h3>
          <div className="space-y-5">
            {["himachal", "dehradun", "shimla"].map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox
                  id={location}
                  checked={searchParams.getAll("location").includes(location)}
                  onCheckedChange={(checked) =>
                    updateQuery("location", location, !!checked)
                  }
                />
                <Label htmlFor={location}>
                  {location.charAt(0).toUpperCase() + location.slice(1)}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Filter;
