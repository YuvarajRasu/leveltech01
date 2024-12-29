import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f44336",
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface Column {
  id: string;
  label: string;
  align?: 'left' | 'right' | 'center';
}

interface CustomTableProps {
  columns: Column[];
  rows: Record<string, any>[];
  renderCell?: (column: Column, row: Record<string, any>) => React.ReactNode;
}

export default function CustomTable({ columns, rows, renderCell }: CustomTableProps) {
  // Check if rows are empty
  const isEmpty = rows.length === 0;

  return (
    <TableContainer component={Paper} sx={{ maxWidth: "auto", maxHeight:530, overflow: 'auto'  }}>
      <Table aria-label="customized table" stickyHeader>
        {/* Table Header */}
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell key={column.id} align={column.align || 'center'} sx={{textWrap:"nowrap"}}>
                {column.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {isEmpty ? (
            <StyledTableRow>
              <StyledTableCell colSpan={columns.length} align="center">
                <Typography variant="h6" color="textSecondary">
                  No data available
                </Typography>
              </StyledTableCell>
            </StyledTableRow>
          ) : (
            rows.map((row, index) => (
              <StyledTableRow key={index}>
                {columns.map((column) => (
                  <StyledTableCell key={column.id} align={column.align || 'center'}>
                    {renderCell ? renderCell(column, row) : row[column.id]}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))
          )}
        </TableBody>

        {/* Optional: Footer */}
        {/* <TableFooter>
          {isEmpty && (
            <TableRow>
              <StyledTableCell colSpan={columns.length} align="center">
                <Typography variant="body2" color="textSecondary">
                  No data available
                </Typography>
              </StyledTableCell>
            </TableRow>
          )}
        </TableFooter> */}
      </Table>
    </TableContainer>
  );
}
