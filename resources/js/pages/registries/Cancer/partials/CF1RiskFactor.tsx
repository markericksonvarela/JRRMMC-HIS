import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Save, Calendar as CalendarIcon, ChevronDownIcon } from 'lucide-react'
import { useCF1RiskFactor } from '@/hooks/use-cf1-risk-factor'
import * as constants from '@/constants/use-cancer-constant'
import React from 'react'

export default function CF1RiskFactor() {
  const { state, updateState, handlers } = useCF1RiskFactor()
  const [date, setDate] = React.useState<Date>()

  return (
    <Card className="w-full h-fit">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-semibold">Risk Factor Profile of Patient</CardTitle>
          <Button onClick={handlers.handleSave} className="h-9">
            <Save className="mr-2 h-4 w-4" />
            Save Record
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
          <div className="space-y-1">
            <Label htmlFor="tobaccoUse" className="text-sm">Tobacco Use</Label>
            <Select value={state.tobaccoUse} onValueChange={(val) => updateState('tobaccoUse', val)}>
              <SelectTrigger id="tobaccoUse" className="h-9" showClear={!!state.tobaccoUse} onClear={() => updateState('tobaccoUse', "")}>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CURR">Current Smoker</SelectItem>
                <SelectItem value="PREV">Previous Smoker</SelectItem>
                <SelectItem value="NONE">Non-Smoker</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="secondHandSmoke" className="text-sm">Second-Hand Smoke Exposure</Label>
            <Select value={state.secondHandSmoke} onValueChange={(val) => updateState('secondHandSmoke', val)}>
              <SelectTrigger id="secondHandSmoke" className="h-9" showClear={!!state.secondHandSmoke} onClear={() => updateState('secondHandSmoke', "")}>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Y">Yes</SelectItem>
                <SelectItem value="N">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="alcoholUse" className="text-sm">Harmful Use of Alcohol</Label>
            <Select value={state.alcoholUse} onValueChange={(val) => updateState('alcoholUse', val)}>
              <SelectTrigger id="alcoholUse" className="h-9" showClear={!!state.alcoholUse} onClear={() => updateState('alcoholUse', "")}>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CURR">With current harmful use of alcohol</SelectItem>
                <SelectItem value="PREV">With previous harmful use of alcohol</SelectItem>
                <SelectItem value="NONE">No history of harmful use of alcohol</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="physicalActivity" className="text-sm">Physical Activity</Label>
            <Select value={state.physicalAct} onValueChange={(val) => updateState('physicalAct', val)}>
              <SelectTrigger id="physicalActivity" className="h-9" showClear={!!state.physicalAct} onClear={() => updateState('physicalAct', "")}>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USUACT">Usually Active</SelectItem>
                <SelectItem value="MODACT">Moderately Active</SelectItem>
                <SelectItem value="VERYACT">Very Active</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="pt-2 border-t space-y-3">
          <h3 className="text-sm font-semibold">Healthy Diet</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
            <div className="space-y-1">
              <Label htmlFor="fatMeat" className="text-sm">Fat Meat</Label>
              <Select value={state.hdFatMeat} onValueChange={(val) => updateState('hdFatMeat', val)}>
                <SelectTrigger id="fatMeat" className="h-9" showClear={!!state.hdFatMeat} onClear={() => updateState('hdFatMeat', "")}>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="MOD">Moderate</SelectItem>
                  <SelectItem value="LOW">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="vegetables" className="text-sm">Vegetables</Label>
              <Select value={state.hdVegetable} onValueChange={(val) => updateState('hdVegetable', val)}>
                <SelectTrigger id="vegetables" className="h-9" showClear={!!state.hdVegetable} onClear={() => updateState('hdVegetable', "")}>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="MOD">Moderate</SelectItem>
                  <SelectItem value="LOW">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="sodiumSalt" className="text-sm">Sodium/Salt</Label>
              <Select value={state.hdSodium} onValueChange={(val) => updateState('hdSodium', val)}>
                <SelectTrigger id="sodiumSalt" className="h-9" showClear={!!state.hdSodium} onClear={() => updateState('hdSodium', "")}>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="MOD">Moderate</SelectItem>
                  <SelectItem value="LOW">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="sugar" className="text-sm">Sugar</Label>
              <Select value={state.hdSugar} onValueChange={(val) => updateState('hdSugar', val)}>
                <SelectTrigger id="sugar" className="h-9" showClear={!!state.hdSugar} onClear={() => updateState('hdSugar', "")}>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="MOD">Moderate</SelectItem>
                  <SelectItem value="LOW">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Occupational Exposure Section */}
        <div className="pt-2 border-t">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
            <div className="space-y-1">
              <Label htmlFor="occupational-exposure" className="text-sm">Occupational Exposure</Label>
              <Select value={state.yesNo2} onValueChange={(val) => updateState('yesNo2', val)}>
                <SelectTrigger id="occupational-exposure" className="h-9">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Y">Yes</SelectItem>
                  <SelectItem value="N">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">If yes, specify:</Label>

              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                <div className="space-y-2">
                  {constants.exposuresCol1.map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`exp-${item.id}`}
                        checked={state.selectedOccExp.includes(item.id)}
                        onCheckedChange={(checked) => 
                          handlers.handleCheckboxChange(item.id, checked as boolean)
                        }
                        disabled={state.yesNo2 !== 'Y'}
                      />
                      <Label
                        htmlFor={`exp-${item.id}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  {constants.exposuresCol2.map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`exp-${item.id}`}
                        checked={state.selectedOccExp.includes(item.id)}
                        onCheckedChange={(checked) => 
                          handlers.handleCheckboxChange(item.id, checked as boolean)
                        }
                        disabled={state.yesNo2 !== 'Y'}
                      />
                      <Label
                        htmlFor={`exp-${item.id}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {item.label}
                      </Label>
                    </div>
                  ))}
                  
                  {/* Others checkbox with input */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="exp-others"
                      checked={state.selectedOccExp.includes('others')}
                      onCheckedChange={(checked) => 
                        handlers.handleCheckboxChange('others', checked as boolean)
                      }
                      disabled={state.yesNo2 !== 'Y'}
                    />
                    <Label htmlFor="exp-others" className="text-sm font-normal cursor-pointer">
                      Others
                    </Label>
                  </div>
                  <Input
                    placeholder="Please specify"
                    value={state.othersOccExp}
                    onChange={(e) => updateState('othersOccExp', e.target.value.toUpperCase())}
                    disabled={!state.selectedOccExp.includes('others')}
                    className="h-9 mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t">
          <div className="space-y-1">
            <Label htmlFor="outdoorair" className="text-sm">Outdoor Air Pollution Exposure</Label>
            <Select value={state.yesNo6} onValueChange={(val) => updateState('yesNo6', val)}>
              <SelectTrigger id="outdoorair" className="h-9" showClear={!!state.yesNo6} onClear={() => updateState('yesNo6', "")}>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Y">Yes</SelectItem>
                <SelectItem value="N">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Family History Cancer Sites Section */}
        <div className="pt-2 border-t">
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="fam-hist-cancer" className="text-sm">Family History of Cancer</Label>
              <Select value={state.famHistCancer} onValueChange={(val) => updateState('famHistCancer', val)}>
                <SelectTrigger id="fam-hist-cancer" className="h-9">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Y">Yes</SelectItem>
                  <SelectItem value="N">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">If yes, what cancer site/s?</Label>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-2">
                <div className="space-y-2">
                  {constants.cancerSitesCol1.map((site) => (
                    <div key={site.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`cancer-${site.id}`}
                        checked={state.selectedCancerSites.includes(site.id)}
                        onCheckedChange={(checked) => 
                          handlers.handleCancerSiteCheckboxChange(site.id, checked as boolean)
                        }
                        disabled={state.famHistCancer !== 'Y'}
                      />
                      <Label
                        htmlFor={`cancer-${site.id}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {site.label}
                      </Label>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  {constants.cancerSitesCol2.map((site) => (
                    <div key={site.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`cancer-${site.id}`}
                        checked={state.selectedCancerSites.includes(site.id)}
                        onCheckedChange={(checked) => 
                          handlers.handleCancerSiteCheckboxChange(site.id, checked as boolean)
                        }
                        disabled={state.famHistCancer !== 'Y'}
                      />
                      <Label
                        htmlFor={`cancer-${site.id}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {site.label}
                      </Label>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  {constants.cancerSitesCol3.map((site) => (
                    <div key={site.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`cancer-${site.id}`}
                        checked={state.selectedCancerSites.includes(site.id)}
                        onCheckedChange={(checked) => 
                          handlers.handleCancerSiteCheckboxChange(site.id, checked as boolean)
                        }
                        disabled={state.famHistCancer !== 'Y'}
                      />
                      <Label
                        htmlFor={`cancer-${site.id}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {site.label}
                      </Label>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  {constants.cancerSitesCol4.map((site) => (
                    <div key={site.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`cancer-${site.id}`}
                        checked={state.selectedCancerSites.includes(site.id)}
                        onCheckedChange={(checked) => 
                          handlers.handleCancerSiteCheckboxChange(site.id, checked as boolean)
                        }
                        disabled={state.famHistCancer !== 'Y'}
                      />
                      <Label
                        htmlFor={`cancer-${site.id}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {site.label}
                      </Label>
                    </div>
                  ))}
                  
                  {/* Others */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="cancer-others"
                      checked={state.selectedCancerSites.includes('others')}
                      onCheckedChange={(checked) => 
                        handlers.handleCancerSiteCheckboxChange('others', checked as boolean)
                      }
                      disabled={state.famHistCancer !== 'Y'}
                    />
                    <Label htmlFor="cancer-others" className="text-sm font-normal cursor-pointer">
                      Others
                    </Label>
                  </div>
                  <Input
                    placeholder="Please specify"
                    value={state.othersCancerSite}
                    onChange={(e) => updateState('othersCancerSite', e.target.value.toUpperCase())}
                    disabled={!state.selectedCancerSites.includes('others')}
                    className="h-9 mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Medical History - Infections */}
        <div className="pt-2 border-t">
          <h3 className="text-base font-semibold mt-2 mb-3">Medical History</h3>

          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Has the patient ever been diagnosed or tested positive for any of the following infections?
            </Label>

            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              <div className="space-y-2">
                {constants.infectionsCol1.map((infection) => (
                  <div key={infection.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`infection-${infection.id}`}
                      checked={state.patInfection.includes(infection.id)}
                      onCheckedChange={(checked) => 
                        handlers.handleInfectionCheckboxChange(infection.id, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`infection-${infection.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {infection.label}
                    </Label>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                {constants.infectionsCol2.map((infection) => (
                  <div key={infection.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`infection-${infection.id}`}
                      checked={state.patInfection.includes(infection.id)}
                      onCheckedChange={(checked) => 
                        handlers.handleInfectionCheckboxChange(infection.id, checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={`infection-${infection.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {infection.label}
                    </Label>
                  </div>
                ))}

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="infection-others"
                    checked={state.patInfection.includes('others')}
                    onCheckedChange={(checked) => 
                      handlers.handleInfectionCheckboxChange('others', checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor="infection-others"
                    className="text-sm font-normal cursor-pointer whitespace-nowrap"
                  >
                    Others, specify:
                  </Label>
                  <Input
                    type="text"
                    placeholder="Please specify"
                    value={state.othersPatInfection}
                    onChange={(e) => updateState('othersPatInfection', e.target.value.toUpperCase())}
                    disabled={!state.patInfection.includes('others')}
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
                {constants.comorbidityCol1.map((comorbidity) => (
                  <div key={comorbidity.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`comorbidity-${comorbidity.id}`}
                      checked={state.patComorbidities.includes(comorbidity.id)}
                      onCheckedChange={(checked) => 
                        handlers.handleComorbiditiesCheckboxChange(comorbidity.id, checked as boolean)
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
                {constants.comorbidityCol2.map((comorbidity) => (
                  <div key={comorbidity.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`comorbidity-${comorbidity.id}`}
                      checked={state.patComorbidities.includes(comorbidity.id)}
                      onCheckedChange={(checked) => 
                        handlers.handleComorbiditiesCheckboxChange(comorbidity.id, checked as boolean)
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
                {constants.comorbidityCol3.map((comorbidity) => (
                  <div key={comorbidity.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`comorbidity-${comorbidity.id}`}
                      checked={state.patComorbidities.includes(comorbidity.id)}
                      onCheckedChange={(checked) => 
                        handlers.handleComorbiditiesCheckboxChange(comorbidity.id, checked as boolean)
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
                    checked={state.patComorbidities.includes('others')}
                    onCheckedChange={(checked) => 
                      handlers.handleComorbiditiesCheckboxChange('others', checked as boolean)
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
                    value={state.othersPatComorbidities}
                    onChange={(e) => updateState('othersPatComorbidities', e.target.value.toUpperCase())}
                    disabled={!state.patComorbidities.includes('others')}
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
            <Select value={state.yesNo4} onValueChange={(val) => updateState('yesNo4', val)}>
              <SelectTrigger id="cancer" className="h-9" showClear={!!state.yesNo4} onClear={() => updateState('yesNo4', "")}>
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
                  {constants.cancerCol.map((site) => (
                    <tr key={site.id} className="border-b hover:bg-muted/50">
                      <td className="py-2 px-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`cancer-hist-${site.id}`}
                            checked={state.selectedCancerSites2.includes(site.id)}
                            disabled={state.yesNo4 !== 'Y'}
                            onCheckedChange={(checked) => 
                              handlers.handleCancerSite2CheckboxChange(site.id, checked as boolean)
                            }
                          />
                          <Label 
                            htmlFor={`cancer-hist-${site.id}`}
                            className={`text-sm font-normal cursor-pointer ${state.yesNo4 !== 'Y' ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            {site.label}
                          </Label>
                        </div>
                      </td>
                      <td className="py-2 px-2">
                        <Input
                          type="text"
                          placeholder="YYYY"
                          value={state.cancerYears[site.id] || ""}
                          onChange={(e) => handlers.handleCancerYearChange(site.id, e.target.value)}
                          disabled={state.yesNo4 !== 'Y' || !state.selectedCancerSites2.includes(site.id)}
                          className="h-8 text-sm text-center"
                          maxLength={4}
                        />
                      </td>
                      <td className="py-2 px-2">
                        <Select 
                          value={state.cancerStatuses[site.id] || ""} 
                          onValueChange={(value) => handlers.handleCancerStatusChange(site.id, value)}
                          disabled={state.yesNo4 !== 'Y' || !state.selectedCancerSites2.includes(site.id)}
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
                          checked={state.selectedCancerSites2.includes('others')}
                          disabled={state.yesNo4 !== 'Y'}
                          onCheckedChange={(checked) => 
                            handlers.handleCancerSite2CheckboxChange('others', checked as boolean)
                          }
                        />
                        <Label 
                          htmlFor="cancer-hist-others"
                          className={`text-sm font-normal cursor-pointer whitespace-nowrap ${state.yesNo4 !== 'Y' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          Others, specify:
                        </Label>
                        <Input
                          type="text"
                          placeholder="Please specify"
                          value={state.othersCancerSite2}
                          onChange={(e) => updateState('othersCancerSite2', e.target.value.toUpperCase())}
                          disabled={state.yesNo4 !== 'Y' || !state.selectedCancerSites2.includes('others')}
                          className="h-8 flex-1 text-sm"
                        />
                      </div>
                    </td>
                    <td className="py-2 px-2">
                      <Input
                        type="text"
                        placeholder="YYYY"
                        value={state.cancerYears['others'] || ""}
                        onChange={(e) => handlers.handleCancerYearChange('others', e.target.value)}
                        disabled={state.yesNo4 !== 'Y' || !state.selectedCancerSites2.includes('others')}
                        className="h-8 text-sm text-center"
                        maxLength={4}
                      />
                    </td>
                    <td className="py-2 px-2">
                      <Select 
                        value={state.cancerStatuses['others'] || ""} 
                        onValueChange={(value) => handlers.handleCancerStatusChange('others', value)}
                        disabled={state.yesNo4 !== 'Y' || !state.selectedCancerSites2.includes('others')}
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
              value={state.otherMedicalHistory}
              onChange={(e) => updateState('otherMedicalHistory', e.target.value.toUpperCase())}
              className="h-9"
            />
          </div>
        </div>

        <div className="pt-2 border-t">
          <h3 className="text-base font-semibold mt-2 mb-3">Sexual History</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
            <div className="space-y-1">
              <Label htmlFor="sexual-orientation" className="text-sm">Sexual Orientation</Label>
              <Select value={state.sexOrient} onValueChange={(val) => updateState('sexOrient', val)}>
                <SelectTrigger id="sexual-orientation" className="h-9" showClear={!!state.sexOrient} onClear={() => updateState('sexOrient', "")}>
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
                value={state.othersSexOrient}
                onChange={(e) => updateState('othersSexOrient', e.target.value.toUpperCase())}
                disabled={state.sexOrient !== 'others'}
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
                value={state.numSexPartners}
                onChange={(e) => updateState('numSexPartners', e.target.value)}
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
                value={state.ageFirstSexIntercourse}
                onChange={(e) => updateState('ageFirstSexIntercourse', e.target.value)}
                className="h-9"
                min="0"
              />
            </div>
          </div>

          <div className="pt-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
              <div className="space-y-1">
                <Label htmlFor="use-contraceptives" className="text-sm">Use of Contraceptives</Label>
                <Select value={state.useContraceptives} onValueChange={(val) => updateState('useContraceptives', val)}>
                  <SelectTrigger id="use-contraceptives" className="h-9" showClear={!!state.useContraceptives} onClear={() => updateState('useContraceptives', "")}>
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
                  {constants.contraceptiveMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`contraceptive-${method.id}`}
                        checked={state.selectedContraceptives.includes(method.id)}
                        disabled={state.useContraceptives !== 'Y'}
                        onCheckedChange={(checked) => 
                          handlers.handleContraceptivesCheckboxChange(method.id, checked as boolean)
                        }
                      />
                      <Label 
                        htmlFor={`contraceptive-${method.id}`}
                        className={`text-sm font-normal cursor-pointer ${state.useContraceptives !== 'Y' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {method.label}
                      </Label>
                    </div>
                  ))}

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="contraceptive-others"
                      checked={state.selectedContraceptives.includes('others')}
                      disabled={state.useContraceptives !== 'Y'}
                      onCheckedChange={(checked) => 
                        handlers.handleContraceptivesCheckboxChange('others', checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor="contraceptive-others"
                      className={`text-sm font-normal cursor-pointer whitespace-nowrap ${state.useContraceptives !== 'Y' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      Others, specify:
                    </Label>
                    <Input
                      type="text"
                      placeholder="Please specify"
                      value={state.othersContraceptives}
                      onChange={(e) => updateState('othersContraceptives', e.target.value.toUpperCase())}
                      disabled={state.useContraceptives !== 'Y' || !state.selectedContraceptives.includes('others')}
                      className="h-9 flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cancer Screening */}
        <div className="pt-2 border-t">
          <h3 className="text-base font-semibold mt-2 mb-3">Cancer Screening and Vaccination History of Patient</h3>

          <div className="space-y-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Types of Cancer Screening Received
              </Label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                <div className="space-y-2">
                  {constants.cancerScreeningCol1.map((screening) => (
                    <div key={screening.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`screening-${screening.id}`}
                        checked={state.selectedCancerScreening.includes(screening.id)}
                        onCheckedChange={(checked) => 
                          handlers.handleCancerScreeningCheckboxChange(screening.id, checked as boolean)
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
                  {constants.cancerScreeningCol2.map((screening) => (
                    <div key={screening.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`screening-${screening.id}`}
                        checked={state.selectedCancerScreening.includes(screening.id)}
                        onCheckedChange={(checked) => 
                          handlers.handleCancerScreeningCheckboxChange(screening.id, checked as boolean)
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
                      checked={state.selectedCancerScreening.includes('others')}
                      onCheckedChange={(checked) => 
                        handlers.handleCancerScreeningCheckboxChange('others', checked as boolean)
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
                      value={state.othersCancerScreening}
                      onChange={(e) => updateState('othersCancerScreening', e.target.value.toUpperCase())}
                      disabled={!state.selectedCancerScreening.includes('others')}
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
                  <Select value={state.hpvVaccine} onValueChange={(value) => updateState('hpvVaccine', value)}>
                    <SelectTrigger id="hpv-vaccine" className="h-9" showClear={!!state.hpvVaccine} onClear={() => updateState('hpvVaccine', "")}>
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
                  <Select value={state.hepBVaccine} onValueChange={(value) => updateState('hepBVaccine', value)}>
                    <SelectTrigger id="hepb-vaccine" className="h-9" showClear={!!state.hepBVaccine} onClear={() => updateState('hepBVaccine', "")}>
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
                  value={state.otherVaccines}
                  onChange={(e) => updateState('otherVaccines', e.target.value.toUpperCase())}
                  className="h-9"
                />
              </div>
            </div>
          </div>
        </div>

         <div className="pt-2 border-t">
          <h3 className="text-base font-semibold mt-2 mb-3">Profile of Cancer Diagnosis of Patient Form</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
            <div className="space-y-1">
              <Label htmlFor="cancer" className="text-sm">Are there more than 1 Primary Cancer Site/s?</Label>
              <Select value={state.yesNo5} onValueChange={(val) => updateState('yesNo5', val)}>
                <SelectTrigger id="cancer" className="h-9" showClear={!!state.yesNo5} onClear={() => updateState('yesNo5', "")}>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Y">Yes</SelectItem>
                  <SelectItem value="N">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="primary-cancer-site-number" className="text-sm">Primary Cancer Site Number</Label>
                <Input
                  id="primary-cancer-site-number"
                  type="number"
                  min={1}
                  value={state.primaryCancerSiteNumber}
                  disabled={state.yesNo5 !== 'Y'}
                  onChange={(e) => {
                    const val = Math.max(1, Number(e.target.value || 1))
                    updateState('primaryCancerSiteNumber', String(val))
                  }}
                  className="h-9 flex-1"
                />
            </div>
          </div>
         </div>

         <div
            className={`pt-2 border-t ${state.yesNo5 !== 'Y' ? 'pointer-events-none opacity-50' : ''}`}
            aria-disabled={state.yesNo5 !== 'Y'}
          >
          <h3 className="text-base font-semibold mt-2 mb-3">Primary Cancer Site</h3>

          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              <div className="space-y-2">
                {constants.pCancerSiteCol1.map((cancer) => (
                  <div key={cancer.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`cancer-${cancer.id}`}
                      checked={state.pCancerSite.includes(cancer.id)}
                      onCheckedChange={(checked) => 
                        handlers.handleCancerSiteCheckboxChange(cancer.id, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`cancer-${cancer.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {cancer.label}
                    </Label>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                {constants.pCancerSiteCol2.map((cancer) => (
                  <div key={cancer.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`cancer-${cancer.id}`}
                      checked={state.pCancerSite.includes(cancer.id)}
                      onCheckedChange={(checked) => 
                        handlers.handleCancerSiteCheckboxChange(cancer.id, checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={`cancer-${cancer.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {cancer.label}
                    </Label>
                  </div>
                ))}

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="cancer-others"
                    checked={state.othersPatCancer.includes('others')}
                    onCheckedChange={(checked) => 
                      handlers.handleCancerCheckboxChange('others', checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor="cancer-others"
                    className="text-sm font-normal cursor-pointer whitespace-nowrap"
                  >
                    Others, specify:
                  </Label>
                  <Input
                    type="text"
                    placeholder="Please specify"
                    value={state.othersPatCancer}
                    onChange={(e) => updateState('othersPatCancer', e.target.value.toUpperCase())}
                    disabled={!state.othersPatCancer.includes('others')}
                    className="h-9 flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
              <div className="space-y-1">
                <Label htmlFor="cancer" className="text-sm">Laterality</Label>
                <div className="flex flex-wrap gap-4">
                  {constants.lateralityOptions.map((cancer) => (
                    <div key={cancer.id} className="flex items-center space-x-4">
                      <Checkbox
                        id={`cancer-${cancer.id}`}
                        checked={state.pCancerSite.includes(cancer.id)}
                        onCheckedChange={(checked) =>
                          handlers.handleLateralityCheckboxChange(cancer.id, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`cancer-${cancer.id}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {cancer.label}
                      </Label>
                    </div>
                  ))}
                  </div>
                </div>

            {/* map for icd 10 codes for cancer site 1 */}
            <div className="space-y-1">
              <Label htmlFor="icd10" className="text-sm">ICD - 10</Label>
                <Input
                  id="icd10"
                  type="text"
                  value={state.icd10}
                  onChange={(e) => updateState('icd10', e.target.value.toUpperCase())}
                  className="h-9"
                />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-x-4 gap-y-3 mt-4">
            <div className="space-y-2">
              <Label htmlFor="histologic" className="text-sm">Histologic Diagnosis</Label>
              <Input
                  id="histologic"
                  type="text"
                  value={state.histoDiag}
                  onChange={(e) => updateState('histoDiag', e.target.value.toUpperCase())}
                  className="h-9 flex-1"
                />
            </div>
          </div>

            <h2 className="text-base font-semibold mt-6 mb-3">Clinical Stage</h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-2">
              <div className="space-y-2">
              <Label htmlFor="histologic" className="text-sm">
                Group Clinical Stage <span className="text-muted-foreground text-xs">(Optional)</span>
              </Label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {constants.groupClinicalStageOptions.map((cancer) => (
                    <div key={cancer.id} className="flex items-center space-x-4">
                      <Checkbox
                        id={`cancer-${cancer.id}`}
                        checked={state.patCancer.includes(cancer.id)}
                        onCheckedChange={(checked) =>
                          handlers.handleGroupClinicalStageCheckboxChange(cancer.id, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`cancer-${cancer.id}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {cancer.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 mt-4">
            <div className="space-y-2">
              <Label htmlFor="ttumor" className="text-sm">T (Tumor) <span className="text-muted-foreground text-xs">(Optional)</span></Label>
              <Input
                  id="ttumor"
                  type="text"
                  value={state.tTumor}
                  onChange={(e) => updateState('tTumor', e.target.value.toUpperCase())}
                  className="h-9 flex-1"
                />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nnode" className="text-sm">N (Node) <span className="text-muted-foreground text-xs">(Optional)</span></Label>
              <Input
                  id="nnode"
                  type="text"
                  value={state.nNode}
                  onChange={(e) => updateState('nNode', e.target.value.toUpperCase())}
                  className="h-9 flex-1"
                />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 mt-4">
            <div className="space-y-2">
              <Label htmlFor="mmetastasis" className="text-sm">M (Metastasis) <span className="text-muted-foreground text-xs">(Optional)</span></Label>
              <Input
                  id="mmetastasis"
                  type="text"
                  value={state.mMetastasis}
                  onChange={(e) => updateState('mMetastasis', e.target.value.toUpperCase())}
                  className="h-9 flex-1"
                />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sstage" className="text-sm">S (Staging) <span className="text-muted-foreground text-xs">(Optional)</span></Label>
              <Input
                  id="sstage"
                  type="text"
                  value={state.sStage}
                  onChange={(e) => updateState('sStage', e.target.value.toUpperCase())}
                  className="h-9 flex-1"
                />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-2 mt-4">
            <div className="space-y-2">
              <Label htmlFor="histologic" className="text-sm">
                Other Staging Used <span className="text-muted-foreground text-xs">(Optional)</span>
              </Label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {constants.otherStagingOptions.map((cancer) => (
                  <div key={cancer.id} className="flex items-center space-x-4">
                    <Checkbox
                      id={`cancer-${cancer.id}`}
                      checked={state.patCancer.includes(cancer.id)}
                      onCheckedChange={(checked) =>
                        handlers.handleOtherStagingUsedCheckboxChange(cancer.id, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`cancer-${cancer.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {cancer.label}
                    </Label>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 mt-2">
                <Label
                  htmlFor="otherstagingremarks"
                  className="text-sm font-normal cursor-pointer whitespace-nowrap"
                >
                  Other Remarks:
                </Label>
                <Input
                  id="otherstagingremarks"
                  type="text"
                  placeholder="Please specify"
                  value={state.otherStagingUsedRemarks}
                  onChange={(e) => updateState('otherStagingUsedRemarks', e.target.value.toUpperCase())}
                  className="h-9 flex-1"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-2 mt-4">
            <div className="space-y-2">
              <Label htmlFor="histologic" className="text-sm">Current Status of the Cancer</Label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {constants.currentStatusCancerOptions.map((cancer) => (
                  <div key={cancer.id} className="flex items-center space-x-4">
                    <Checkbox
                      id={`cancer-${cancer.id}`}
                      checked={state.patCancer.includes(cancer.id)}
                      onCheckedChange={(checked) =>
                        handlers.handleCurrStatusCancerCheckboxChange(cancer.id, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`cancer-${cancer.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {cancer.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t">
              <h3 className="text-base font-semibold mt-2 mb-3">Treatment Plan And Diagnosis</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-2">
                <div className="flex items-center gap-2 mt-2">
                  <Label htmlFor="dateDiag" className="text-sm font-normal cursor-pointer whitespace-nowrap"> Date of Diagnosis </Label>
                    <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        data-empty={!date}
                        className="data-[empty=true]:text-muted-foreground w-[212px] justify-between text-left font-normal"
                      >
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        defaultMonth={date}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            <div className="pt-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
              <div className="space-y-1">
                <Label htmlFor="surgery" className="text-sm">Surgery</Label>
                <Select value={state.surgery} onValueChange={(val) => updateState('surgery', val)}>
                  <SelectTrigger id="surgery" className="h-9" showClear={!!state.surgery} onClear={() => updateState('surgery', "")}>
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
                  <div className="flex flex-wrap gap-4 mt-2">
                    {constants.surgeryOptions.map((surgery) => (
                      <div key={surgery.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`surgery-${surgery.id}`}
                          checked={state.selectedSurgery.includes(surgery.id)}
                          disabled={state.surgery !== 'Y'}
                          onCheckedChange={(checked) =>
                            handlers.handleSurgeryCheckboxChange(surgery.id, checked as boolean)
                          }
                        />
                        <Label
                          htmlFor={`surgery-${surgery.id}`}
                          className={`text-sm font-normal cursor-pointer ${state.surgery !== 'Y' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {surgery.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3">
              <div className="md:col-span-1 space-y-1">
                <Label htmlFor="antiCancerDrug" className="text-sm">Anti-Cancer Drug</Label>
                <Select value={state.antiCancerDrug} onValueChange={(val) => updateState('antiCancerDrug', val)}>
                  <SelectTrigger id="antiCancerDrug" className="h-9" showClear={!!state.antiCancerDrug} onClear={() => updateState('antiCancerDrug', "")}>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Y">Yes</SelectItem>
                    <SelectItem value="N">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 space-y-3">
                <Label htmlFor="purposeDrug" className="text-sm">Purpose of Drug</Label>
                <Select value={state.purposeDrug} onValueChange={(val) => updateState('purposeDrug', val)} disabled={state.antiCancerDrug !== 'Y'}>
                  <SelectTrigger id="purposeDrug" className="h-9" showClear={!!state.purposeDrug} onClear={() => updateState('purposeDrug', "")} disabled={state.antiCancerDrug !== 'Y'}>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NEO">Neoadjuvant</SelectItem>
                    <SelectItem value="ADJ">Adjuvant</SelectItem>
                    <SelectItem value="PAL">Palliative</SelectItem>
                  </SelectContent>
                </Select>

                <Label className="text-sm font-medium">
                  Drug Type/s: <span className="text-muted-foreground italic font-normal">(can be multiple)</span>
                </Label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {constants.drugTypeOptions.map((drug) => (
                    <div key={drug.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`drugType-${drug.id}`}
                        checked={state.selectedDrugType.includes(drug.id)}
                        disabled={state.antiCancerDrug !== 'Y'}
                        onCheckedChange={(checked) =>
                          handlers.handleDrugTypeCheckboxChange(drug.id, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`drugType-${drug.id}`}
                        className={`text-sm font-normal cursor-pointer ${state.antiCancerDrug !== 'Y' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {drug.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3">
              <div className="md:col-span-1 space-y-1">
                <Label htmlFor="firstLine" className="text-sm">First Line Anti-Cancer Drug</Label>
                <Select value={state.firstLine} onValueChange={(val) => updateState('firstLine', val)}>
                  <SelectTrigger id="firstLine" className="h-9" showClear={!!state.firstLine} onClear={() => updateState('firstLine', "")}>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Y">Yes</SelectItem>
                    <SelectItem value="N">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 space-y-3">
                <div className="space-y-2">
                  <Label
                    htmlFor="firstDrugReg"
                    className="text-sm font-normal cursor-pointer whitespace-nowrap"
                  >
                    Drug/s Regimen
                  </Label>
                  <Input
                    id="firstDrugReg"
                    type="text"
                    placeholder="Please specify"
                    value={state.firstDrugReg}
                    disabled={state.firstLine !== 'Y'}
                    onChange={(e) => updateState('firstDrugReg', e.target.value.toUpperCase())}
                    className="h-9 flex-1"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="firstNofCycles"
                    className="text-sm font-normal cursor-pointer whitespace-nowrap"
                  >
                    Intended no. of Cycles:
                  </Label>
                  <Input
                    id="firstNofCycles"
                    type="text"
                    placeholder="Please specify"
                    value={state.firstNofCycles}
                    disabled={state.firstLine !== 'Y'}
                    onChange={(e) => updateState('firstNofCycles', e.target.value.toUpperCase())}
                    className="h-9 flex-1"
                  />
                </div>

                <Label htmlFor="firstTreatmentGoal" className="text-sm">Treatment Goal</Label>
                <Select value={state.firstGoal} onValueChange={(val) => updateState('firstGoal', val)} disabled={state.firstLine !== 'Y'}>
                  <SelectTrigger id="firstTreatmentGoal" className="h-9" showClear={!!state.firstGoal} onClear={() => updateState('firstGoal', "")} disabled={state.firstLine !== 'Y'}>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CUR">Curative</SelectItem>
                    <SelectItem value="CON">Control</SelectItem>
                    <SelectItem value="PAL">Palliative</SelectItem>
                  </SelectContent>
                </Select>

                <Label htmlFor="firstTimeAdmin" className="text-sm">Time of Administration</Label>
                <Select value={state.firstTimeAdmin} onValueChange={(val) => updateState('firstTimeAdmin', val)} disabled={state.firstLine !== 'Y'}>
                  <SelectTrigger id="firstTimeAdmin" className="h-9" showClear={!!state.firstTimeAdmin} onClear={() => updateState('firstTimeAdmin', "")} disabled={state.firstLine !== 'Y'}>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PRE">Pre-Operative</SelectItem>
                    <SelectItem value="POST">Post-Operative</SelectItem>
                    <SelectItem value="BOTH">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="pt-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3">
              <div className="md:col-span-1 space-y-1">
                <Label htmlFor="secondLine" className="text-sm">Second Line Anti-Cancer Drug</Label>
                <Select value={state.secondLine} onValueChange={(val) => updateState('secondLine', val)}>
                  <SelectTrigger id="secondLine" className="h-9" showClear={!!state.secondLine} onClear={() => updateState('secondLine', "")}>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Y">Yes</SelectItem>
                    <SelectItem value="N">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 space-y-3">
                <div className="space-y-2">
                  <Label
                    htmlFor="secondDrugReg"
                    className="text-sm font-normal cursor-pointer whitespace-nowrap"
                  >
                    Drug/s Regimen
                  </Label>
                  <Input
                    id="secondDrugReg"
                    type="text"
                    placeholder="Please specify"
                    value={state.secondDrugReg}
                    onChange={(e) => updateState('secondDrugReg', e.target.value.toUpperCase())}
                    className="h-9 flex-1"
                    disabled={state.secondLine !== 'Y'}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="secondNofCycles"
                    className="text-sm font-normal cursor-pointer whitespace-nowrap"
                  >
                    Intended no. of Cycles:
                  </Label>
                  <Input
                    id="secondNofCycles"
                    type="text"
                    placeholder="Please specify"
                    value={state.secondNofCycles}
                    onChange={(e) => updateState('secondNofCycles', e.target.value.toUpperCase())}
                    className="h-9 flex-1"
                    disabled={state.secondLine !== 'Y'}
                  />
                </div>

                <Label htmlFor="secondTreatmentGoal" className="text-sm">Treatment Goal</Label>
                <Select value={state.secondGoal} onValueChange={(val) => updateState('secondGoal', val)} disabled={state.secondLine !== 'Y'}>
                  <SelectTrigger id="secondTreatmentGoal" className="h-9" showClear={!!state.secondGoal} onClear={() => updateState('secondGoal', "")} disabled={state.secondLine !== 'Y'}>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CUR">Curative</SelectItem>
                    <SelectItem value="CON">Control</SelectItem>
                    <SelectItem value="PAL">Palliative</SelectItem>
                  </SelectContent>
                </Select>

                <Label htmlFor="secondTimeAdmin" className="text-sm">Time of Administration</Label>
                <Select value={state.secondTimeAdmin} onValueChange={(val) => updateState('secondTimeAdmin', val)} disabled={state.secondLine !== 'Y'}>
                  <SelectTrigger id="secondTimeAdmin" className="h-9" showClear={!!state.secondTimeAdmin} onClear={() => updateState('secondTimeAdmin', "")} disabled={state.secondLine !== 'Y'}>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PRE">Pre-Operative</SelectItem>
                    <SelectItem value="POST">Post-Operative</SelectItem>
                    <SelectItem value="BOTH">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="pt-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3">
              <div className="md:col-span-1 space-y-1">
                <Label htmlFor="thirdLine" className="text-sm">Third Line Anti-Cancer Drug</Label>
                <Select value={state.thirdLine} onValueChange={(val) => updateState('thirdLine', val)}>
                  <SelectTrigger id="thirdLine" className="h-9" showClear={!!state.thirdLine} onClear={() => updateState('thirdLine', "")}>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Y">Yes</SelectItem>
                    <SelectItem value="N">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 space-y-3">
                <div className="space-y-2">
                  <Label
                    htmlFor="thirdDrugReg"
                    className="text-sm font-normal cursor-pointer whitespace-nowrap"
                  >
                    Drug/s Regimen
                  </Label>
                  <Input
                    id="thirdDrugReg"
                    type="text"
                    placeholder="Please specify"
                    value={state.thirdDrugReg}
                    onChange={(e) => updateState('thirdDrugReg', e.target.value.toUpperCase())}
                    className="h-9 flex-1"
                    disabled={state.thirdLine !== 'Y'}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="thirdNofCycles"
                    className="text-sm font-normal cursor-pointer whitespace-nowrap"
                  >
                    Intended no. of Cycles:
                  </Label>
                  <Input
                    id="thirdNofCycles"
                    type="text"
                    placeholder="Please specify"
                    value={state.thirdNofCycles}
                    onChange={(e) => updateState('thirdNofCycles', e.target.value.toUpperCase())}
                    className="h-9 flex-1"
                    disabled={state.thirdLine !== 'Y'}
                  />
                </div>

                <Label htmlFor="thirdTreatmentGoal" className="text-sm">Treatment Goal</Label>
                <Select value={state.thirdGoal} onValueChange={(val) => updateState('thirdGoal', val)} disabled={state.thirdLine !== 'Y'}>
                  <SelectTrigger id="thirdTreatmentGoal" className="h-9" showClear={!!state.thirdGoal} onClear={() => updateState('thirdGoal', "")} disabled={state.thirdLine !== 'Y'}>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CUR">Curative</SelectItem>
                    <SelectItem value="CON">Control</SelectItem>
                    <SelectItem value="PAL">Palliative</SelectItem>
                  </SelectContent>
                </Select>

                <Label htmlFor="thirdTimeAdmin" className="text-sm">Time of Administration</Label>
                <Select value={state.thirdTimeAdmin} onValueChange={(val) => updateState('thirdTimeAdmin', val)} disabled={state.thirdLine !== 'Y'}>
                  <SelectTrigger id="thirdTimeAdmin" className="h-9" showClear={!!state.thirdTimeAdmin} onClear={() => updateState('thirdTimeAdmin', "")} disabled={state.thirdLine !== 'Y'}>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PRE">Pre-Operative</SelectItem>
                    <SelectItem value="POST">Post-Operative</SelectItem>
                    <SelectItem value="BOTH">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="pt-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3">
              <div className="md:col-span-1 space-y-1">
                <Label htmlFor="otherLine" className="text-sm">Other Subsequent Anti-Cancer Drug</Label>
                <Select value={state.otherLine} onValueChange={(val) => updateState('otherLine', val)}>
                  <SelectTrigger id="otherLine" className="h-9" showClear={!!state.otherLine} onClear={() => updateState('otherLine', "")}>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Y">Yes</SelectItem>
                    <SelectItem value="N">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 space-y-3">
                <div className="space-y-2">
                  <Label
                    htmlFor="otherIndicate"
                    className="text-sm font-normal cursor-pointer whitespace-nowrap"
                  >
                    If yes, indicate line
                  </Label>
                  <Input
                    id="otherIndicate"
                    type="text"
                    placeholder="Please specify"
                    value={state.otherIndicate}
                    onChange={(e) => updateState('otherIndicate', e.target.value.toUpperCase())}
                    className="h-9 flex-1"
                    disabled={state.otherLine !== 'Y'}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="otherDrugReg"
                    className="text-sm font-normal cursor-pointer whitespace-nowrap"
                  >
                    Drug/s Regimen
                  </Label>
                  <Input
                    id="otherDrugReg"
                    type="text"
                    placeholder="Please specify"
                    value={state.otherDrugReg}
                    onChange={(e) => updateState('otherDrugReg', e.target.value.toUpperCase())}
                    className="h-9 flex-1"
                    disabled={state.otherLine !== 'Y'}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="otherNofCycles"
                    className="text-sm font-normal cursor-pointer whitespace-nowrap"
                  >
                    Intended no. of Cycles:
                  </Label>
                  <Input
                    id="otherNofCycles"
                    type="text"
                    placeholder="Please specify"
                    value={state.otherNofCycles}
                    onChange={(e) => updateState('otherNofCycles', e.target.value.toUpperCase())}
                    className="h-9 flex-1"
                    disabled={state.otherLine !== 'Y'}
                  />
                </div>

                <Label htmlFor="otherTreatmentGoal" className="text-sm">Treatment Goal</Label>
                <Select value={state.otherGoal} onValueChange={(val) => updateState('otherGoal', val)} disabled={state.otherLine !== 'Y'}>
                  <SelectTrigger id="otherTreatmentGoal" className="h-9" showClear={!!state.otherGoal} onClear={() => updateState('otherGoal', "")} disabled={state.otherLine !== 'Y'}>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CUR">Curative</SelectItem>
                    <SelectItem value="CON">Control</SelectItem>
                    <SelectItem value="PAL">Palliative</SelectItem>
                  </SelectContent>
                </Select>

                <Label htmlFor="otherTimeAdmin" className="text-sm">Time of Administration</Label>
                <Select value={state.otherTimeAdmin} onValueChange={(val) => updateState('otherTimeAdmin', val)} disabled={state.otherLine !== 'Y'}>
                  <SelectTrigger id="otherTimeAdmin" className="h-9" showClear={!!state.otherTimeAdmin} onClear={() => updateState('otherTimeAdmin', "")} disabled={state.otherLine !== 'Y'}>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PRE">Pre-Operative</SelectItem>
                    <SelectItem value="POST">Post-Operative</SelectItem>
                    <SelectItem value="BOTH">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="pt-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3">
              <div className="md:col-span-1 space-y-1">
                <Label htmlFor="radiotherapy" className="text-sm">Radiotherapy</Label>
                <Select value={state.radiotherapy} onValueChange={(val) => updateState('radiotherapy', val)}>
                  <SelectTrigger id="radiotherapy" className="h-9" showClear={!!state.radiotherapy} onClear={() => updateState('radiotherapy', "")}>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Y">Yes</SelectItem>
                    <SelectItem value="N">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 space-y-3">
                <Label className="text-sm font-medium">
                  If yes, indicate type:
                </Label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {constants.radiotherapyType.map((radiotherapy) => (
                    <div key={radiotherapy.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`radiotherapyType-${radiotherapy.id}`}
                        checked={state.selectedRadiotherapyType.includes(radiotherapy.id)}
                        disabled={state.radiotherapy !== 'Y'}
                        onCheckedChange={(checked) =>
                          handlers.handleRadiotherapyTypeCheckboxChange(radiotherapy.id, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`radiotherapyType-${radiotherapy.id}`}
                        className={`text-sm font-normal cursor-pointer ${state.radiotherapy !== 'Y' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {radiotherapy.label}
                      </Label>
                    </div>
                  ))}

                <Label htmlFor="speciSequence" className="text-sm">Specify Sequence</Label>
                <Select value={state.speciSequence} onValueChange={(val) => updateState('speciSequence', val)} disabled={state.radiotherapy !== 'Y'}>
                  <SelectTrigger id="speciSequence" className="h-9" showClear={!!state.speciSequence} onClear={() => updateState('speciSequence', "")} disabled={state.radiotherapy !== 'Y'}>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CHEMO">Concurrent ChemoRT</SelectItem>
                    <SelectItem value="SEQ">Sequential</SelectItem>
                  </SelectContent>
                </Select>

                <Label htmlFor="speciGoal" className="text-sm">Specify Treatment Goal</Label>
                <Select value={state.speciGoal} onValueChange={(val) => updateState('speciGoal', val)} disabled={state.radiotherapy !== 'Y'}>
                  <SelectTrigger id="speciGoal" className="h-9" showClear={!!state.speciGoal} onClear={() => updateState('speciGoal', "")} disabled={state.radiotherapy !== 'Y'}>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DEF">Definitive</SelectItem>
                    <SelectItem value="PAL">Palliative</SelectItem>
                    <SelectItem value="ADJ">Adjuvant</SelectItem>
                    <SelectItem value="NEO">Neoadjuvant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          </div>

          <div className="pt-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3">
              <div className="md:col-span-1 space-y-1">
                <Label htmlFor="theranostics" className="text-sm">Theranostics</Label>
                <Select value={state.theranostics} onValueChange={(val) => updateState('theranostics', val)}>
                  <SelectTrigger id="theranostics" className="h-9" showClear={!!state.theranostics} onClear={() => updateState('theranostics', "")}>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Y">Yes</SelectItem>
                    <SelectItem value="N">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 space-y-3">
                <Label className="text-sm font-medium">
                  If yes, indicate type:
                </Label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {constants.theranosticsType.map((theranostics) => (
                    <div key={theranostics.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`theranosticsType-${theranostics.id}`}
                        checked={state.theranosticsType.includes(theranostics.id)}
                        disabled={state.theranostics !== 'Y'}
                        onCheckedChange={(checked) =>
                          handlers.handleTheranosticsCheckboxChange(theranostics.id, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`theranosticsType-${theranostics.id}`}
                        className={`text-sm font-normal cursor-pointer ${state.theranostics !== 'Y' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {theranostics.label}
                      </Label>
                    </div>
                  ))}

                <Label htmlFor="theranosticsGoal" className="text-sm">If yes, specify the Goal:</Label>
                <Select value={state.theranosticsGoal} onValueChange={(val) => updateState('theranosticsGoal', val)} disabled={state.theranostics !== 'Y'} >
                  <SelectTrigger id="theranosticsGoal" className="h-9" showClear={!!state.theranosticsGoal} onClear={() => updateState('theranosticsGoal', "")} disabled={state.theranostics !== 'Y'}>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DEF">Definitive</SelectItem>
                    <SelectItem value="PAL">Palliative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          </div>

          <div className="pt-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3">
              <div className="md:col-span-1 space-y-1">
                <Label htmlFor="otherCancerTherapies" className="text-sm">Other Cancer Directed Therapies</Label>
                <Select value={state.otherCancerTherapies} onValueChange={(val) => updateState('otherCancerTherapies', val)}>
                  <SelectTrigger id="otherCancerTherapies" className="h-9" showClear={!!state.otherCancerTherapies} onClear={() => updateState('otherCancerTherapies', "")}>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Y">Yes</SelectItem>
                    <SelectItem value="N">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 space-y-3">
                <Label className="text-sm font-medium">
                  If yes, indicate type:
                </Label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {constants.otherCancerTherapies.map((othercancer) => (
                    <div key={othercancer.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`otherCancerTherapiesType-${othercancer.id}`}
                        checked={state.otherCancerTherapiesPlan.includes(othercancer.id)}
                        disabled={state.otherCancerTherapies !== 'Y'}
                        onCheckedChange={(checked) =>
                          handlers.handleOtherCancerTherapiesCheckboxChange(othercancer.id, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`otherCancerTherapiesType-${othercancer.id}`}
                        className={`text-sm font-normal cursor-pointer ${state.otherCancerTherapies !== 'Y' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {othercancer.label}
                      </Label>
                    </div>
                  ))}
                  
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="cancertherapyothers"
                    checked={state.otherCancerTherapiesPlan.includes('others')}
                    disabled={state.otherCancerTherapies !== 'Y'}
                    onCheckedChange={(checked) => 
                      handlers.handleOtherCancerTherapiesCheckboxChange('others', checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor="cancertherapyothers"
                    className={`text-sm font-normal cursor-pointer whitespace-nowrap ${state.otherCancerTherapies !== 'Y' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Others, specify:
                  </Label>
                  <Input
                    type="text"
                    placeholder="Please specify"
                    value={state.otherCancerTherapiesSpecify}
                    onChange={(e) => updateState('otherCancerTherapiesSpecify', e.target.value.toUpperCase())}
                    disabled={state.otherCancerTherapies !== 'Y' || !state.otherCancerTherapiesPlan.includes('others')}
                    className="h-9 flex-1"
                  />
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>
         </div>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={handlers.handleSave} className="h-9">
            <Save className="mr-2 h-4 w-4" />
            Save Record
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}