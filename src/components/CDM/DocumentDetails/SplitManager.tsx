
import { useState } from "react";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockSplitData, mockClassifications } from "./mockSplitData";

// Fallback if Select component doesn't exist in @/components/ui/select, 
// but usually it does in shadcn. If not, I'll use native select in next iteration.

interface SplitManagerProps {
  onApply: () => void;
  onClose: () => void;
}

export const SplitManager = ({ onApply, onClose }: SplitManagerProps) => {
  const [splits, setSplits] = useState(mockSplitData);
  const [newPageRange, setNewPageRange] = useState("");
  const [newCategory, setNewCategory] = useState("Acknowledgement");
  const [isAdding, setIsAdding] = useState(false);

  const handleDelete = (index: number) => {
    setSplits(splits.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    if (!newPageRange) return;
    setSplits([
      ...splits,
      { letterId: Date.now(), classificationType: newCategory, pageRange: newPageRange },
    ]);
    setNewPageRange("");
    setNewCategory("Acknowledgement");
    setIsAdding(false);
  };

  return (
    <div className="flex flex-col h-full border-l bg-white w-full max-w-sm">
        <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold text-lg">Manage Document Splitting</h3>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-4">
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">Range</TableHead>
                            <TableHead>Classification</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {splits.map((split, index) => (
                            <TableRow key={split.letterId}>
                                <TableCell>
                                    <Input 
                                        value={split.pageRange} 
                                        onChange={(e) => {
                                            const newSplits = [...splits];
                                            newSplits[index].pageRange = e.target.value;
                                            setSplits(newSplits);
                                        }}
                                        className="h-8 w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                     {/* Simplified Select for now, assumes standard HTML select for robustness if shadcn Select is complex to setup blindly */}
                                    <select 
                                        className="flex h-8 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={split.classificationType}
                                        onChange={(e) => {
                                            const newSplits = [...splits];
                                            newSplits[index].classificationType = e.target.value;
                                            setSplits(newSplits);
                                        }}
                                    >
                                        {mockClassifications.map(c => (
                                            <option key={c.id} value={c.classificationType}>{c.classificationType}</option>
                                        ))}
                                    </select>
                                </TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600" onClick={() => handleDelete(index)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {splits.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                                    No splits defined
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="space-y-4">
                <div 
                    className="flex items-center gap-2 font-medium cursor-pointer text-blue-600"
                    onClick={() => setIsAdding(!isAdding)}
                >
                    {isAdding ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    Add New Split
                </div>
                
                {isAdding && (
                     <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-md border">
                        <Input 
                            placeholder="Page (e.g. 1-3)" 
                            value={newPageRange} 
                            onChange={(e) => setNewPageRange(e.target.value)}
                            className="w-24 bg-white"
                        />
                         <select 
                            className="flex h-10 w-full items-center justify-between rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 bg-white"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                        >
                            {mockClassifications.map(c => (
                                <option key={c.id} value={c.classificationType}>{c.classificationType}</option>
                            ))}
                        </select>
                        <Button size="sm" onClick={handleAdd} disabled={!newPageRange}>Add</Button>
                     </div>
                )}
            </div>
        </div>

        <div className="p-4 border-t bg-slate-50 flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={onApply}>Apply Splitting</Button>
        </div>
    </div>
  );
};
