import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "@emotion/styled";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  padding-bottom: 10px;
  font-size: 15px;
  font-weight: 600;
`;

type TableProps = {
  style?: React.CSSProperties;
  header: string;
  title: string[];
  data: Array<string[]>;
};

const BasicTable = ({ header, title, data }: TableProps) => {
  return (
    <Container>
      {header !== "" && <HeaderContainer>{header}</HeaderContainer>}
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
                {row.map((col, idx) => {
                  if (Array.isArray(col))
                    return (
                      <TableCell key={`${col}-${idx}`}>
                        {col.join(", ")}
                      </TableCell>
                    );
                  else {
                    return <TableCell key={`${col}-${idx}`}>{col}</TableCell>;
                  }
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default BasicTable;
