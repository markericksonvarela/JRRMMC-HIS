import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function CF1RiskFactor() {
  const [tobaccoUse, setTobaccoUse] = useState<string>("")
  const [yesNo, setYesNo] = useState<string>("")
  const [yesNo2, setYesNo2] = useState<string>("")
  const [yesNo3, setYesNo3] = useState<string>("")
  const [yesNo4, setYesNo4] = useState<string>("")
  const [alcoholUse, setAlcoholUse] = useState<string>("")
  const [physicalAct, setPhysicalAct] = useState<string>("")
  const [hdFatMeat, sethdFatMeat] = useState<string>("")
  const [hdVegetable, sethdVegetable] = useState<string>("")
  const [hdSodium, sethdSodium] = useState<string>("")
  const [hdSugar, sethdSugar] = useState<string>("")
  const [selectedOccExp, setSelectedOccExp] = useState<string[]>([])
  const [othersOccExp, setOthersOccExp] = useState<string>("")
  const [famHistCancer, setFamHistCancer] = useState<string>("")
  const [selectedCancerSites, setSelectedCancerSites] = useState<string[]>([])
  const [othersCancerSite, setOthersCancerSite] = useState<string>("")
  const [patInfection, setPatInfection] = useState<string[]>([])
  const [othersPatInfection, setOthersPatInfection] = useState<string>("")
  const [patComorbidities, setPatComorbidities] = useState<string[]>([])
  const [othersPatComorbidities, setOthersPatComorbidities] = useState<string>("")
  const [selectedCancerSites2, setSelectedCancerSites2] = useState<string[]>([])
  const [othersCancerSite2, setOthersCancerSite2] = useState<string>("")
  const [cancerYears, setCancerYears] = useState<Record<string, string>>({})
  const [cancerStatuses, setCancerStatuses] = useState<Record<string, string>>({})
  const [otherMedicalHistory, setOtherMedicalHistory] = useState<string>("")
  const [sexOrient, setSexOrient] = useState<string>("")
  const [othersSexOrient, setOthersSexOrient] = useState<string>("")
  const [numSexPartners, setNumSexPartners] = useState<string>("")
  const [ageFirstSexIntercourse, setAgeFirstSexIntercourse] = useState<string>("")
  const [useContraceptives, setUseContraceptives] = useState<string>("")
  const [selectedContraceptives, setSelectedContraceptives] = useState<string[]>([])
  const [othersContraceptives, setOthersContraceptives] = useState<string>("")
  const [selectedCancerScreening, setSelectedCancerScreening] = useState<string[]>([])
  const [othersCancerScreening, setOthersCancerScreening] = useState<string>("")
  const [hpvVaccine, setHpvVaccine] = useState<string>("")
  const [hepBVaccine, setHepBVaccine] = useState<string>("")
  const [otherVaccines, setOtherVaccines] = useState<string>("")
  

  // Clear checkboxes when not "Yes"
  useEffect(() => {
    if (yesNo2 !== 'Y') {
      setSelectedOccExp([])
      setOthersOccExp("")
    }
  }, [yesNo2])

  useEffect(() => {
    if (famHistCancer !== 'Y') {
      setSelectedCancerSites([])
      setOthersCancerSite("")
    }
  }, [famHistCancer])

  useEffect(() => {
    if (yesNo4 !== 'Y') {
      setSelectedCancerSites2([])
      setOthersCancerSite2("")
      setCancerYears({})
      setCancerStatuses({})
    }
  }, [yesNo4])

  useEffect(() => {
    if (sexOrient !== 'others') {
      setOthersSexOrient("")
    }
  }, [sexOrient])

  useEffect(() => {
    if (useContraceptives !== 'Y') {
      setSelectedContraceptives([])
      setOthersContraceptives("")
    }
  }, [useContraceptives])

  // Handle save
  const handleSave = () => {
    // Add your save logic here
    console.log('Saving record...')
  }

  // Handle checkbox changes
  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (yesNo2 !== 'Y') return
    
    if (checked) {
        setSelectedOccExp([...selectedOccExp, value])
    } else {
        setSelectedOccExp(selectedOccExp.filter(item => item !== value))
        if (value === 'others') {
            setOthersOccExp("")
        }
    }
  }

  const handleCancerSiteCheckboxChange = (value: string, checked: boolean) => {
    if (famHistCancer !== 'Y') return
    
    if (checked) {
        setSelectedCancerSites([...selectedCancerSites, value])
    } else {
        setSelectedCancerSites(selectedCancerSites.filter(item => item !== value))
        if (value === 'others') {
            setOthersCancerSite("")
        }
    }
  }

  const handleInfectionCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
        setPatInfection([...patInfection, value])
    } else {
        setPatInfection(patInfection.filter(item => item !== value))
        if (value === 'others') {
            setOthersPatInfection("")
        }
    }
  }

  const handleComorbiditiesCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
        setPatComorbidities([...patComorbidities, value])
    } else {
        setPatComorbidities(patComorbidities.filter(item => item !== value))
        if (value === 'others') {
            setOthersPatComorbidities("")
        }
    }
  }

  const handleCancerSite2CheckboxChange = (value: string, checked: boolean) => {
    if (yesNo4 !== 'Y') return
    
    if (checked) {
        setSelectedCancerSites2([...selectedCancerSites2, value])
    } else {
        setSelectedCancerSites2(selectedCancerSites2.filter(item => item !== value))
        if (value === 'others') {
            setOthersCancerSite2("")
        }
        // Clear year and status when unchecked
        const newYears = { ...cancerYears }
        const newStatuses = { ...cancerStatuses }
        delete newYears[value]
        delete newStatuses[value]
        setCancerYears(newYears)
        setCancerStatuses(newStatuses)
    }
  }

  const handleCancerYearChange = (siteId: string, year: string) => {
    setCancerYears({ ...cancerYears, [siteId]: year })
  }

  const handleCancerStatusChange = (siteId: string, status: string) => {
    setCancerStatuses({ ...cancerStatuses, [siteId]: status })
  }

  const handleContraceptivesCheckboxChange = (value: string, checked: boolean) => {
    if (useContraceptives !== 'Y') return
    
    if (checked) {
        setSelectedContraceptives([...selectedContraceptives, value])
    } else {
        setSelectedContraceptives(selectedContraceptives.filter(item => item !== value))
        if (value === 'others') {
            setOthersContraceptives("")
        }
    }
  }

  const handleCancerScreeningCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
        setSelectedCancerScreening([...selectedCancerScreening, value])
    } else {
        setSelectedCancerScreening(selectedCancerScreening.filter(item => item !== value))
        if (value === 'others') {
            setOthersCancerScreening("")
        }
    }
  }

  // Checkbox fields
  const exposuresCol1 = [
    { id: '1', label: 'Cement dust' },
    { id: '2', label: 'Cotton' },
    { id: '3', label: 'Chemical Fumes' },
    { id: '4', label: 'Grains' },
    { id: '5', label: 'Metal' },
  ]

  const exposuresCol2 = [
    { id: '6', label: 'Paper' },
    { id: '7', label: 'Radiation' },
    { id: '8', label: 'Silica' },
    { id: '9', label: 'Smoke' },
  ]

  const cancerSitesCol1 = [
    { id: 'adrenal', label: 'Adrenal' },
    { id: 'anus', label: 'Anus' },
    { id: 'biliary-tract', label: 'Biliary Tract' },
    { id: 'blood-all', label: 'Blood - Acute Lymphocytic Leukemia' },
    { id: 'blood-aml', label: 'Blood - Acute Myelogenous Leukemia' },
    { id: 'blood-cll', label: 'Blood - Chronic Lymphocytic Leukemia' },
    { id: 'blood-cml', label: 'Blood - Chronic Myelogenous Leukemia' },
    { id: 'blood-mds', label: 'Blood - Myelodysplastic Syndromes' },
    { id: 'blood-pcd', label: 'Blood - Plasma Cell Disorders' },
    { id: 'bone', label: 'Bone' },
    { id: 'brain-cns', label: 'Brain - Central Nervous System' },
    { id: 'breast', label: 'Breast' },
    { id: 'cervix', label: 'Cervix' },
    { id: 'colon', label: 'Colon' },
  ]

  const cancerSitesCol2 = [
    { id: 'esophagus', label: 'Esophagus' },
    { id: 'eyes-orbit', label: 'Eyes and Orbit' },
    { id: 'gallbladder', label: 'Gallbladder' },
    { id: 'gastroesophageal', label: 'Gastroesophageal Junction' },
    { id: 'hodgkin', label: 'Hodgkin Lymphoma' },
    { id: 'hypopharynx', label: 'Hypopharynx' },
    { id: 'kaposi', label: 'Kaposi Sarcoma' },
    { id: 'kidney', label: 'Kidney' },
    { id: 'larynx', label: 'Larynx' },
    { id: 'leukemia', label: 'Leukemia' },
    { id: 'lip-oral', label: 'Lip/Oral Cavity' },
    { id: 'liver', label: 'Liver' },
    { id: 'lung', label: 'Lung' },
    { id: 'melanoma', label: 'Melanoma of Skin' },
  ]

  const cancerSitesCol3 = [
    { id: 'mesothelioma', label: 'Mesothelioma' },
    { id: 'multiple-myeloma', label: 'Multiple Myeloma' },
    { id: 'nasopharynx', label: 'Nasopharynx' },
    { id: 'non-hodgkin', label: 'Non-Hodgkin Lymphoma' },
    { id: 'oral-cavity', label: 'Oral Cavity' },
    { id: 'oropharynx', label: 'Oropharynx' },
    { id: 'ovary', label: 'Ovary' },
    { id: 'pancreas', label: 'Pancreas' },
    { id: 'paranasal', label: 'Paranasal Sinus' },
    { id: 'peritoneal', label: 'Peritoneal' },
    { id: 'prostate', label: 'Prostate' },
    { id: 'rectum', label: 'Rectum' },
    { id: 'renal-pelvis', label: 'Renal Pelvis/Ureters' },
    { id: 'salivary', label: 'Salivary Glands' },
  ]

  const cancerSitesCol4 = [
    { id: 'skin', label: 'Skin' },
    { id: 'small-bowel', label: 'Small Bowel' },
    { id: 'soft-tissue', label: 'Soft Tissue Sarcoma' },
    { id: 'spinal-cord', label: 'Spinal Cord' },
    { id: 'stomach', label: 'Stomach' },
    { id: 'testis', label: 'Testis' },
    { id: 'thymus', label: 'Thymus' },
    { id: 'thyroid', label: 'Thyroid' },
    { id: 'unknown-primary', label: 'Unknown Primary (Occult Primary)' },
    { id: 'urinary-bladder', label: 'Urinary Bladder' },
    { id: 'uterus', label: 'Uterus' },
    { id: 'vagina', label: 'Vagina' },
    { id: 'vulva', label: 'Vulva' },
  ]

  const infectionsCol1 = [
    { id: 'hep-b', label: 'Hepatitis B (Hep B)' },
    { id: 'hep-c', label: 'Hepatitis C (Hep C)' },
    { id: 'hep-d', label: 'Hepatitis D (Hep C)' },
    { id: 'hep-e', label: 'Hepatitis E (Hep E)' },
    { id: 'hpv', label: 'Human Papillomavirus (HPV)' },
    { id: 'hiv', label: 'Human Immunodeficiency Virus (HIV)' },
    { id: 'ebv', label: 'Epstein-Barr Virus (EBV)' },
    { id: 'kshv', label: 'Kaposi Sarcoma Herpesvirus (KSHV or HHV-8)' },
    { id: 'htlv-1', label: 'Human T-lymphotropic Virus Type 1 (HTLV-1)' }
  ]

  const infectionsCol2 = [
    { id: 'mcpv', label: 'Hepatitis B (Hep B)' },
    { id: 'hpyl', label: 'Hepatitis C (Hep C)' },
    { id: 'chlam', label: 'Hepatitis D (Hep C)' },
    { id: 'schis', label: 'Hepatitis E (Hep E)' },
    { id: 'opis', label: 'Human Papillomavirus (HPV)' },
    { id: 'clon', label: 'Human Immunodeficiency Virus (HIV)' },
    { id: 'none', label: 'Epstein-Barr Virus (EBV)' },
    { id: 'unkn', label: 'Kaposi Sarcoma Herpesvirus (KSHV or HHV-8)' }
  ]

  const comorbidityCol1 = [
    { id: 'cardio', label: 'Cardiovascular disease' },
    { id: 'chres', label: 'Chronic respiratory disease' },
    { id: 'chkid', label: 'Chronic kidney disease' },
    { id: 'diab', label: 'Diabetes mellitus' }
  ]

  const comorbidityCol2 = [
    { id: 'hypt', label: 'Hypertension' },
    { id: 'immu', label: 'Immunosuppression/Immunodeficiency' },
    { id: 'livd', label: 'Liver disease' },
    { id: 'obes', label: 'Obesity' }
  ]

  const comorbidityCol3 = [
    { id: 'tb', label: 'Tubercolosis' },
    { id: 'none', label: 'None' },
    { id: 'unk', label: 'Unknown' }
  ]

  const cancerCol = [
    { id: 'adrenal', label: 'Adrenal' },
    { id: 'anus', label: 'Anus' },
    { id: 'biliary-tract', label: 'Biliary Tract' },
    { id: 'blood-all', label: 'Blood - Acute Lymphocytic Leukemia' },
    { id: 'blood-aml', label: 'Blood - Acute Myelogenous Leukemia' },
    { id: 'blood-cll', label: 'Blood - Chronic Lymphocytic Leukemia' },
    { id: 'blood-cml', label: 'Blood - Chronic Myelogenous Leukemia' },
    { id: 'blood-mds', label: 'Blood - Myelodysplastic Syndromes' },
    { id: 'blood-pcd', label: 'Blood - Plasma Cell Disorders' },
    { id: 'bone', label: 'Bone' },
    { id: 'brain-cns', label: 'Brain - Central Nervous System' },
    { id: 'breast', label: 'Breast' },
    { id: 'cervix', label: 'Cervix' },
    { id: 'colon', label: 'Colon' },
    { id: 'esophagus', label: 'Esophagus' },
    { id: 'eyes-orbit', label: 'Eyes and Orbit' },
    { id: 'gallbladder', label: 'Gallbladder' },
    { id: 'gastroesophageal', label: 'Gastroesophageal Junction' },
    { id: 'hodgkin', label: 'Hodgkin Lymphoma' },
    { id: 'hypopharynx', label: 'Hypopharynx' },
    { id: 'kaposi', label: 'Kaposi Sarcoma' },
    { id: 'kidney', label: 'Kidney' },
    { id: 'larynx', label: 'Larynx' },
    { id: 'leukemia', label: 'Leukemia' },
    { id: 'lip-oral', label: 'Lip/Oral Cavity' },
    { id: 'liver', label: 'Liver' },
    { id: 'lung', label: 'Lung' },
    { id: 'melanoma', label: 'Melanoma of Skin' },
    { id: 'mesothelioma', label: 'Mesothelioma' },
    { id: 'multiple-myeloma', label: 'Multiple Myeloma' },
    { id: 'nasopharynx', label: 'Nasopharynx' },
    { id: 'non-hodgkin', label: 'Non-Hodgkin Lymphoma' },
    { id: 'oral-cavity', label: 'Oral Cavity' },
    { id: 'oropharynx', label: 'Oropharynx' },
    { id: 'ovary', label: 'Ovary' },
    { id: 'pancreas', label: 'Pancreas' },
    { id: 'paranasal', label: 'Paranasal Sinus' },
    { id: 'peritoneal', label: 'Peritoneal' },
    { id: 'prostate', label: 'Prostate' },
    { id: 'rectum', label: 'Rectum' },
    { id: 'renal-pelvis', label: 'Renal Pelvis/Ureters' },
    { id: 'salivary', label: 'Salivary Glands' },
    { id: 'skin', label: 'Skin' },
    { id: 'small-bowel', label: 'Small Bowel' },
    { id: 'soft-tissue', label: 'Soft Tissue Sarcoma' },
    { id: 'spinal-cord', label: 'Spinal Cord' },
    { id: 'stomach', label: 'Stomach' },
    { id: 'testis', label: 'Testis' },
    { id: 'thymus', label: 'Thymus' },
    { id: 'thyroid', label: 'Thyroid' },
    { id: 'unknown-primary', label: 'Unknown Primary (Occult Primary)' },
    { id: 'urinary-bladder', label: 'Urinary Bladder' },
    { id: 'uterus', label: 'Uterus' },
    { id: 'vagina', label: 'Vagina' },
    { id: 'vulva', label: 'Vulva' },
  ]

  const contraceptiveMethods = [
    { id: 'hormonal', label: 'Hormonal Contraceptives' },
    { id: 'barrier', label: 'Barrier Methods' },
    { id: 'permanent', label: 'Permanent Methods' },
    { id: 'iud', label: 'Intrauterine Devices (IUDs)' },
    { id: 'behavioral', label: 'Behavioral Methods' },
  ]

  const cancerScreeningCol1 = [
    { id: 'clinical-breast', label: 'Clinical Breast Examination' },
    { id: 'breast-ultrasound', label: 'Breast Ultrasound' },
    { id: 'mammography', label: 'Mammography' },
    { id: 'via', label: 'Visual Inspection with Acetic Acid (VIA)' },
    { id: 'pap-smear', label: 'Cytology/Pap Smear' },
    { id: 'hpv-testing', label: 'HPV Testing' },
    { id: 'fobt', label: 'Fecal Occult Blood Test (FOBT)' },
  ]

  const cancerScreeningCol2 = [
    { id: 'fit', label: 'Stool Fecal Immunochemical Test (FIT)' },
    { id: 'colonoscopy', label: 'Colonoscopy' },
    { id: 'chest-ct', label: 'Low-dose Chest CT Scan' },
    { id: 'no-screening', label: 'No cancer screening received' },
    { id: 'unknown', label: 'Unknown' },
  ]

  return (
    <Card className="w-full h-fit">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-semibold">Risk Factor Profile of Patient</CardTitle>
          <Button onClick={handleSave} className="h-9">
            <Save className="mr-2 h-4 w-4" />
            Save Record
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
          <div className="space-y-1">
            <Label htmlFor="tobacco" className="text-sm">Tobacco use</Label>
            <Select value={tobaccoUse} onValueChange={setTobaccoUse}>
              <SelectTrigger id="tobacco" className="h-9" showClear={!!tobaccoUse} onClear={() => setTobaccoUse("")}>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CS">Current Smoker</SelectItem>
                <SelectItem value="PS">Previous Smoker</SelectItem>
                <SelectItem value="NS">Non-smoker</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="smoke-exposure" className="text-sm">Second-Hand Smoke Exposure</Label>
            <Select value={yesNo} onValueChange={setYesNo}>
              <SelectTrigger id="smoke-exposure" className="h-9" showClear={!!yesNo} onClear={() => setYesNo("")}>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Y">Yes</SelectItem>
                <SelectItem value="N">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="alcohol" className="text-sm">Harmful Use of Alcohol</Label>
            <Select value={alcoholUse} onValueChange={setAlcoholUse}>
              <SelectTrigger id="alcohol" className="h-9" showClear={!!alcoholUse} onClear={() => setAlcoholUse("")}>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CURR">Current harmful use</SelectItem>
                <SelectItem value="PREV">Previous harmful use</SelectItem>
                <SelectItem value="NOHIS">No history</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="physical-activity" className="text-sm">Physical Activity</Label>
            <Select value={physicalAct} onValueChange={setPhysicalAct}>
              <SelectTrigger id="physical-activity" className="h-9" showClear={!!physicalAct} onClear={() => setPhysicalAct("")}>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UIA">Usually Inactive</SelectItem>
                <SelectItem value="MA">Moderately Active</SelectItem>
                <SelectItem value="VA">Very Active</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="pt-2 border-t">
          <h3 className="text-base font-semibold mb-2">Healthy Diet</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="space-y-1">
              <Label className="text-sm">Fat-Meat</Label>
              <Select value={hdFatMeat} onValueChange={sethdFatMeat}>
                <SelectTrigger className="h-8 text-xs" showClear={!!hdFatMeat} onClear={() => sethdFatMeat("")}>
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="H">High</SelectItem>
                  <SelectItem value="M">Moderate</SelectItem>
                  <SelectItem value="L">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-sm">Vegetables</Label>
              <Select value={hdVegetable} onValueChange={sethdVegetable}>
                <SelectTrigger className="h-8 text-xs" showClear={!!hdVegetable} onClear={() => sethdVegetable("")}>
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="H">High</SelectItem>
                  <SelectItem value="M">Moderate</SelectItem>
                  <SelectItem value="L">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-sm">Sodium/Salt</Label>
              <Select value={hdSodium} onValueChange={sethdSodium}>
                <SelectTrigger className="h-8 text-xs" showClear={!!hdSodium} onClear={() => sethdSodium("")}>
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="H">High</SelectItem>
                  <SelectItem value="M">Moderate</SelectItem>
                  <SelectItem value="L">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-sm">Sugar</Label>
              <Select value={hdSugar} onValueChange={sethdSugar}>
                <SelectTrigger className="h-8 text-xs" showClear={!!hdSugar} onClear={() => sethdSugar("")}>
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="H">High</SelectItem>
                  <SelectItem value="M">Moderate</SelectItem>
                  <SelectItem value="L">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
            <div className="space-y-1">
              <Label htmlFor="occupational-exposure" className="text-sm">Occupational Exposure</Label>
              <Select value={yesNo2} onValueChange={setYesNo2}>
                <SelectTrigger id="occupational-exposure" className="h-9" showClear={!!yesNo2} onClear={() => setYesNo2("")}>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Y">Yes</SelectItem>
                  <SelectItem value="N">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">
                If yes, specify: <span className="text-muted-foreground italic font-normal">(can be multiple)</span>
              </Label>

              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                <div className="space-y-2">
                  {exposuresCol1.map((exposure) => (
                    <div key={exposure.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`exposure-${exposure.id}`}
                        checked={selectedOccExp.includes(exposure.id)}
                        disabled={yesNo2 !== 'Y'}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange(exposure.id, checked as boolean)
                        }
                      />
                      <Label 
                        htmlFor={`exposure-${exposure.id}`}
                        className={`text-sm font-normal cursor-pointer ${yesNo2 !== 'Y' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {exposure.label}
                      </Label>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  {exposuresCol2.map((exposure) => (
                    <div key={exposure.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`exposure-${exposure.id}`}
                        checked={selectedOccExp.includes(exposure.id)}
                        disabled={yesNo2 !== 'Y'}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange(exposure.id, checked as boolean)
                        }
                      />
                      <Label 
                        htmlFor={`exposure-${exposure.id}`}
                        className={`text-sm font-normal cursor-pointer ${yesNo2 !== 'Y' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {exposure.label}
                      </Label>
                    </div>
                  ))}

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="exposure-others"
                      checked={selectedOccExp.includes('others')}
                      disabled={yesNo2 !== 'Y'}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange('others', checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor="exposure-others"
                      className={`text-sm font-normal cursor-pointer whitespace-nowrap ${yesNo2 !== 'Y' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      Others, specify:
                    </Label>
                    <Input
                      type="text"
                      placeholder="Please specify"
                      value={othersOccExp}
                      onChange={(e) => setOthersOccExp(e.target.value.toUpperCase())}
                      disabled={yesNo2 !== 'Y' || !selectedOccExp.includes('others')}
                      className="h-9 flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-x-4 gap-y-3">
                <div className="space-y-1">
                    <Label htmlFor="outdoor-air" className="text-sm">Outdoor Air Pollution Exposure</Label>
                    <Select value={yesNo3} onValueChange={setYesNo3}>
                    <SelectTrigger id="outdoor-air" className="h-9" showClear={!!yesNo3} onClear={() => setYesNo3("")}>
                        <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Y">Yes</SelectItem>
                        <SelectItem value="N">No</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
            </div>
        </div>

        <div className="pt-2 border-t">
            <div className="space-y-3">
                <div className="space-y-1">
                    <Label htmlFor="fam-hist-cancer" className="text-sm">Family History of Cancer <span className='text-muted-foreground italic font-normal'>(Up to 3rd degree of Consaguinity)</span></Label>
                    <Select value={famHistCancer} onValueChange={setFamHistCancer}>
                    <SelectTrigger id="fam-hist-cancer" className="h-9" showClear={!!famHistCancer} onClear={() => setFamHistCancer("")}>
                        <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Y">Yes</SelectItem>
                        <SelectItem value="N">No</SelectItem>
                        <SelectItem value="U">Unknown</SelectItem>
                        <SelectItem value="NK">No Known Genetic Disposition for Cancer</SelectItem>
                    </SelectContent>
                    </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    If yes, what cancer site/s? <span className="text-muted-foreground italic font-normal">(can be multiple)</span>
                  </Label>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-2">
                    <div className="space-y-2">
                      {cancerSitesCol1.map((site) => (
                        <div key={site.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`cancer-site-${site.id}`}
                            checked={selectedCancerSites.includes(site.id)}
                            disabled={famHistCancer !== 'Y'}
                            onCheckedChange={(checked) => 
                              handleCancerSiteCheckboxChange(site.id, checked as boolean)
                            }
                          />
                          <Label 
                            htmlFor={`cancer-site-${site.id}`}
                            className={`text-sm font-normal cursor-pointer ${famHistCancer !== 'Y' ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            {site.label}
                          </Label>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      {cancerSitesCol2.map((site) => (
                        <div key={site.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`cancer-site-${site.id}`}
                            checked={selectedCancerSites.includes(site.id)}
                            disabled={famHistCancer !== 'Y'}
                            onCheckedChange={(checked) => 
                              handleCancerSiteCheckboxChange(site.id, checked as boolean)
                            }
                          />
                          <Label 
                            htmlFor={`cancer-site-${site.id}`}
                            className={`text-sm font-normal cursor-pointer ${famHistCancer !== 'Y' ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            {site.label}
                          </Label>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      {cancerSitesCol3.map((site) => (
                        <div key={site.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`cancer-site-${site.id}`}
                            checked={selectedCancerSites.includes(site.id)}
                            disabled={famHistCancer !== 'Y'}
                            onCheckedChange={(checked) => 
                              handleCancerSiteCheckboxChange(site.id, checked as boolean)
                            }
                          />
                          <Label 
                            htmlFor={`cancer-site-${site.id}`}
                            className={`text-sm font-normal cursor-pointer ${famHistCancer !== 'Y' ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            {site.label}
                          </Label>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      {cancerSitesCol4.map((site) => (
                        <div key={site.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`cancer-site-${site.id}`}
                            checked={selectedCancerSites.includes(site.id)}
                            disabled={famHistCancer !== 'Y'}
                            onCheckedChange={(checked) => 
                              handleCancerSiteCheckboxChange(site.id, checked as boolean)
                            }
                          />
                          <Label 
                            htmlFor={`cancer-site-${site.id}`}
                            className={`text-sm font-normal cursor-pointer ${famHistCancer !== 'Y' ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            {site.label}
                          </Label>
                        </div>
                      ))}

                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="cancer-site-others"
                          checked={selectedCancerSites.includes('others')}
                          disabled={famHistCancer !== 'Y'}
                          onCheckedChange={(checked) => 
                            handleCancerSiteCheckboxChange('others', checked as boolean)
                          }
                        />
                        <Label 
                          htmlFor="cancer-site-others"
                          className={`text-sm font-normal cursor-pointer whitespace-nowrap ${famHistCancer !== 'Y' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          Others, specify:
                        </Label>
                        <Input
                          type="text"
                          placeholder="Please specify"
                          value={othersCancerSite}
                          onChange={(e) => setOthersCancerSite(e.target.value.toUpperCase())}
                          disabled={famHistCancer !== 'Y' || !selectedCancerSites.includes('others')}
                          className="h-9 flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>

        <div className="pt-2 border-t">
            <h3 className="text-base font-semibold mt-2 mb-3">Medical History</h3>

            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Has the patient ever been diagnosed or tested positive for any of the following infections?
              </Label>

              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                    <div className="space-y-2">
                    {infectionsCol1.map((infection) => (
                        <div key={infection.id} className="flex items-center space-x-2">
                        <Checkbox
                            id={`infection-${infection.id}`}
                            checked={patInfection.includes(infection.id)}
                            onCheckedChange={(checked) => 
                            handleInfectionCheckboxChange(infection.id, checked as boolean)
                            }
                        />
                        <Label 
                            htmlFor={`infection-${infection.id}`}
                            className={`text-sm font-normal cursor-pointer`}
                        >
                            {infection.label}
                        </Label>
                        </div>
                    ))}
                    </div>

                    <div className="space-y-2">
                    {infectionsCol2.map((infection) => (
                        <div key={infection.id} className="flex items-center space-x-2">
                        <Checkbox
                            id={`infection-${infection.id}`}
                            checked={patInfection.includes(infection.id)}
                            onCheckedChange={(checked) => 
                            handleInfectionCheckboxChange(infection.id, checked as boolean)
                            }
                        />
                        <Label 
                            htmlFor={`infection-${infection.id}`}
                            className={`text-sm font-normal cursor-pointer`}
                        >
                            {infection.label}
                        </Label>
                        </div>
                    ))}

                    <div className="flex items-center gap-2">
                        <Checkbox
                        id="infection-others"
                        checked={patInfection.includes('others')}
                        onCheckedChange={(checked) => 
                            handleInfectionCheckboxChange('others', checked as boolean)
                        }
                        />
                        <Label 
                        htmlFor="exposure-others"
                        className={`text-sm font-normal cursor-pointer whitespace-nowrap`}
                        >
                        Others, specify:
                        </Label>
                        <Input
                        type="text"
                        placeholder="Please specify"
                        value={othersPatInfection}
                        onChange={(e) => setOthersPatInfection(e.target.value.toUpperCase())}
                        disabled={!patInfection.includes('others')}
                        className="h-9 flex-1"
                        />
                    </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="pt-2 border-t">
          <div className="space-y-3 mt-1">
            <Label className="text-sm font-medium">
              Has the patient ever been diagnosed with any of the following comorbidities?
            </Label>

            <div className="grid grid-cols-3 gap-x-8 gap-y-2">
              <div className="space-y-2">
                {comorbidityCol1.map((comorbidity) => (
                  <div key={comorbidity.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`comorbidity-${comorbidity.id}`}
                      checked={patComorbidities.includes(comorbidity.id)}
                      onCheckedChange={(checked) => 
                        handleComorbiditiesCheckboxChange(comorbidity.id, checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={`comorbidity-${comorbidity.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {comorbidity.label}
                    </Label>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                {comorbidityCol2.map((comorbidity) => (
                  <div key={comorbidity.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`comorbidity-${comorbidity.id}`}
                      checked={patComorbidities.includes(comorbidity.id)}
                      onCheckedChange={(checked) => 
                        handleComorbiditiesCheckboxChange(comorbidity.id, checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={`comorbidity-${comorbidity.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {comorbidity.label}
                    </Label>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                {comorbidityCol3.map((comorbidity) => (
                  <div key={comorbidity.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`comorbidity-${comorbidity.id}`}
                      checked={patComorbidities.includes(comorbidity.id)}
                      onCheckedChange={(checked) => 
                        handleComorbiditiesCheckboxChange(comorbidity.id, checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={`comorbidity-${comorbidity.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {comorbidity.label}
                    </Label>
                  </div>
                ))}

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="comorbidity-others"
                    checked={patComorbidities.includes('others')}
                    onCheckedChange={(checked) => 
                      handleComorbiditiesCheckboxChange('others', checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor="comorbidity-others"
                    className="text-sm font-normal cursor-pointer whitespace-nowrap"
                  >
                    Others, specify:
                  </Label>
                  <Input
                    type="text"
                    placeholder="Please specify"
                    value={othersPatComorbidities}
                    onChange={(e) => setOthersPatComorbidities(e.target.value.toUpperCase())}
                    disabled={!patComorbidities.includes('others')}
                    className="h-9 flex-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t">
            <div className="space-y-1">
              <Label htmlFor="cancer" className="text-sm">Cancer</Label>
              <Select value={yesNo4} onValueChange={setYesNo4}>
                <SelectTrigger id="cancer" className="h-9" showClear={!!yesNo4} onClear={() => setYesNo4("")}>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Y">Yes</SelectItem>
                  <SelectItem value="N">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 space-y-3">
              <Label className="text-sm font-medium">
                If yes, specify the cancer site(s), year of diagnosis, and status for each selected site. <span className="text-muted-foreground italic font-normal">(can be multiple)</span>
              </Label>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-2 text-sm font-medium">Cancer Site</th>
                      <th className="text-center py-2 px-2 text-sm font-medium w-24">Year</th>
                      <th className="text-center py-2 px-2 text-sm font-medium w-40">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cancerCol.map((site, index) => (
                      <tr key={site.id} className="border-b hover:bg-muted/50">
                        <td className="py-2 px-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`cancer-hist-${site.id}`}
                              checked={selectedCancerSites2.includes(site.id)}
                              disabled={yesNo4 !== 'Y'}
                              onCheckedChange={(checked) => 
                                handleCancerSite2CheckboxChange(site.id, checked as boolean)
                              }
                            />
                            <Label 
                              htmlFor={`cancer-hist-${site.id}`}
                              className={`text-sm font-normal cursor-pointer ${yesNo4 !== 'Y' ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              {site.label}
                            </Label>
                          </div>
                        </td>
                        <td className="py-2 px-2">
                          <Input
                            type="text"
                            placeholder="YYYY"
                            value={cancerYears[site.id] || ""}
                            onChange={(e) => handleCancerYearChange(site.id, e.target.value)}
                            disabled={yesNo4 !== 'Y' || !selectedCancerSites2.includes(site.id)}
                            className="h-8 text-sm text-center"
                            maxLength={4}
                          />
                        </td>
                        <td className="py-2 px-2">
                          <Select 
                            value={cancerStatuses[site.id] || ""} 
                            onValueChange={(value) => handleCancerStatusChange(site.id, value)}
                            disabled={yesNo4 !== 'Y' || !selectedCancerSites2.includes(site.id)}
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="remission">Remission</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                      </tr>
                    ))}
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-2 px-2">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="cancer-hist-others"
                            checked={selectedCancerSites2.includes('others')}
                            disabled={yesNo4 !== 'Y'}
                            onCheckedChange={(checked) => 
                              handleCancerSite2CheckboxChange('others', checked as boolean)
                            }
                          />
                          <Label 
                            htmlFor="cancer-hist-others"
                            className={`text-sm font-normal cursor-pointer whitespace-nowrap ${yesNo4 !== 'Y' ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            Others, specify:
                          </Label>
                          <Input
                            type="text"
                            placeholder="Please specify"
                            value={othersCancerSite2}
                            onChange={(e) => setOthersCancerSite2(e.target.value.toUpperCase())}
                            disabled={yesNo4 !== 'Y' || !selectedCancerSites2.includes('others')}
                            className="h-8 flex-1 text-sm"
                          />
                        </div>
                      </td>
                      <td className="py-2 px-2">
                        <Input
                          type="text"
                          placeholder="YYYY"
                          value={cancerYears['others'] || ""}
                          onChange={(e) => handleCancerYearChange('others', e.target.value)}
                          disabled={yesNo4 !== 'Y' || !selectedCancerSites2.includes('others')}
                          className="h-8 text-sm text-center"
                          maxLength={4}
                        />
                      </td>
                      <td className="py-2 px-2">
                        <Select 
                          value={cancerStatuses['others'] || ""} 
                          onValueChange={(value) => handleCancerStatusChange('others', value)}
                          disabled={yesNo4 !== 'Y' || !selectedCancerSites2.includes('others')}
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="remission">Remission</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
        </div>

        <div className="pt-2 border-t">
          <div className="space-y-1">
            <Label htmlFor="other-medical-history" className="text-sm">Other Significant Medical History</Label>
            <Input
              id="other-medical-history"
              type="text"
              placeholder="Enter other significant medical history"
              value={otherMedicalHistory}
              onChange={(e) => setOtherMedicalHistory(e.target.value.toUpperCase())}
              className="h-9"
            />
          </div>
        </div>

        <div className="pt-2 border-t">
          <h3 className="text-base font-semibold mt-2 mb-3">Sexual History</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
            <div className="space-y-1">
              <Label htmlFor="sexual-orientation" className="text-sm">Sexual Orientation</Label>
              <Select value={sexOrient} onValueChange={setSexOrient}>
                <SelectTrigger id="sexual-orientation" className="h-9" showClear={!!sexOrient} onClear={() => setSexOrient("")}>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HETERO">Heterosexual</SelectItem>
                  <SelectItem value="HOMO">Homosexual</SelectItem>
                  <SelectItem value="BI">Bisexual</SelectItem>
                  <SelectItem value="AS">Asexual</SelectItem>
                  <SelectItem value="PAN">Pansexual</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="others-sex-orient" className="text-sm">Others, specify:</Label>
              <Input
                id="others-sex-orient"
                type="text"
                placeholder="Please specify"
                value={othersSexOrient}
                onChange={(e) => setOthersSexOrient(e.target.value.toUpperCase())}
                disabled={sexOrient !== 'others'}
                className="h-9"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 mt-3">
            <div className="space-y-1">
              <Label htmlFor="num-sex-partners" className="text-sm">Number of Sexual Partner/s</Label>
              <Input
                id="num-sex-partners"
                type="number"
                placeholder="Enter number"
                value={numSexPartners}
                onChange={(e) => setNumSexPartners(e.target.value)}
                className="h-9"
                min="0"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="age-first-sex" className="text-sm">Age of First Sexual Intercourse</Label>
              <Input
                id="age-first-sex"
                type="number"
                placeholder="Enter age"
                value={ageFirstSexIntercourse}
                onChange={(e) => setAgeFirstSexIntercourse(e.target.value)}
                className="h-9"
                min="0"
              />
            </div>
          </div>

          <div className="pt-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
              <div className="space-y-1">
                <Label htmlFor="use-contraceptives" className="text-sm">Use of Contraceptives</Label>
                <Select value={useContraceptives} onValueChange={setUseContraceptives}>
                  <SelectTrigger id="use-contraceptives" className="h-9" showClear={!!useContraceptives} onClear={() => setUseContraceptives("")}>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Y">Yes</SelectItem>
                    <SelectItem value="N">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  If yes, specify: <span className="text-muted-foreground italic font-normal">(can be multiple)</span>
                </Label>

                <div className="space-y-2">
                  {contraceptiveMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`contraceptive-${method.id}`}
                        checked={selectedContraceptives.includes(method.id)}
                        disabled={useContraceptives !== 'Y'}
                        onCheckedChange={(checked) => 
                          handleContraceptivesCheckboxChange(method.id, checked as boolean)
                        }
                      />
                      <Label 
                        htmlFor={`contraceptive-${method.id}`}
                        className={`text-sm font-normal cursor-pointer ${useContraceptives !== 'Y' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {method.label}
                      </Label>
                    </div>
                  ))}

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="contraceptive-others"
                      checked={selectedContraceptives.includes('others')}
                      disabled={useContraceptives !== 'Y'}
                      onCheckedChange={(checked) => 
                        handleContraceptivesCheckboxChange('others', checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor="contraceptive-others"
                      className={`text-sm font-normal cursor-pointer whitespace-nowrap ${useContraceptives !== 'Y' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      Others, specify:
                    </Label>
                    <Input
                      type="text"
                      placeholder="Please specify"
                      value={othersContraceptives}
                      onChange={(e) => setOthersContraceptives(e.target.value.toUpperCase())}
                      disabled={useContraceptives !== 'Y' || !selectedContraceptives.includes('others')}
                      className="h-9 flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t">
          <h3 className="text-base font-semibold mt-2 mb-3">Cancer Screening and Vaccination History of Patient</h3>

          <div className="space-y-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Types of Cancer Screening Received
              </Label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                <div className="space-y-2">
                  {cancerScreeningCol1.map((screening) => (
                    <div key={screening.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`screening-${screening.id}`}
                        checked={selectedCancerScreening.includes(screening.id)}
                        onCheckedChange={(checked) => 
                          handleCancerScreeningCheckboxChange(screening.id, checked as boolean)
                        }
                      />
                      <Label 
                        htmlFor={`screening-${screening.id}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {screening.label}
                      </Label>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  {cancerScreeningCol2.map((screening) => (
                    <div key={screening.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`screening-${screening.id}`}
                        checked={selectedCancerScreening.includes(screening.id)}
                        onCheckedChange={(checked) => 
                          handleCancerScreeningCheckboxChange(screening.id, checked as boolean)
                        }
                      />
                      <Label 
                        htmlFor={`screening-${screening.id}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {screening.label}
                      </Label>
                    </div>
                  ))}

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="screening-others"
                      checked={selectedCancerScreening.includes('others')}
                      onCheckedChange={(checked) => 
                        handleCancerScreeningCheckboxChange('others', checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor="screening-others"
                      className="text-sm font-normal cursor-pointer whitespace-nowrap"
                    >
                      Others, specify:
                    </Label>
                    <Input
                      type="text"
                      placeholder="Please specify"
                      value={othersCancerScreening}
                      onChange={(e) => setOthersCancerScreening(e.target.value.toUpperCase())}
                      disabled={!selectedCancerScreening.includes('others')}
                      className="h-9 flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 space-y-3">
              <Label className="text-sm font-medium">Types of Vaccines Received</Label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                <div className="space-y-1">
                  <Label htmlFor="hpv-vaccine" className="text-sm">Human Papillomavirus Vaccine (HPV)</Label>
                  <Select value={hpvVaccine} onValueChange={setHpvVaccine}>
                    <SelectTrigger id="hpv-vaccine" className="h-9" showClear={!!hpvVaccine} onClear={() => setHpvVaccine("")}>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fully">Yes, fully vaccinated</SelectItem>
                      <SelectItem value="partial">Yes, partially vaccinated</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="hepb-vaccine" className="text-sm">Hepatitis B Vaccine</Label>
                  <Select value={hepBVaccine} onValueChange={setHepBVaccine}>
                    <SelectTrigger id="hepb-vaccine" className="h-9" showClear={!!hepBVaccine} onClear={() => setHepBVaccine("")}>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fully">Yes, fully vaccinated</SelectItem>
                      <SelectItem value="partial">Yes, partially vaccinated</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="other-vaccines" className="text-sm">Other vaccines, specify</Label>
                <Input
                  id="other-vaccines"
                  type="text"
                  placeholder="Enter other vaccines received"
                  value={otherVaccines}
                  onChange={(e) => setOtherVaccines(e.target.value.toUpperCase())}
                  className="h-9"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={handleSave} className="h-9">
            <Save className="mr-2 h-4 w-4" />
            Save Record
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}