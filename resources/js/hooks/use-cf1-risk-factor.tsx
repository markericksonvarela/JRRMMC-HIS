import { useState, useEffect } from 'react'

export interface CF1RiskFactorState {
  tobaccoUse: string
  yesNo: string
  yesNo2: string
  yesNo3: string
  yesNo4: string
  yesNo5: string
  yesNo6: string
  secondHandSmoke: string
  alcoholUse: string
  physicalAct: string
  hdFatMeat: string
  hdVegetable: string
  hdSodium: string
  hdSugar: string
  selectedOccExp: string[]
  othersOccExp: string
  famHistCancer: string
  selectedCancerSites: string[]
  othersCancerSite: string
  patInfection: string[]
  othersPatInfection: string
  patComorbidities: string[]
  othersPatComorbidities: string
  selectedCancerSites2: string[]
  othersCancerSite2: string
  cancerYears: Record<string, string>
  cancerStatuses: Record<string, string>
  otherMedicalHistory: string
  sexOrient: string
  othersSexOrient: string
  numSexPartners: string
  ageFirstSexIntercourse: string
  useContraceptives: string
  selectedContraceptives: string[]
  othersContraceptives: string
  selectedCancerScreening: string[]
  othersCancerScreening: string
  hpvVaccine: string
  hepBVaccine: string
  otherVaccines: string
  patCancer: string[]
  othersPatCancer: string
  pCancerSite: string[]
  primaryCancerSiteNumber: string
  icd10: string
  histoDiag: string
  tTumor: string
  nNode: string
  mMetastasis: string
  sStage: string
  otherStagingUsedRemarks: string
  surgery: string
  selectedSurgery: string[]
  antiCancerDrug: string
  purposeDrug: string
  selectedDrugType: string[]
  othersAntiCancerDrug: string
  firstLine: string
  firstNofCycles: string
  firstDrugReg: string
  firstGoal: string
  firstTimeAdmin: string
  secondLine: string
  secondNofCycles: string
  secondDrugReg: string
  secondGoal: string
  secondTimeAdmin: string
  thirdLine: string
  thirdNofCycles: string
  thirdDrugReg: string
  thirdGoal: string
  thirdTimeAdmin: string
  otherLine: string
  otherIndicate: string
  otherNofCycles: string
  otherDrugReg: string
  otherGoal: string
  otherTimeAdmin: string
  radiotherapy: string
  selectedRadiotherapyType: string[]
  speciSequence: string
  speciGoal: string
  theranostics: string
  theranosticsType: string[]
  theranosticsGoal: string
  otherCancerTherapies: string
  otherCancerTherapiesPlan: string[]
  otherCancerTherapiesSpecify: string
  outdoorAirPollutionExposure: string
  fatMeat: string
  vegetables: string
  sodiumsalt: string
  sugar: string
}

export const useCF1RiskFactor = () => {
  const [state, setState] = useState<CF1RiskFactorState>({
    tobaccoUse: "",
    yesNo: "",
    yesNo2: "",
    yesNo3: "",
    yesNo4: "",
    yesNo5: "",
    yesNo6: "",
    alcoholUse: "",
    secondHandSmoke: "",
    physicalAct: "",
    hdFatMeat: "",
    hdVegetable: "",
    hdSodium: "",
    hdSugar: "",
    selectedOccExp: [],
    othersOccExp: "",
    famHistCancer: "",
    selectedCancerSites: [],
    othersCancerSite: "",
    patInfection: [],
    othersPatInfection: "",
    patComorbidities: [],
    othersPatComorbidities: "",
    selectedCancerSites2: [],
    othersCancerSite2: "",
    cancerYears: {},
    cancerStatuses: {},
    otherMedicalHistory: "",
    sexOrient: "",
    othersSexOrient: "",
    numSexPartners: "",
    ageFirstSexIntercourse: "",
    useContraceptives: "",
    selectedContraceptives: [],
    othersContraceptives: "",
    selectedCancerScreening: [],
    othersCancerScreening: "",
    hpvVaccine: "",
    hepBVaccine: "",
    otherVaccines: "",
    patCancer: [],
    othersPatCancer: "",
    primaryCancerSiteNumber: "",
    pCancerSite: [],
    icd10: "",
    histoDiag: "",
    tTumor: "",
    nNode: "",
    mMetastasis: "",
    sStage: "",
    otherStagingUsedRemarks: "",
    surgery: "",
    selectedSurgery: [],
    antiCancerDrug: "",
    purposeDrug: "",
    selectedDrugType: [],
    othersAntiCancerDrug: "",
    firstLine: "",
    firstNofCycles: "",
    firstDrugReg: "",
    firstGoal: "",
    secondLine: "",
    secondNofCycles: "",
    secondDrugReg: "",
    secondGoal: "",
    thirdLine: "",
    thirdNofCycles: "",
    thirdDrugReg: "",
    thirdGoal: "",
    firstTimeAdmin: "",
    secondTimeAdmin: "",
    thirdTimeAdmin: "",
    otherLine: "",
    otherIndicate: "",
    otherNofCycles: "",
    otherDrugReg: "",
    otherGoal: "",
    otherTimeAdmin: "",
    radiotherapy: "",
    selectedRadiotherapyType: [],
    speciSequence: "",
    speciGoal: "",
    theranostics: "",
    theranosticsType: [],
    theranosticsGoal: "",
    otherCancerTherapies: "",
    otherCancerTherapiesPlan: [],
    otherCancerTherapiesSpecify: "",
    outdoorAirPollutionExposure: "",
    fatMeat: "",
    vegetables: "",
    sodiumsalt: "",
    sugar: "",
  })

  // Clear checkboxes when not "Yes"
  useEffect(() => {
    if (state.yesNo2 !== 'Y') {
      setState(prev => ({ ...prev, selectedOccExp: [], othersOccExp: "" }))
    }
  }, [state.yesNo2])

  useEffect(() => {
    if (state.famHistCancer !== 'Y') {
      setState(prev => ({ ...prev, selectedCancerSites: [], othersCancerSite: "" }))
    }
  }, [state.famHistCancer])

  useEffect(() => {
    if (state.yesNo4 !== 'Y') {
      setState(prev => ({ 
        ...prev, 
        selectedCancerSites2: [], 
        othersCancerSite2: "",
        cancerYears: {},
        cancerStatuses: {}
      }))
    }
  }, [state.yesNo4])

  useEffect(() => {
    if (state.sexOrient !== 'others') {
      setState(prev => ({ ...prev, othersSexOrient: "" }))
    }
  }, [state.sexOrient])

  useEffect(() => {
    if (state.useContraceptives !== 'Y') {
      setState(prev => ({ ...prev, selectedContraceptives: [], othersContraceptives: "" }))
    }
  }, [state.useContraceptives])

  useEffect(() => {
    if (state.yesNo5 !== 'Y') {
      updateState('primaryCancerSiteNumber', '')
    } else if (!state.primaryCancerSiteNumber) {
      updateState('primaryCancerSiteNumber', '1')
    }
  }, [state.yesNo5, state.primaryCancerSiteNumber])

  useEffect(() => {
    if (state.surgery !== 'Y') {
      setState(prev => ({ ...prev, selectedSurgery: [] }))
    }
  }, [state.surgery])

  useEffect(() => {
    if (state.antiCancerDrug !== 'Y') {
      setState(prev => ({ ...prev, selectedDrugType: [], othersAntiCancerDrug: "", purposeDrug: "" }))
    }
  }, [state.antiCancerDrug])

  useEffect(() => {
    if (state.radiotherapy !== 'Y') {
      setState(prev => ({ ...prev, selectedRadiotherapyType: [], speciSequence: "", speciGoal: "" }))
    }
  }, [state.radiotherapy])

  useEffect(() => {
    if (state.theranostics !== 'Y') {
      setState(prev => ({ ...prev, theranosticsType: [], theranosticsGoal: "" }))
    }
  }, [state.theranostics])

  useEffect(() => {
    if (state.otherCancerTherapies !== 'Y') {
      setState(prev => ({ ...prev, otherCancerTherapiesPlan: [], otherCancerTherapiesSpecify: "" }))
    }
  }, [state.otherCancerTherapies])

  useEffect(() => {
    if (state.firstLine !== 'Y') {
      setState(prev => ({ ...prev, firstLine: "", firstNofCycles: "", firstDrugReg: "", firstGoal: "", firstTimeAdmin: "" }))
    }
  }, [state.firstLine])

  useEffect(() => {
    if (state.secondLine !== 'Y') {
      setState(prev => ({ ...prev, secondLine: "", secondNofCycles: "", secondDrugReg: "", secondGoal: "", secondTimeAdmin: "" }))
    }
  }, [state.secondLine])

  useEffect(() => {
    if (state.thirdLine !== 'Y') {
      setState(prev => ({ ...prev, thirdLine: "", thirdNofCycles: "", thirdDrugReg: "", thirdGoal: "", thirdTimeAdmin: "" }))
    }
  }, [state.thirdLine])

  useEffect(() => {
    if (state.otherLine !== 'Y') {
      setState(prev => ({ ...prev, otherLine: "", otherNofCycles: "", otherDrugReg: "", otherGoal: "", otherTimeAdmin: "" }))
    }
  }, [state.otherLine])

  useEffect(() => {
    if (state.otherLine !== 'Y') {
      updateState('otherIndicate', '')
    } else if (!state.otherIndicate) {
      updateState('otherIndicate', '1')
    }
  }, [state.otherLine, state.otherIndicate])

  // Update handlers
  const updateState = <K extends keyof CF1RiskFactorState>(
    key: K, 
    value: CF1RiskFactorState[K]
  ) => {
    setState(prev => ({ ...prev, [key]: value }))
  }

  // Checkbox handlers
  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (state.yesNo2 !== 'Y') return
    
    if (checked) {
      setState(prev => ({ ...prev, selectedOccExp: [...prev.selectedOccExp, value] }))
    } else {
      setState(prev => ({ 
        ...prev, 
        selectedOccExp: prev.selectedOccExp.filter(item => item !== value),
        ...(value === 'others' && { othersOccExp: "" })
      }))
    }
  }

  const handleCancerSiteCheckboxChange = (value: string, checked: boolean) => {
    if (state.famHistCancer !== 'Y') return
    
    if (checked) {
      setState(prev => ({ ...prev, selectedCancerSites: [...prev.selectedCancerSites, value] }))
    } else {
      setState(prev => ({ 
        ...prev, 
        selectedCancerSites: prev.selectedCancerSites.filter(item => item !== value),
        ...(value === 'others' && { othersCancerSite: "" })
      }))
    }
  }

  const handleInfectionCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      setState(prev => ({ ...prev, patInfection: [...prev.patInfection, value] }))
    } else {
      setState(prev => ({ 
        ...prev, 
        patInfection: prev.patInfection.filter(item => item !== value),
        ...(value === 'others' && { othersPatInfection: "" })
      }))
    }
  }

  const handleComorbiditiesCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      setState(prev => ({ ...prev, patComorbidities: [...prev.patComorbidities, value] }))
    } else {
      setState(prev => ({ 
        ...prev, 
        patComorbidities: prev.patComorbidities.filter(item => item !== value),
        ...(value === 'others' && { othersPatComorbidities: "" })
      }))
    }
  }

  const handleCancerSite2CheckboxChange = (value: string, checked: boolean) => {
    if (state.yesNo4 !== 'Y') return
    
    if (checked) {
      setState(prev => ({ ...prev, selectedCancerSites2: [...prev.selectedCancerSites2, value] }))
    } else {
      setState(prev => {
        const newYears = { ...prev.cancerYears }
        const newStatuses = { ...prev.cancerStatuses }
        delete newYears[value]
        delete newStatuses[value]
        
        return {
          ...prev,
          selectedCancerSites2: prev.selectedCancerSites2.filter(item => item !== value),
          cancerYears: newYears,
          cancerStatuses: newStatuses,
          ...(value === 'others' && { othersCancerSite2: "" })
        }
      })
    }
  }

  const handleCancerYearChange = (siteId: string, year: string) => {
    setState(prev => ({ 
      ...prev, 
      cancerYears: { ...prev.cancerYears, [siteId]: year } 
    }))
  }

  const handleCancerStatusChange = (siteId: string, status: string) => {
    setState(prev => ({ 
      ...prev, 
      cancerStatuses: { ...prev.cancerStatuses, [siteId]: status } 
    }))
  }

  const handleContraceptivesCheckboxChange = (value: string, checked: boolean) => {
    if (state.useContraceptives !== 'Y') return
    
    if (checked) {
      setState(prev => ({ ...prev, selectedContraceptives: [...prev.selectedContraceptives, value] }))
    } else {
      setState(prev => ({ 
        ...prev, 
        selectedContraceptives: prev.selectedContraceptives.filter(item => item !== value),
        ...(value === 'others' && { othersContraceptives: "" })
      }))
    }
  }

  const handleCancerScreeningCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      setState(prev => ({ ...prev, selectedCancerScreening: [...prev.selectedCancerScreening, value] }))
    } else {
      setState(prev => ({ 
        ...prev, 
        selectedCancerScreening: prev.selectedCancerScreening.filter(item => item !== value),
        ...(value === 'others' && { othersCancerScreening: "" })
      }))
    }
  }

  const handleCancerCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      setState(prev => ({ ...prev, patCancer: [...prev.patCancer, value] }))
    } else {
      setState(prev => ({ 
        ...prev, 
        patCancer: prev.patCancer.filter(item => item !== value),
        ...(value === 'others' && { othersPatCancer: "" })
      }))
    }
  }

  const handleLateralityCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      setState(prev => ({ ...prev, patCancer: [...prev.patCancer, value] }))
    } else {
      setState(prev => ({ 
        ...prev, 
        patCancer: prev.patCancer.filter(item => item !== value),
        ...(value === 'others' && { othersPatCancer: "" })
      }))
    }
  }

  const handleGroupClinicalStageCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      setState(prev => ({ ...prev, patCancer: [...prev.patCancer, value] }))
    } else {
      setState(prev => ({ 
        ...prev, 
        patCancer: prev.patCancer.filter(item => item !== value),
        ...(value === 'others' && { othersPatCancer: "" })
      }))
    }
  }

  const handleOtherStagingUsedCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      setState(prev => ({ ...prev, patCancer: [...prev.patCancer, value] }))
    } else {
      setState(prev => ({ 
        ...prev, 
        patCancer: prev.patCancer.filter(item => item !== value),
        ...(value === 'others' && { othersPatCancer: "" })
      }))
    }
  }

  const handleCurrStatusCancerCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      setState(prev => ({ ...prev, patCancer: [...prev.patCancer, value] }))
    } else {
      setState(prev => ({ 
        ...prev, 
        patCancer: prev.patCancer.filter(item => item !== value),
        ...(value === 'others' && { othersPatCancer: "" })
      }))
    }
  }

  const handleSurgeryCheckboxChange = (value: string, checked: boolean) => {
    if (state.surgery !== 'Y') return
    
    if (checked) {
      setState(prev => ({ ...prev, selectedSurgery: [...prev.selectedSurgery, value] }))
    } else {
      setState(prev => ({ 
        ...prev, 
        selectedSurgery: prev.selectedSurgery.filter(item => item !== value)
      }))
    }
  }

  const handleDrugTypeCheckboxChange = (value: string, checked: boolean) => {
    if (state.antiCancerDrug !== 'Y') return
    
    if (checked) {
      setState(prev => ({ ...prev, selectedDrugType: [...prev.selectedDrugType, value] }))
    } else {
      setState(prev => ({ 
        ...prev, 
        selectedDrugType: prev.selectedDrugType.filter(item => item !== value),
        ...(value === 'others' && { othersAntiCancerDrug: "" })
      }))
    }
  }

  const handleRadiotherapyTypeCheckboxChange = (value: string, checked: boolean) => {
    if (state.radiotherapy !== 'Y') return
    
    if (checked) {
      setState(prev => ({ ...prev, selectedRadiotherapyType: [...prev.selectedRadiotherapyType, value] }))
    } else {
      setState(prev => ({ 
        ...prev, 
        selectedRadiotherapyType: prev.selectedRadiotherapyType.filter(item => item !== value)
      }))
    }
  }

  const handleTheranosticsCheckboxChange = (value: string, checked: boolean) => {
    if (state.theranostics !== 'Y') return
    
    if (checked) {
      setState(prev => ({ ...prev, theranosticsType: [...prev.theranosticsType, value] }))
    } else {
      setState(prev => ({ 
        ...prev, 
        theranosticsType: prev.theranosticsType.filter(item => item !== value)
      }))
    }
  }

  const handleOtherCancerTherapiesCheckboxChange = (value: string, checked: boolean) => {
    if (state.otherCancerTherapies !== 'Y') return
    
    if (checked) {
      setState(prev => ({ ...prev, otherCancerTherapiesPlan: [...prev.otherCancerTherapiesPlan, value] }))
    } else {
      setState(prev => ({ 
        ...prev, 
        otherCancerTherapiesPlan: prev.otherCancerTherapiesPlan.filter(item => item !== value),
        ...(value === 'others' && { otherCancerTherapiesSpecify: "" })
      }))
    }
  }

  const handleSave = () => {
    console.log('Saving record...', state)
  }

  return {
    state,
    updateState,
    handlers: {
      handleCheckboxChange,
      handleCancerSiteCheckboxChange,
      handleInfectionCheckboxChange,
      handleComorbiditiesCheckboxChange,
      handleCancerSite2CheckboxChange,
      handleCancerYearChange,
      handleCancerStatusChange,
      handleContraceptivesCheckboxChange,
      handleCancerScreeningCheckboxChange,
      handleCancerCheckboxChange,
      handleLateralityCheckboxChange,
      handleGroupClinicalStageCheckboxChange,
      handleOtherStagingUsedCheckboxChange,
      handleCurrStatusCancerCheckboxChange,
      handleSurgeryCheckboxChange,
      handleDrugTypeCheckboxChange,
      handleRadiotherapyTypeCheckboxChange,
      handleTheranosticsCheckboxChange,
      handleOtherCancerTherapiesCheckboxChange,
      handleSave,
    }
  }
}