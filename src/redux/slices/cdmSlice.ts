import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CdmState {
  payloadData: any;
  letterListTableData: any[];
  selectedUsers: any[];
  selectedCategories: any[];
  selectedStatus: any[];
  selectedTagsFilter: any[];
  totalNoOfDocs: number;
  usersListForAssign: any[];
  availableTags: any[];
}

const initialState: CdmState = {
  payloadData: {
    pageNumber: 1,
    pageSize: 10,
    fromDate: "",
    toDate: "",
    processedFromDate: "",
    processedToDate: "",
    classificationType: [],
    category: [],
    assigneeId: [],
    statusId: [],
    searchType: "",
    searchValue: "",
  },
  letterListTableData: [],
  selectedUsers: [],
  selectedCategories: [],
  selectedStatus: [],
  selectedTagsFilter: [],
  totalNoOfDocs: 0,
  usersListForAssign: [],
  availableTags: [],
};

const cdmSlice = createSlice({
  name: "cdm",
  initialState,
  reducers: {
    setPayload: (state, action: PayloadAction<any>) => {
      state.payloadData = action.payload;
    },
    setLetterListTableData: (state, action: PayloadAction<any[]>) => {
      state.letterListTableData = action.payload;
    },
    setTotalNoOfDocs: (state, action: PayloadAction<number>) => {
      state.totalNoOfDocs = action.payload;
    },
  },
});

export const {
  setPayload,
  setLetterListTableData,
  setTotalNoOfDocs,
} = cdmSlice.actions;

export default cdmSlice.reducer;
