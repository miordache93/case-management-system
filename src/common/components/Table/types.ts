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
    compactMode?: boolean; // for displaying items in a menu style
    rowIndex?: number;
}

interface BaseColumn<T = object, K extends string = string> {
    /**
     * Unique column id
    */
    id: string;
    /**
     * Column title
    */
    title: string;
    hidden?: boolean;
    width?: number | string;
    minWidth?: number;
    orderBy?: K;
    cellClassName?: string;
    sortable?: boolean;

    // ....add more
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
    rowActions?: ReadonlyArray<TableRowAction<T>>;
    isLoading?: boolean;
    handleRowClick?: (item: T) => void;
    filters?: any;
    compactMode?: boolean;
};


export interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (event: null, newPage: number) => void;
  }