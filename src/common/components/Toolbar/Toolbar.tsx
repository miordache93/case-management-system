import { FunctionComponent } from "react";
import SearchInput from "../SearchInput/SearchInput";
import { Box } from "@mui/material";
import { Case } from "src/features/cases/types";
import BatchActions from "./BatchActions";
import ColumnsFilter from "./ColumnsFilter";

interface ToolbarProps {
  columns: any[];
  searchText: string;
  onSearch: (text: string) => void;
  toggleColumnVisibility: (column: any) => void; 
  selectedCases: Case[];
}

const Toolbar: FunctionComponent<ToolbarProps> = ({
  columns,
  searchText,
  onSearch,
  selectedCases,
  toggleColumnVisibility,
}) => {

  return (
    <Box
      display='flex'
      justifyContent='space-between'
      flexDirection={{ sm: 'column', lg: 'row' }}
      rowGap={ { sm: 1, lg: 0 } }
    >
      <Box justifyContent={ { xs: 'center', sm: 'flex-start'}}>
        <SearchInput />
      </Box>
      <Box
        display='flex'
        justifyContent={ { xs: 'flex-start', lg: 'space-between' } }
        columnGap={ 1 }
      >
        <BatchActions />
        <ColumnsFilter 
          columns={columns}
          toggleColumnVisibility={toggleColumnVisibility}
        />
      </Box>
    </Box>
  )
}

export default Toolbar;