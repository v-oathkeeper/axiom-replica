import { TableRow, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export const TableSkeletonRow = () => {
  return (
    <TableRow>
      {/* Token Info */}
      <TableCell>
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" /> {/* Avatar */}
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-20" /> {/* Name */}
            <Skeleton className="h-3 w-10" /> {/* Symbol */}
          </div>
        </div>
      </TableCell>
      {/* Price */}
      <TableCell className="text-right"><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
      {/* 1h % */}
      <TableCell className="text-right"><Skeleton className="h-4 w-12 ml-auto" /></TableCell>
      {/* 6h % */}
      <TableCell className="hidden md:table-cell text-right"><Skeleton className="h-4 w-12 ml-auto" /></TableCell>
      {/* Volume */}
      <TableCell className="hidden md:table-cell text-right"><Skeleton className="h-4 w-20 ml-auto" /></TableCell>
      {/* Liquidity */}
      <TableCell className="hidden lg:table-cell text-right"><Skeleton className="h-4 w-20 ml-auto" /></TableCell>
    </TableRow>
  );
};