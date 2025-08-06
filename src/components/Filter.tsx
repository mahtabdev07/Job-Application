"use client";

import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";

const Filter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 100000]);

  // Update salary range from URL on mount or param change
  useEffect(() => {
    const min = parseInt(searchParams.get("minSalary") || "0");
    const max = parseInt(searchParams.get("maxSalary") || "100000");
    setSalaryRange([min, max]);
  }, [searchParams]);

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

  // Slider update handler
  const updateSalaryRange = (range: [number, number]) => {
    setSalaryRange(range);
    const [min, max] = range;
    const params = new URLSearchParams(searchParams.toString());

    params.set("minSalary", min.toString());
    params.set("maxSalary", max.toString());

    router.push(`/search?${params.toString()}`);
  };

  return (
    <Card className="w-full shadow-none px-4 py-2 gap-2">
      <h2 className="text-lg font-semibold mb-3">Filter</h2>

      <div className="space-y-4">
        {/* Job Type Filter */}
        <div>
          <h3 className="text-sm font-medium mb-2">Job Type</h3>
          <div className="space-y-2">
            {["remote", "hybrid"].map((type) => (
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
          <h3 className="text-sm font-medium mb-2">Location</h3>
          <div className="space-y-2">
            {["chennai", "delhi"].map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox
                  id={location}
                  checked={searchParams
                    .getAll("location")
                    .includes(location)}
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

        {/* Salary Range Filter */}
        <div>
          <h3 className="text-sm font-medium mb-2">Salary Range</h3>
          <Slider
            value={salaryRange}
            min={0}
            max={200000}
            step={1000}
            onValueChange={(range) => setSalaryRange(range as [number, number])}
            onValueCommit={(range) =>
              updateSalaryRange(range as [number, number])
            }
          />
          <div className="text-xs text-muted-foreground mt-1">
            ₹{salaryRange[0].toLocaleString()} - ₹{salaryRange[1].toLocaleString()}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Filter;
