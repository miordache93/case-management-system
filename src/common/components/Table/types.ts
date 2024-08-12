import { SvgIconComponent } from "@mui/icons-material";
import { ReactNode, MouseEvent } from "react";

export interface HeaderCell {
    id?: string;
    sortable?: boolean;
    label: string;
};

export interface ItemRendererArgs<T> {
    item: T;
    selected?: boolean;
    index: number;
};

export type CellRendererArgs<T> = ItemRendererArgs<T>;

export interface TableRowAction<T> {
    icon?: SvgIconComponent | ReactNode;
    name: string;
    onAction: (event: MouseEvent<HTMLButtonElement>, item: T) => void | Promise<void>;
    isDisabled?: (item: T) => boolean;
    isVisible?: (item: T) => boolean;
};

export interface TableRowActionsProps<T> {
    actions: ReadonlyArray<TableRowAction<T>>;
    item: T;
    compactMode?: boolean;
    rowIndex?: number;
}

interface BaseColumn<T = object, K = string> {
    id: string;
    title: string;
    hidden?: boolean;
    width?: number | string;
    minWidth?: number;
    orderBy?: K;
    cellClassName?: string;
    sortable?: boolean;
};

interface ColumnWithRenderer<T> extends BaseColumn<T>{
    /**
     * Custom cell render
     * @param args 
     * @returns {ReactNode} Element that will be rendered inside cell
     */
    cellRenderer: (args: CellRendererArgs<T>) => ReactNode | JSX.Element;
    dataPath?: never;
};

interface ColumnWithDataKey<T, K extends string = string> extends BaseColumn<T, K> {
    cellRenderer?: never;
     /**
     * Field to display data inside cell
     */
    dataPath: K;
}

export type Column<T, K extends string = string> = ColumnWithRenderer<T> | ColumnWithDataKey<T, K>;

export interface TableCellProps<T> {
    item: Column<T>;
    className?: string;
}

export interface TableProps<T, K extends string = string> {
    columns: ReadonlyArray<Column<T, K>>;
    className?: string;
    items: ReadonlyArray<T>;
    selectedItems?: string[];
    rowActions?: ReadonlyArray<TableRowAction<T>>;
    isLoading?: boolean;
    enableSelection?: boolean;
    handleRowClick?: (item: T) => void;
    filters?: any;
    compactMode?: boolean;
    count: number;
    onPageChange: (pageNumber: number) => void;
    onSelectAll?: (checked: boolean) => void;
    onSelectionChange?: (item: T) => void;
    onSort?: (columnId: string, order: 'desc' | 'asc') => void;
};


export interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (event: null, newPage: number) => void;
  }