import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format, subDays } from "date-fns";
import { Filter, FileText, LayoutGrid, User, Calendar, Tag, AtSign, CheckCircle, Clock, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip";
import { DataTable } from "@/components/ui/data-table/DataTable"; 
import { DocumentMetrics } from "./components/DocumentMetrics";
import FilterPopover from "./components/filters/FilterPopover";
import { BulkAssign } from "./components/BulkAssign";

import { setPayload, setLetterListTableData, setTotalNoOfDocs } from "@/redux/slices/cdmSlice";
import { useGetDocumentsMutation, useGetFiltersQuery } from "@/redux/slices/apiSlice";
import type { RootState } from "@/redux/store";
import type { ColumnDef } from "@tanstack/react-table";

const CDMDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { payloadData, letterListTableData, totalNoOfDocs } = useSelector((state: RootState) => state.cdm);
  
  const [getDocuments, { isLoading: isTableLoading }] = useGetDocumentsMutation();
  const { data: filterData } = useGetFiltersQuery({});

  const [bulkAssignDialogOpen, setBulkAssignDialogOpen] = useState(false);
  const [rowSelection, setRowSelection] = useState({});

  // Fetch Logic
  const fetchData = async (payload: any) => {
    try {
      console.log("Fetching documents with payload:", payload);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const response = await getDocuments(payload).unwrap();
      if (response.data) {
        dispatch(setLetterListTableData(response.data.docList || []));
        dispatch(setTotalNoOfDocs(response.data.totalRec || 0));
      }
    } catch (error) {
      console.error("Failed to fetch documents", error);
    }
  };

  useEffect(() => {
    let initialPayload = { ...payloadData };
    if (!initialPayload.fromDate) {
      const today = new Date();
      const yesterday = subDays(today, 1);
      initialPayload = {
        ...initialPayload,
        fromDate: format(yesterday, "MM-dd-yyyy"),
        toDate: format(today, "MM-dd-yyyy"),
      };
      dispatch(setPayload(initialPayload));
    }
    fetchData(initialPayload);
  }, []);

  const columns = useMemo<ColumnDef<any>[]>(() => [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 60,
    },
    {
      accessorKey: "splitFileName",
      header: () => (
        <div className="flex items-center gap-2">
           <FileText className="w-4 h-4 text-slate-500" />
           <span>Split File Name</span>
        </div>
      ),
      cell: ({ row }) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="flex items-center gap-2 cursor-pointer hover:underline text-blue-900"
                onClick={() => navigate(`/correspondence_cdm/letterDetails/${encodeURIComponent(row.original.classification)}`)}
              >
                <FileText className="w-4 h-4 text-slate-500" />
                <span className="truncate max-w-[300px] font-medium">
                  {row.getValue("splitFileName")}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{row.getValue("splitFileName")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
      size: 360,
    },
    {
      accessorKey: "classification",
      header: () => (
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-4 h-4 text-slate-500" />
          <span>Classification</span>
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-slate-700">
          {row.getValue("classification")}
        </div>
      ),
      size: 180,
    },
    {
      accessorKey: "payer",
      header: () => (
        <div className="flex items-center gap-2">
           <User className="w-4 h-4 text-slate-500" />    
           <span>Payer</span>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
           <span>{row.getValue("payer") || "--"}</span>
        </div>
      ),
      size: 160,
    },
    {
      accessorKey: "assignee",
      header: () => (
        <div className="flex items-center gap-2">
           <AtSign className="w-4 h-4 text-slate-500" />
           <span>Assignee</span>
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-slate-700">
           {row.getValue("assignee") || "Unassigned"}
        </div>
      ),
      size: 220,
    },
    {
      accessorKey: "batchDate",
       header: () => (
        <div className="flex items-center gap-2">
           <Calendar className="w-4 h-4 text-slate-500" />
           <span>Batch Date</span>
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-slate-600">
          {row.getValue("batchDate") || "N/A"}
        </div>
      ),
      size: 150,
    },
    {
      accessorKey: "processedDate",
       header: () => (
        <div className="flex items-center gap-2">
           <Calendar className="w-4 h-4 text-slate-500" />
           <span>Processed Date</span>
        </div>
      ),
      cell: ({ row }) => (
         <div className="text-slate-600">
          {row.getValue("processedDate") || "N/A"}
        </div>
      ),
      size: 200,
    },
    {
      accessorKey: "tags",
       header: () => (
        <div className="flex items-center gap-2">
           <Tag className="w-4 h-4 text-slate-500" />
           <span>Tags</span>
        </div>
      ),
      cell: ({ row }) => {
        const tags = row.getValue("tags") as string[];
        return (
          <div className="flex gap-1 flex-wrap">
            {tags && tags.map(tag => (
               <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>
        )
      },
      size: 200,
    },
    {
      accessorKey: "status",
       header: () => (
        <div className="flex items-center gap-2">
           <CheckCircle className="w-4 h-4 text-slate-500" />
           <span>Status</span>
        </div>
      ),
      cell: ({ row }) => {
        const val = row.getValue("status") as string;
        let colorClass = "bg-green-100 text-green-800";
        let Icon = CheckCircle;
        
        if(val === "Ready to Process") {
            colorClass = "bg-blue-100 text-blue-800";
            Icon = Clock;
        }
        else if(val === "Waiting for User Validation") {
            colorClass = "bg-orange-100 text-orange-800";
            Icon = AlertCircle;
        }
        
        return (
            <Badge className={`${colorClass} hover:${colorClass} font-normal border-0 flex w-fit items-center gap-1`}>
                <Icon className="w-3 h-3" />
                {val}
            </Badge>
        )
      },
      size: 200,
    }
  ], []);

  return (
    <div className="p-6 space-y-6 bg-slate-50/50 min-h-screen">
      <div className="w-full border border-[#E6ECF0] p-[16px] rounded-[14px] h-[80px]">
        <div className="text-[20px] font-semibold text-[#0A0A0A]">
          Correspondence Document Manager (CDM)
        </div>
        <div className="text-sm text-[#737373]">
          Manage, assign, and organize healthcare correspondence with precision
        </div>
      </div>
       <div className="flex justify-end items-center">
          <div className="flex gap-2">
            {Object.keys(rowSelection).length > 0 && (
                <Button onClick={() => setBulkAssignDialogOpen(true)}>
                    Bulk Assign ({Object.keys(rowSelection).length})
                </Button>
            )}
            <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2 border-2 border-slate-200 rounded-full hover:bg-slate-50 transition-all">
                      <Filter className="w-4 h-4" /> Filter
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-auto bg-transparent border-0 shadow-none -ml-4" align="end">
                    <FilterPopover 
                      handlePopoverClose={()=>{}} 
                      fetchData={fetchData} 
                      loading={false} 
                    />
                </PopoverContent>
            </Popover>
          </div>
       </div>

       <DocumentMetrics />

       <div className="bg-white rounded-lg border shadow-sm section-table">
          <DataTable 
            columns={columns} 
            data={letterListTableData} 
            loading={isTableLoading}
            // Need to update DataTable to accept these props
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
          />
       </div>

       <BulkAssign 
         bulkAssignDialogOpen={bulkAssignDialogOpen}
         bulkAssignDialogClose={() => setBulkAssignDialogOpen(false)}
         letterIds={Object.keys(rowSelection)}
         assignUser={()=>{}}
         fetchData={fetchData}
         loading={false}
       />
    </div>
  );
};

export default CDMDashboard;
