import styled from "@emotion/styled";
import {
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  // TablePagination,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import ManageStudent from "../components/student/ManageStudent";
import { font } from "../styles/fonts";
import colors from "../styles/palette";
import { type IStudent } from "../types/Student";
import { useQuery } from "@tanstack/react-query";
import { getStudentInClass } from "../api/classApi";
import { useParams } from "react-router-dom";

// const studentList: IStudent[] = [
//   {
//     seq: 1,
//     stuId: "20201025",
//     stuName: "김그린",
//     stuGrade: 1,
//     stuSubject: "컴퓨터공학과",
//   },
//   {
//     seq: 2,
//     stuId: "20201131",
//     stuName: "김아트",
//     stuGrade: 2,
//     stuSubject: "컴퓨터공학과",
//   },
// ];

const Student = () => {
  const { classid } = useParams();
  const [open, setOpen] = useState<boolean>(false);
  // const [page, setPage] = useState<number>(0);
  // const [rowsPerPage, setRowsPerPage] = useState<number>(1);
  const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };
  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };
  const onManageStudentHandler = (student: IStudent) => {
    setSelectedStudent(student);
    handleOpen();
  };
  const { data, isLoading, error } = useQuery(
    ["studentList", classid],
    async (): Promise<IStudent[] | null> => {
      if (classid != null) {
        return await getStudentInClass(parseInt(classid));
      }
      return null;
    },
  );
  return (
    <>
      <Box>
        <h2>수강생 관리</h2>
        <TableContainer
          style={{ width: "100%", minWidth: 520 }}
          component={Paper}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">학번</TableCell>
                <TableCell align="left">학생명</TableCell>
                <TableCell align="left">학년</TableCell>
                <TableCell align="left">학과</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading &&
                error === null &&
                data?.map((student: IStudent) => (
                  <TableRow key={student.seq}>
                    <TableCell align="left">{student.stuId}</TableCell>
                    <TableCell align="left">{student.stuName}</TableCell>
                    <TableCell align="left">{student.stuGrade}</TableCell>
                    <TableCell align="left">{student.stuSubject}</TableCell>
                    <TableCell align="right" width={60}>
                      <MoveToManage
                        onClick={() => onManageStudentHandler(student)}
                      >
                        관리
                        <IoIosArrowForward />
                      </MoveToManage>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination */}
        {/*  rowsPerPageOptions={[10, 20, 30]} */}
        {/*  component="div" */}
        {/*  count={data != null ? data.length : 0} */}
        {/*  rowsPerPage={rowsPerPage} */}
        {/*  page={page} */}
        {/*  onPageChange={handleChangePage} */}
        {/*  onRowsPerPageChange={handleChangeRowsPerPage} */}
        {/* /> */}
      </Box>
      <Modal open={open}>
        <>
          <ManageStudent
            closeModal={handleClose}
            studentInfo={selectedStudent}
          />
        </>
      </Modal>
    </>
  );
};

const Box = styled.div`
  width: 100%;
  h2 {
    font: ${font.style20Regular};
    margin-bottom: 20px;
  }
`;

const MoveToManage = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 48px;
  color: ${colors.primary};
  background: ${colors.white};
  border: none;
`;

export default Student;
