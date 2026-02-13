import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import SettingsLayout from "@/layouts/settings/layout";
import Heading from "@/components/heading";
import ESignature from "@/components/esignature";
import { Card, CardContent } from "@/components/ui/card";
import type { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "eSignature",
        href: "#",
    },
];

export default function ESignaturePage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="eSignature" />

            <SettingsLayout>
                <div className="space-y-8">
                    <Heading
                        title="eSignature"
                        description="Draw and manage your electronic signature used for medical documents and approvals."
                    />

                    <Card className="max-w-2xl rounded-2xl shadow-sm">
                        <CardContent className="p-6 space-y-6">
                            <div>
                                <h3 className="text-base font-semibold">
                                    Signature Pad
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Please draw your signature clearly inside the box below.
                                </p>
                            </div>

                            <ESignature />
                        </CardContent>
                    </Card>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
