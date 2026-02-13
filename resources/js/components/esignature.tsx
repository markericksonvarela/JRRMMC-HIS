import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";

type Props = {
    onSave?: (dataUrl: string) => void;
};

export default function ESignature({ onSave }: Props) {
    const sigRef = useRef<SignatureCanvas>(null);

    const handleClear = () => {
        sigRef.current?.clear();
    };

    const handleSave = () => {
        if (!sigRef.current?.isEmpty()) {
            const dataUrl = sigRef.current
                .getTrimmedCanvas()
                .toDataURL("image/png");

            onSave?.(dataUrl);
        }
    };

    return (
<div className="space-y-6">
    <div className="border-2 border rounded-2xl bg-white overflow-hidden">
        <SignatureCanvas
            ref={sigRef}
            penColor="black"
            canvasProps={{
                className: "w-full h-52 md:h-60",
            }}
        />
    </div>

    <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
            Use your mouse or touchpad to sign.
        </p>

        <div className="flex gap-2">
            <Button
                type="button"
                variant="destructive"
                onClick={handleClear}
            >
                Clear
            </Button>

            <Button
                type="button"
                variant="success"
                onClick={handleSave}
            >
                Save
            </Button>
        </div>
    </div>
</div>



    );
}
