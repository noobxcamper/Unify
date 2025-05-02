import { ActionIcon, Box, Button, Group, Text } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Optional: Set PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type PDFViewerProps = {
    url: string;
};

const PDFViewer = ({ url }: PDFViewerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [pageNumber, setPageNumber] = useState<number>(1);

    const documentLoaded = ({ numPages }: { numPages: number }) => {
        setTotalPages(numPages);
    };

    const nextPage = () => {
        if (pageNumber < totalPages) setPageNumber(pageNumber + 1);
    };

    const prevPage = () => {
        if (pageNumber > 1) setPageNumber(pageNumber - 1);
    };

    return (
        <Box
            ref={containerRef}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                overflow: "auto",
                width: "100%",
                maxWidth: 850,
                margin: "0 auto"
            }}
        >
            <Group justify="flex-end" mt="md" mb="lg">
                <ActionIcon className="unify-button-outline" onClick={prevPage}>
                    <IconChevronLeft size={18} />
                </ActionIcon>

                <Text>
                    {pageNumber} / {totalPages}
                </Text>

                <ActionIcon className="unify-button-outline" onClick={nextPage}>
                    <IconChevronRight size={18} />
                </ActionIcon>
            </Group>

            <Document file={url} onLoadSuccess={documentLoaded}>
                <Page pageNumber={pageNumber} width={containerRef.current?.offsetWidth} />
            </Document>
        </Box>
    );
};

export default PDFViewer;