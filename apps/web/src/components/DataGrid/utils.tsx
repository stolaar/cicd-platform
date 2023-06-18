import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { SingleStepper, MultipleStepper } from "../Stepper"
import { Badge, BadgeStatusEnum } from "../Badge"
import {
  MultipleProcessesTooltip,
  SingleProcessTooltip,
} from "../ProcessesTooltip"
import { testData, testDataTwoBars } from "../ProcessesTooltip/utils/testData"
import { TextTooltip } from "../TextTooltip"
import { Text } from "../Text"
import { BaseGridRenderCellParams } from "./types"

const subjectIdCell = ({ row }: BaseGridRenderCellParams) => (
  <Text variant="body2m">{row.mainPersonIdentifier}</Text>
)
const treatmentNameAndIdCell = ({ row }: BaseGridRenderCellParams) => (
  <div>
    <Text variant="body2m">{row.eventTypeDescription}</Text>
    <Text variant="body2">{row.eventIdentificationNumber}</Text>
  </div>
)

const collectionSiteCell = ({ row }: BaseGridRenderCellParams) => (
  <div style={{ whiteSpace: "normal" }}>
    <Text variant="body2">{row.collectionSite}</Text>
  </div>
)

const manufacturingSiteCell = ({ row }: BaseGridRenderCellParams) => {
  if (row.manufacturingSite.length > 1) {
    return (
      <div>
        <Text variant="body2">{row.manufacturingSite[0]}</Text>
        <TextTooltip content={row.manufacturingSite.slice(1)}>
          <Text variant="body2">{`+${
            row.manufacturingSite.length - 1
          } ${"more"}`}</Text>
        </TextTooltip>
      </div>
    )
  }
  return (
    <div style={{ whiteSpace: "normal" }}>
      <Text variant="body2">{row.manufacturingSite}</Text>
    </div>
  )
}

const StepperCell = ({ row }: GridRenderCellParams) =>
  row.processBars.length > 1 ? (
    <MultipleProcessesTooltip processBars={row.processBars}>
      <MultipleStepper label="1 in Registration + 1 more" />
    </MultipleProcessesTooltip>
  ) : (
    <SingleProcessTooltip showDates={false}>
      <SingleStepper steps={row.processBars[0].steps} />
    </SingleProcessTooltip>
  )

const BadgeCell = ({ row }: GridRenderCellParams) => (
  <Badge label={row.nextStep.label} status={row.nextStep.status} />
)

export const testColumns: GridColDef[] = [
  {
    field: "mainPersonIdentifier",
    flex: 0.5,
    headerName: "Subject ID",
    renderCell: subjectIdCell,
    sortable: false,
  },
  {
    field: "eventTypeDescription",
    flex: 1,
    headerName: "Treatments ID",
    renderCell: treatmentNameAndIdCell,
  },
  {
    field: "collectionSite",
    flex: 1,
    headerName: "Collection site",
    renderCell: collectionSiteCell,
  },
  {
    field: "manufacturingSite",
    flex: 1,
    headerName: "Manufacturing site",
    renderCell: manufacturingSiteCell,
    sortable: false,
  },
  {
    field: "processStep",
    headerName: "Process step",
    renderCell: StepperCell,
    sortable: false,
    width: 225,
  },
  {
    align: "center",
    field: "nextStep",
    flex: 1,
    headerAlign: "center",
    headerName: "Next Step",
    renderCell: BadgeCell,
    sortable: false,
  },
]

export const testRowsWithStepper = [
  {
    collectionSite: "University College Memiruak Skiane Kettering",
    eventIdentificationNumber: "E00000K",
    eventTypeDescription: "Custom Event Type",
    mainPersonIdentifier: "58647",
    manufacturingSite: ["Biotech Company 1", "Biotech Company 2"],
    nextStep: {
      label: "In progress",
      status: BadgeStatusEnum.ACTIVE,
    },
    processBars: testData.processBars,
    studyId: "Multiple Myeloma (CGT18909876256219",
  },
  {
    collectionSite: "University College Memiruak Skiane Kettering",
    eventIdentificationNumber: "E00000K",
    eventTypeDescription: "Custom Event Type",
    mainPersonIdentifier: "57444",
    manufacturingSite: [
      "Biotech Company 1",
      "Biotech Company 2",
      "Biotech Company 3",
    ],
    nextStep: {
      label: "In progress",
      status: BadgeStatusEnum.ACTIVE,
    },
    processBars: testDataTwoBars.processBars,
    studyId: "Multiple Myeloma (CGT18909876256219",
  },
  {
    collectionSite: "University College Memiruak Skiane Kettering",
    eventIdentificationNumber: "E00000K",
    eventTypeDescription: "Custom Event Type",
    mainPersonIdentifier: "56895",
    manufacturingSite: ["Biotech Company"],
    nextStep: {
      label: "Infused",
      status: BadgeStatusEnum.INFUSED,
    },
    processBars: testData.processBars,
    studyId: "Multiple Myeloma (CGT18909876256219",
  },
  {
    collectionSite: "University College Memiruak Skiane Kettering",
    eventIdentificationNumber: "E00000K",
    eventTypeDescription: "Custom Event Type",
    mainPersonIdentifier: "53748",
    manufacturingSite: ["Biotech Company"],
    nextStep: {
      label: "Canceled",
      status: BadgeStatusEnum.CANCELLED,
    },
    processBars: testDataTwoBars.processBars,
    studyId: "Multiple Myeloma (CGT18909876256219",
  },
  {
    collectionSite: "University College Memiruak Skiane Kettering",
    eventIdentificationNumber: "E00000K",
    eventTypeDescription: "Custom Event Type",
    mainPersonIdentifier: "56378",
    manufacturingSite: ["Biotech Company"],
    nextStep: {
      label: "Canceled",
      status: BadgeStatusEnum.CANCELLED,
    },
    processBars: testData.processBars,
    studyId: "Multiple Myeloma (CGT18909876256219",
  },
  {
    collectionSite: "University College Memiruak Skiane Kettering",
    eventIdentificationNumber: "E00000K",
    eventTypeDescription: "Custom Event Type",
    mainPersonIdentifier: "52324",
    manufacturingSite: ["Biotech Company"],
    nextStep: {
      label: "Canceled",
      status: BadgeStatusEnum.CANCELLED,
    },
    processBars: testDataTwoBars.processBars,
    studyId: "Multiple Myeloma (CGT18909876256219",
  },
  {
    collectionSite: "University College Memiruak Skiane Kettering",
    eventIdentificationNumber: "E00000K",
    eventTypeDescription: "Custom Event Type",
    mainPersonIdentifier: "52331",
    manufacturingSite: ["Biotech Company"],
    nextStep: {
      label: "Canceled",
      status: BadgeStatusEnum.CANCELLED,
    },
    processBars: testDataTwoBars.processBars,
    studyId: "Multiple Myeloma (CGT18909876256219",
  },
  {
    collectionSite: "University College Memiruak Skiane Kettering",
    eventIdentificationNumber: "E00000K",
    eventTypeDescription: "Custom Event Type",
    mainPersonIdentifier: "52332",
    manufacturingSite: ["Biotech Company"],
    nextStep: {
      label: "Canceled",
      status: BadgeStatusEnum.CANCELLED,
    },
    processBars: testDataTwoBars.processBars,
    studyId: "Multiple Myeloma (CGT18909876256219",
  },
  {
    collectionSite: "University College Memiruak Skiane Kettering",
    eventIdentificationNumber: "E00000K",
    eventTypeDescription: "Custom Event Type",
    mainPersonIdentifier: "52333",
    manufacturingSite: ["Biotech Company"],
    nextStep: {
      label: "Canceled",
      status: BadgeStatusEnum.CANCELLED,
    },
    processBars: testDataTwoBars.processBars,
    studyId: "Multiple Myeloma (CGT18909876256219",
  },
  {
    collectionSite: "University College Memiruak Skiane Kettering",
    eventIdentificationNumber: "E00000K",
    eventTypeDescription: "Custom Event Type",
    mainPersonIdentifier: "52334",
    manufacturingSite: ["Biotech Company"],
    nextStep: {
      label: "Canceled",
      status: BadgeStatusEnum.CANCELLED,
    },
    processBars: testDataTwoBars.processBars,
    studyId: "Multiple Myeloma (CGT18909876256219",
  },
  {
    collectionSite: "University College Memiruak Skiane Kettering",
    eventIdentificationNumber: "E00000K",
    eventTypeDescription: "Custom Event Type",
    mainPersonIdentifier: "52335",
    manufacturingSite: ["Biotech Company"],
    nextStep: {
      label: "Canceled",
      status: BadgeStatusEnum.CANCELLED,
    },
    processBars: testDataTwoBars.processBars,
    studyId: "Multiple Myeloma (CGT18909876256219",
  },
]
