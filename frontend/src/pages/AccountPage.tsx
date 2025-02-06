import React, { useEffect, useState } from "react";
import { useAccount } from "@azure/msal-react";
import { graphAPI } from "../utils/api";
import { GRAPH_ACCESS_TOKEN } from "../utils/MsalAuthHandler";
import { LoadingOverlay, Paper, Tabs, Text } from "@mantine/core";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import Breadcrumbs from "../components/Breadcrumbs";

function GraphTest() {
    const account = useAccount();
    const [loading, setLoading] = useState<boolean>(false);
    const [users, setUsers] = useState<[]>();
    const paginationModel = { page: 0, pageSize: 30 };

    const columns: GridColDef[] = [
        { field: 'displayName', headerName: 'Name', flex: 1, headerClassName: "mui-table-header" },
        { field: 'userPrincipalName', headerName: 'Email', flex: 1, headerClassName: "mui-table-header" },
        { field: 'id', headerName: 'User ID', flex: 1, headerClassName: "mui-table-header" },
    ];

    const getUserGroups = () => {
        setLoading(true);

        graphAPI(localStorage.getItem(GRAPH_ACCESS_TOKEN) ?? "None").get("/users").then((response) => {
            setUsers(response.data.value);
            setLoading(false);
        });
    };

    useEffect(() => {
        getUserGroups();
    }, []);

    return (
        <>
            <Text size="32px">{account?.name}</Text>
            <Text my={"lg"}>If you see a list of users below, this means that the Graph API call was successful. If not, try signing out and back in.</Text>
            <Paper shadow={"lg"} style={{
                overflow: "auto",
                maxHeight: "75vh",
                border: "1px solid #e9e9e9"
            }}>
                <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <DataGrid
                    rows={users}
                    columns={columns}
                    initialState={{
                        pagination: { paginationModel },
                        filter: {
                            filterModel: {
                                items: [],
                                quickFilterExcludeHiddenColumns: true
                            }
                        }
                    }}
                    pageSizeOptions={[5, 10, 15, 20, 25, 30]}
                    checkboxSelection
                    slots={{
                        toolbar: GridToolbar
                    }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                />
            </Paper>
        </>
    )
}

function AccountPage() {


    return (
        <>
            <Breadcrumbs />
            <Tabs defaultValue="graph-test">
                <Tabs.List>
                    <Tabs.Tab value="graph-test">
                        Graph API Test
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="graph-test">
                    <GraphTest />
                </Tabs.Panel>
            </Tabs>
        </>
    )
}

export default AccountPage;