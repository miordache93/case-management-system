import SearchInput from "../SearchInput/SearchInput";
import { Box } from "@mui/material";
import BatchActions from "./BatchActions";
import ColumnsFilter from "./ColumnsFilter";
import { Column } from "../Table/types";

interface ToolbarProps<K> {
  columns: Column<K>[];
  searchText: string;
  onSearch: (text: string) => void;
  toggleColumnVisibility: (columnId: string) => void; 
  enableBatchActions: boolean;
  onAcceptCases: () => void;
  onRejectCases: () => void;
}

const Toolbar= <T extends object>(props: ToolbarProps<T>)  => {

  const { 
    columns,
    searchText,
    onSearch,
    enableBatchActions,
    toggleColumnVisibility,
    onAcceptCases,
    onRejectCases,
  } = props;

  return (
    <Box
      display='flex'
      justifyContent='space-between'
      flexDirection={{ sm: 'column', lg: 'row' }}
      rowGap={ { sm: 1, lg: 0 } }
    >
      <Box justifyContent={ { xs: 'center', sm: 'flex-start'}}>
        <SearchInput 
          value={ searchText }
          onSearch={ onSearch }
        />
      </Box>
      <Box
        display='flex'
        justifyContent={ { xs: 'flex-start', lg: 'space-between' } }
        columnGap={ 1 }
      >
        <BatchActions 
          enableBatchActions={enableBatchActions}
          onAcceptCases={onAcceptCases}
          onRejectCases={onRejectCases}
        />
        <ColumnsFilter 
          columns={columns}
          toggleColumnVisibility={toggleColumnVisibility}
        />
      </Box>
    </Box>
  )
}

export default Toolbar;