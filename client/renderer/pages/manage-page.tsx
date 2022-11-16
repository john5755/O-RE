import React, { useState } from "react";
import styled from "@emotion/styled";
import { Tab, Tabs, Box } from "@mui/material";
import { useRouter } from "next/router";
import PageMemberAdd from "../molecule/PageMemberAdd";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 560px) {
    width: 80%;
  }
  min-width: 480px;
  max-width: 560px;
`;

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ManagePage() {
  const [tabValue, setTabValue] = useState<number>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const router = useRouter();
  const pageId =
    typeof router.query.pageId === "string" ? router.query.pageId : "";
  const role = typeof router.query.role === "string" ? router.query.role : "";

  return (
    <LayoutContainer>
      <Container>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "white" }}>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{
                ".MuiButtonBase-root": {
                  color: "gray",
                  "&.Mui-selected": {
                    color: "var(--main-color)",
                  },
                },
              }}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "var(--main-color)",
                },
              }}
            >
              <Tab
                label="페이지 설정"
                {...a11yProps(0)}
                sx={{ fontWeight: "bold" }}
              />
              <Tab
                label="페이지 멤버 추가"
                {...a11yProps(1)}
                sx={{ fontWeight: "bold" }}
              />{" "}
              <Tab
                label="팀 멤버 삭제"
                {...a11yProps(2)}
                sx={{ fontWeight: "bold" }}
              />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}></TabPanel>
          <TabPanel value={tabValue} index={1}>
            <PageMemberAdd pageId={pageId}></PageMemberAdd>
          </TabPanel>
          <TabPanel value={tabValue} index={2}></TabPanel>
        </Box>
      </Container>
    </LayoutContainer>
  );
}
