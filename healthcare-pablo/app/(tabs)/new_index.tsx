"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

export default function MedicalRegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    allergies: "",
    currentMedications: "",
    procedure: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    consent: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, procedure: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, consent: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (Object.values(formData).some(value => value === "") || !formData.consent) {
      toast({
        title: "Error",
        description: "Please fill out all fields and provide consent.",
        variant: "destructive"
      })
    } else {
      toast({
        title: "Registration Successful",
        description: "Your registration for the medical procedure has been submitted.",
      })
      console.log(formData)
      // Here you would typically send the data to your backend
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Medical Procedure Registration</CardTitle>
        <CardDescription>Please fill out all fields to register for your medical procedure.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" required onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" required onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input id="dateOfBirth" name="dateOfBirth" type="date" required onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" type="tel" required onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="procedure">Procedure</Label>
              <Select onValueChange={handleSelectChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select procedure" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general-checkup">General Check-up</SelectItem>
                  <SelectItem value="blood-test">Blood Test</SelectItem>
                  <SelectItem value="x-ray">X-Ray</SelectItem>
                  <SelectItem value="mri">MRI</SelectItem>
                  <SelectItem value="surgery">Surgery</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <Label htmlFor="allergies">Allergies</Label>
            <Textarea id="allergies" name="allergies" placeholder="List any allergies..." onChange={handleInputChange} />
          </div>
          <div className="space-y-2 mt-4">
            <Label htmlFor="currentMedications">Current Medications</Label>
            <Textarea id="currentMedications" name="currentMedications" placeholder="List current medications..." onChange={handleInputChange} />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
              <Input id="emergencyContactName" name="emergencyContactName" required onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
              <Input id="emergencyContactPhone" name="emergencyContactPhone" type="tel" required onChange={handleInputChange} />
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <Checkbox id="consent" onCheckedChange={handleCheckboxChange} />
            <Label htmlFor="consent">
              I consent to the procedure and agree to the terms and conditions.
            </Label>
          </div>
          <Button type="submit" className="w-full mt-6">Submit Registration</Button>
        </form>
      </CardContent>
    </Card>
  )
}