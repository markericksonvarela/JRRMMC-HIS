import { RowActionsButton } from '@/components/common/rowActionsButtons'
import {
  BookHeart,
  ClipboardPlus,
  MessageCircleHeart,
  FlaskConical,
  FolderPlus,
  HeartPulse,
  NotebookText,
  FileClock,
  Info,
} from 'lucide-react'
import { AdmissionLog } from '@/helper/admissionHelper'

interface RowActionsProps {
  admission: AdmissionLog
  onSOAP: (enccode: string, patientName: string) => void
  onDoctorsOrder: (enccode: string, patientName: string) => void
  onNursesNotes: (enccode: string) => void
  onExamination: (enccode: string) => void
  onPatientFiles: (enccode: string) => void
  onVitalSigns: (enccode: string) => void
  onCourseInWard: (enccode: string) => void
  onHistoryDiagnosis: (enccode: string) => void
  onPatientInfo: (enccode: string) => void
}

export function RowActions({
  admission,
  onSOAP,
  onDoctorsOrder,
  onNursesNotes,
  onExamination,
  onPatientFiles,
  onVitalSigns,
  onCourseInWard,
  onHistoryDiagnosis,
  onPatientInfo,
}: RowActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <RowActionsButton
        icon={<BookHeart className="size-6 text-green-500" />}
        label="SOAP Notes"
        onClick={() => onSOAP(admission.enccode, admission.patient_name)}
      />

      <RowActionsButton
        icon={<ClipboardPlus className="size-6 text-blue-500" />}
        label="Doctor's Order"
        onClick={() => onDoctorsOrder(admission.enccode, admission.patient_name)}
      />

      <RowActionsButton
        icon={<MessageCircleHeart className="size-6 text-purple-500" />}
        label="Nurse's Notes"
        onClick={() => onNursesNotes(admission.enccode)}
      />

      <RowActionsButton
        icon={<FlaskConical className="size-6 text-orange-500" />}
        label="Examination"
        onClick={() => onExamination(admission.enccode)}
      />

      <RowActionsButton
        icon={<FolderPlus className="size-6 text-amber-500" />}
        label="Patient Files"
        onClick={() => onPatientFiles(admission.enccode)}
      />

      <RowActionsButton
        icon={<HeartPulse className="size-6 text-red-500" />}
        label="Vital Signs"
        onClick={() => onVitalSigns(admission.enccode)}
      />

      <RowActionsButton
        icon={<NotebookText className="size-6 text-indigo-500" />}
        label="Course in the Ward"
        onClick={() => onCourseInWard(admission.enccode)}
      />

      <RowActionsButton
        icon={<FileClock className="size-6 text-teal-500" />}
        label="History / Diagnosis"
        onClick={() => onHistoryDiagnosis(admission.enccode)}
      />

      <RowActionsButton
        icon={<Info className="size-6 text-sky-500" />}
        label="Patient Information"
        onClick={() => onPatientInfo(admission.enccode)}
      />
    </div>
  )
}
