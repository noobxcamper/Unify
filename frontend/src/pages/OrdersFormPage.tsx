import React, { useState } from "react";
import { useAccount } from "@azure/msal-react";
import { Button, Container, Divider, Group, Input, InputWrapper, Text, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from '@mantine/form';


function OrdersFormPage() {
    const account = useAccount();
    const [date, setDate] = useState<Date | null>(null);

    const form = useForm({
        mode: 'controlled',
    });

    return (
        <Container style={{
            padding: "36px"
        }}>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                {/* supplier */}
                <Group grow>
                    <InputWrapper label="Company Name" description="Supplier company name" withAsterisk>
                        <TextInput key={form.key('company_name')}/>
                    </InputWrapper>

                    <InputWrapper label="Address" description="Supplier company address" withAsterisk>
                        <TextInput key={form.key('company_address')}/>
                    </InputWrapper>
                </Group>

                <Group grow my="md">
                    <InputWrapper label="Contact Person" description="Supplier contact name" withAsterisk>
                        <TextInput key={form.key('contact_name')}/>
                    </InputWrapper>

                    <InputWrapper label="Phone" description="Supplier contact number" withAsterisk>
                        <TextInput key={form.key('contact_number')}/>
                    </InputWrapper>

                    <InputWrapper label="Email" description="Supplier contact email" withAsterisk>
                        <TextInput key={form.key('contact_email')}/>
                    </InputWrapper>
                </Group>

                <Divider my="lg" />

                <Group grow my="md">
                    <DateInput label="Date Required" value={date} onChange={setDate} withAsterisk/>

                    <InputWrapper label="Requested By" withAsterisk>
                        <TextInput readOnly key={form.key('requested_by')} value={account?.name + " (" + account?.username + ")"} />
                    </InputWrapper>
                </Group>

                <InputWrapper my="md" label="Description" withAsterisk>
                        <TextInput key={form.key('description')} />
                </InputWrapper>

                <Button type="submit">Submit Form</Button>
            </form>
        </Container>
    )
}

export default OrdersFormPage;