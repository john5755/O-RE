import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "@emotion/styled";
import TablePagination from "@mui/material/TablePagination";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

type TableProps = {
  style?: React.CSSProperties;
  header: string;
  title: string[];
  data: Array<string[]>;
};

const BasicTable = ({ header, title, data }: TableProps) => {
  console.log("data : ", data);
  return (
    <Container>
      {header !== "" && <div>{header}</div>}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {title.map((v, i) => (
                <TableCell key={`${v}-${i}`}>{v}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={`${row}-${i}`}>
                {row.map((col, idx) => (
                  <TableCell key={`${col}-${idx}`}>{col}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default BasicTable;
