import { ActionIcon, Button, Group, Text } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

function PDFViewer({ url }) {
    const [totalPages, setTotalPages] = useState<number>(1);
    const [pageNumber, setPageNumber] = useState<number>(1);

    // Function required for the onLoadSuccess property. Do not change the parameter name, it is required.
    function documentLoaded({ numPages }) {
        setTotalPages(numPages);
    };

    const nextPage = () => {
        if (pageNumber < totalPages)
            setPageNumber(pageNumber + 1);
    };

    const prevPage = () => {
        if (pageNumber > 1)
            setPageNumber(pageNumber - 1);
    }

    return (
        <>
            <Group justify="flex-end" mb="lg">
                <ActionIcon className="unify-button-outline" onClick={prevPage}>
                    <IconChevronLeft size={18} />
                </ActionIcon>

                <Text>{pageNumber} / {totalPages}</Text>

                <ActionIcon className="unify-button-outline" onClick={nextPage}>
                    <IconChevronRight size={18} />
                </ActionIcon>
            </Group>

            <Document file={url} onLoadSuccess={documentLoaded}>
                <Page pageNumber={pageNumber} />
            </Document>
        </>
    )
}

export default PDFViewer;