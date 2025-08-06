'use client'

import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import { useCompanyById } from '@/hooks/useCompanyByID'
import { useUpdateCompany } from '@/hooks/useUpdateCompany'

const CompanyDetail = () => {
  const { id } = useParams()
  const router = useRouter()
  const { data: company, isLoading } = useCompanyById(id as string)
  const { mutate: updateCompany, isPending } = useUpdateCompany()

  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    location: '',
    description: '',
  })

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || '',
        industry: company.industry || '',
        location: company.location || '',
        description: company.description || '',
      })
    }
  }, [company])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = () => {
    if (!id) return
    updateCompany(
      { id: id as string, data: formData },
      {
        onSuccess: () => {
          router.push('/company')
        },
        onError: (err) => {
          console.error('Update failed', err)
        },
      }
    )
  }

  if (isLoading) {
    return <p className="p-6">Loading company...</p>
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Company</h1>
      <div className="flex flex-col gap-4">
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Company Name"
        />
        <Input
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          placeholder="Industry"
        />
        <Input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
        />
        <Input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <div className="mt-4 flex gap-2">
          <Button variant="outline">Preview</Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? 'Updating...' : 'Update Company'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CompanyDetail
