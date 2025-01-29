import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import { Button, MantineProvider } from "@mantine/core";
import React from "react";
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor } from '@mantine/tiptap';

function IncidentPlan() {
    const editor = useEditor({
        extensions: [StarterKit],
      });

    return (
        <>
            <MantineProvider>
                <h1>Incident Plan</h1>
                <RichTextEditor editor={editor} variant="subtle">
                    <RichTextEditor.Toolbar sticky stickyOffset={60}>
                        <RichTextEditor.ControlsGroup>
                            <RichTextEditor.Bold />
                            <RichTextEditor.Italic />
                            <RichTextEditor.Underline />
                            <RichTextEditor.Strikethrough />
                            <RichTextEditor.ClearFormatting />
                            <RichTextEditor.Highlight />
                            <RichTextEditor.Code />
                        </RichTextEditor.ControlsGroup>
                    </RichTextEditor.Toolbar>

                    <RichTextEditor.Content />
                </RichTextEditor>
            </MantineProvider>
        </>
    )
}

export default IncidentPlan